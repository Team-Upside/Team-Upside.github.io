from fastapi import HTTPException
from prisma.enums import CardStatus
from prisma.models import Card

from pairing.dtos.card import CreateCardDto
from prisma import Prisma


class NoCardByIdException(HTTPException):
    def __init__(self, id: int):
        super().__init__(status_code=404, detail=f"Card id {id} not found")


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

    async def get_cards(self, db: Prisma, user_id: str) -> list[Card]:
        return await db.card.find_many(
            where={"user_id": {"not": user_id}, "status": CardStatus.WAITING},
            include={"restaurant": True, "user": True},
            order={"created_at": "desc"},
        )


service = CardService()
