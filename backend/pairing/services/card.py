from fastapi import HTTPException
from prisma.enums import CardStatus, UserCardStatus
from prisma.models import Card, UserCard

from pairing.dtos.card import CreateCardDto
from prisma import Prisma


class NoCardByIdException(HTTPException):
    def __init__(self, id: int):
        super().__init__(status_code=404, detail=f"Card id {id} not found")


class UserCardExistsException(HTTPException):
    def __init__(self, user_id: str, card_id: int):
        super().__init__(status_code=409, detail=f"User id {user_id} and card id {card_id} relation exists.")


class CardService:
    async def create_card(self, db: Prisma, user_id: str, create_card_dto: CreateCardDto) -> Card:
        return await db.card.create(
            data={
                "user": {"connect": {"id": user_id}},
                "restaurant": {"connect": {"id": create_card_dto.restaurant_id}},
                "message": create_card_dto.message,
            },
            include={"restaurant": True, "user": True},
        )

    async def get_card(self, db: Prisma, id: int) -> Card:
        card = await db.card.find_first(
            where={"id": id},
            include={"restaurant": True, "user": True},
        )
        if not card:
            raise NoCardByIdException(id)
        return card

    async def get_user_card(self, db: Prisma, user_id: str, card_id: int) -> UserCard | None:
        user_card = await db.usercard.find_first(
            where={"user_id": user_id, "card_id": card_id},
        )
        return user_card

    async def get_cards(self, db: Prisma, user_id: str) -> list[Card]:
        return await db.card.find_many(
            where={"user_id": {"not": user_id}, "status": CardStatus.WAITING},
            include={"restaurant": True, "user": True},
            order={"created_at": "desc"},
        )

    async def change_card_status(self, db: Prisma, id: int, status: CardStatus) -> Card:
        card = await db.card.update(where={"id": id}, data={"status": status})
        if not card:
            raise NoCardByIdException(id)
        return card

    async def change_user_card_status(self, db: Prisma, user_id: str, card_id: int, status: UserCardStatus) -> UserCard:
        user_card = await db.usercard.find_first(
            where={"user_id": user_id, "card_id": card_id},
        )
        if user_card:
            raise UserCardExistsException(user_id, card_id)
        user_card = await db.usercard.create(
            data={
                "user": {"connect": {"id": user_id}},
                "card": {"connect": {"id": card_id}},
                "status": status,
            },
        )
        return user_card


service = CardService()
