from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Security
from prisma.enums import CardStatus

from pairing.auth import get_current_user, scheme
from pairing.db import from_prisma_model, get_transaction
from pairing.dtos.chat import ChatDto, ChatRoomDto, ChatRoomWithOpponentAndUnreadCountDto
from pairing.dtos.restaurant import RestaurantDto
from pairing.dtos.user import UserDto
from pairing.services.card import service as card_service
from pairing.services.chat import service as chat_service
from prisma import Prisma

router = APIRouter(
    dependencies=[Depends(scheme)]
)


def get_opponent_user(users: list[UserDto], user_id: str) -> UserDto:
    for user in users:
        if user.id != user_id:
            return user
    raise Exception("Opponent user not found")


@router.get("/{id}")
async def get_chatroom(
    id: int,
    db: Annotated[Prisma, Depends(get_transaction)],
    user: UserDto = Security(get_current_user),
) -> ChatRoomWithOpponentAndUnreadCountDto:
    chatroom = await chat_service.get_chatroom(db, id)
    chatroom_dto = from_prisma_model(chatroom, ChatRoomDto)
    user_ids = [user.id for user in chatroom_dto.users]
    if user.id not in user_ids:
        raise HTTPException(status_code=403, detail="You are not a member of this chatroom")

    unread_count = await chat_service.get_unread_chat_in_chatroom(db, id, user.id)
    last_message = (await chat_service.get_chats(db, id))[-1].message

    return ChatRoomWithOpponentAndUnreadCountDto(
        id=chatroom_dto.id,
        restaurant=chatroom_dto.restaurant,
        opponent_user=get_opponent_user(chatroom_dto.users, user.id),
        unread_count=unread_count,
        last_message=last_message,
        created_at=chatroom_dto.created_at,
        updated_at=chatroom_dto.updated_at,
    )


@router.get("")
async def get_chatrooms(
    db: Annotated[Prisma, Depends(get_transaction)],
    user: UserDto = Security(get_current_user),
) -> list[ChatRoomWithOpponentAndUnreadCountDto]:
    chatrooms = await chat_service.get_chatrooms(db, user.id)
    return [
        ChatRoomWithOpponentAndUnreadCountDto(
            id=chatroom.id,
            restaurant=from_prisma_model(chatroom.restaurant, RestaurantDto),
            opponent_user=get_opponent_user([from_prisma_model(user, UserDto) for user in chatroom.users], user.id),
            last_message=(await chat_service.get_chats(db, chatroom.id))[-1].message,
            unread_count=await chat_service.get_unread_chat_in_chatroom(db, chatroom.id, user.id),
            created_at=chatroom.created_at,
            updated_at=chatroom.updated_at,
        )
        for chatroom in chatrooms
    ]


@router.patch("/{id}/read")
async def read_all_chat(
    id: int,
    db: Annotated[Prisma, Depends(get_transaction)],
    user: UserDto = Security(get_current_user),
) -> None:
    chatroom = await chat_service.get_chatroom(db, id)
    chatroom_dto = from_prisma_model(chatroom, ChatRoomDto)
    user_ids = [user.id for user in chatroom_dto.users]
    if user.id not in user_ids:
        raise HTTPException(status_code=403, detail="You are not a member of this chatroom")

    await chat_service.read_all_chat_in_chatroom(db, id, user.id)


@router.get("/{id}/chats")
async def get_chats(
    id: int,
    db: Annotated[Prisma, Depends(get_transaction)],
    user: UserDto = Security(get_current_user),
) -> list[ChatDto]:
    chatroom = await chat_service.get_chatroom(db, id)
    chatroom_dto = from_prisma_model(chatroom, ChatRoomDto)
    user_ids = [user.id for user in chatroom_dto.users]
    if user.id not in user_ids:
        raise HTTPException(status_code=403, detail="You are not a member of this chatroom")

    chats = await chat_service.get_chats(db, id)
    return from_prisma_model(chats, ChatDto)


@router.post("/{id}/chats")
async def chat(
    id: int,
    message: str,
    db: Annotated[Prisma, Depends(get_transaction)],
    user: UserDto = Security(get_current_user),
) -> ChatDto:
    chatroom = await chat_service.get_chatroom(db, id)
    chatroom_dto = from_prisma_model(chatroom, ChatRoomDto)
    user_ids = [user.id for user in chatroom_dto.users]
    if user.id not in user_ids:
        raise HTTPException(status_code=403, detail="You are not a member of this chatroom")

    chat = await chat_service.chat(db, id, user.id, message)

    if "[ACCEPT]" in message:
        cards = await card_service.get_cards(db, user.id)
        for card in cards:
            if card.user_id == get_opponent_user(chatroom_dto.users, user.id).id:
                await card_service.change_card_status(db, card.id, CardStatus.MATCHED)
            else:
                await card_service.change_card_status(db, card.id, CardStatus.CANCELED)

    return from_prisma_model(chat, ChatDto)
