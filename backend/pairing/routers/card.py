from typing import Annotated

from fastapi import APIRouter, Depends, Security

from pairing.auth import get_current_user, scheme
from pairing.db import from_prisma_model, get_transaction
from pairing.dtos.card import CardDto, CreateCardDto
from pairing.dtos.restaurant import CreateRestaurantDto, RestaurantDto
from pairing.dtos.user import UserDto
from pairing.services.card import service as card_service
from prisma import Prisma

router = APIRouter(
    dependencies=[Depends(scheme)]
)


@router.get("")
async def get_cards(
    db: Annotated[Prisma, Depends(get_transaction)],
    user: UserDto = Security(get_current_user),
) -> list[CardDto]:
    card = await card_service.get_cards(db, user.id)
    return from_prisma_model(card, CardDto)


@router.get("/{card_id}")
async def get_card(
    card_id: int,
    db: Annotated[Prisma, Depends(get_transaction)],
    user: UserDto = Security(get_current_user),
) -> list[CardDto]:
    card = await card_service.get_card(db, user.id, card_id)
    return from_prisma_model(card, CardDto)


@router.post("")
async def create_card(
    create_restaurant_dto: CreateCardDto,
    db: Annotated[Prisma, Depends(get_transaction)],
    user: UserDto = Security(get_current_user),
) -> CardDto:
    card = await card_service.create_card(db, user.id, create_restaurant_dto)
    return from_prisma_model(card, CardDto)
