from fastapi import HTTPException
from prisma.models import Chat, ChatRoom

from prisma import Prisma


class NoChatroomFoundByIdException(HTTPException):
    def __init__(self, id: int):
        super().__init__(status_code=404, detail=f"Chatroom id {id} not found")


class ChatService:
    async def create_chatroom(self, db: Prisma, user_id: str, opponent_user_id: str, restaurant_id: int) -> ChatRoom:
        # user_id, and opponent_user_id to users[]
        return await db.chatroom.create(
            data={
                "users": {"connect": [{"id": user_id}, {"id": opponent_user_id}]},
                "restaurant": {"connect": {"id": restaurant_id}},
            },
            include={"restaurant": True, "users": True},
        )

    async def get_chatroom(self, db: Prisma, id: int) -> ChatRoom:
        chatroom = await db.chatroom.find_first(
            where={"id": id},
            include={"restaurant": True, "users": True},
        )
        if not chatroom:
            raise NoChatroomFoundByIdException(id)
        return chatroom

    async def get_chatrooms(self, db: Prisma, user_id: str) -> list[ChatRoom]:
        return await db.chatroom.find_many(
            where={"users": {"some": {"id": user_id}}},
            include={"restaurant": True, "users": True},
            order={"created_at": "desc"},
        )

    async def get_unread_chat_in_chatroom(self, db: Prisma, chatroom_id: int, user_id: str) -> int:
        return await db.chat.count(
            where={
                "chat_room_id": chatroom_id,
                "user_id": {"not": user_id},
                "read": False,
            },
        )

    async def read_all_chat_in_chatroom(self, db: Prisma, chatroom_id: int, user_id: str) -> None:
        await db.chat.update_many(
            where={
                "chat_room_id": chatroom_id,
                "user_id": {"not": user_id},
                "read": False,
            },
            data={"read": True},
        )

    async def get_chats(self, db: Prisma, chatroom_id: int) -> list[Chat]:
        return await db.chat.find_many(
            where={"chat_room_id": chatroom_id},
            order={"created_at": "asc"},
        )

    async def chat(self, db: Prisma, chatroom_id: int, user_id: str, message: str) -> Chat:
        # Increment new_messages_
        return await db.chat.create(
            data={
                "user": {"connect": {"id": user_id}},
                "chat_room": {"connect": {"id": chatroom_id}},
                "message": message,
            },
        )


service = ChatService()
