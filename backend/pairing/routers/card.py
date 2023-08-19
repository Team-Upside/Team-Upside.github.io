from typing import Annotated

from fastapi import APIRouter, Depends, Security
from prisma.enums import UserCardStatus

from pairing.auth import get_current_user, scheme
from pairing.db import from_prisma_model, get_transaction
from pairing.dtos.card import CardDto, CardDtoWithUserCardStatus, CreateCardDto
from pairing.dtos.restaurant import CreateRestaurantDto, RestaurantDto
from pairing.dtos.user import UserDto
from pairing.services.card import service as card_service
from pairing.services.chat import service as chat_service
from prisma import Prisma

router = APIRouter(
    dependencies=[Depends(scheme)]
)


@router.get("")
async def get_cards(
    db: Annotated[Prisma, Depends(get_transaction)],
    user: UserDto = Security(get_current_user),
) -> list[CardDto]:
    cards = await card_service.get_cards(db, user.id)
    filtered_cards = []
    for card in cards:
        user_card = await card_service.get_user_card(db, user.id, card.id)
        card_dto = from_prisma_model(card, CardDtoWithUserCardStatus)
        if not user_card:
            filtered_cards.append(card_dto)

    return from_prisma_model(filtered_cards, CardDto)


@router.get("/{card_id}")
async def get_card(
    card_id: int,
    db: Annotated[Prisma, Depends(get_transaction)],
    user: UserDto = Security(get_current_user),
) -> list[CardDtoWithUserCardStatus]:
    card = await card_service.get_card(db, user.id, card_id)
    user_card = await card_service.get_user_card(db, user.id, card_id)
    card_dto = from_prisma_model(card, CardDtoWithUserCardStatus)
    if user_card:
        card_dto.user_card_status = user_card.status
    return card_dto


@router.get("/{card_id}/advice")
async def get_advice(
    card_id: int,
    db: Annotated[Prisma, Depends(get_transaction)],
    user: UserDto = Security(get_current_user),
) -> str:
    return await card_service.gpt_advice(db, user.id, card_id)


@router.post("/{card_id}/approve")
async def accept_card(
    card_id: int,
    db: Annotated[Prisma, Depends(get_transaction)],
    user: UserDto = Security(get_current_user),
) -> CardDtoWithUserCardStatus:
    user_card = await card_service.change_user_card_status(db, user.id, card_id, UserCardStatus.APPROVED)
    card = await db.card.find_unique(where={"id": card_id}, include={"restaurant": True, "user": True})
    card_dto = from_prisma_model(card, CardDtoWithUserCardStatus)
    card_dto.user_card_status = user_card.status

    chatroom = await chat_service.create_chatroom(db, user.id, card.user.id, card.restaurant.id)
    await chat_service.chat(db, chatroom.id, card.user.id, card.message)

    return card_dto


@router.post("/{card_id}/ignore")
async def ignore_card(
    card_id: int,
    db: Annotated[Prisma, Depends(get_transaction)],
    user: UserDto = Security(get_current_user),
) -> CardDto:
    user_card = await card_service.change_user_card_status(db, user.id, card_id, UserCardStatus.IGNORED)
    card = await db.card.find_unique(where={"id": card_id}, include={"restaurant": True, "user": True})
    card_dto = from_prisma_model(card, CardDtoWithUserCardStatus)
    card_dto.user_card_status = user_card.status
    return card_dto


@router.post("")
async def create_card(
    create_restaurant_dto: CreateCardDto,
    db: Annotated[Prisma, Depends(get_transaction)],
    user: UserDto = Security(get_current_user),
) -> CardDto:
    card = await card_service.create_card(db, user.id, create_restaurant_dto)
    return from_prisma_model(card, CardDto)
