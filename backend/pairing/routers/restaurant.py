from typing import Annotated

from fastapi import APIRouter, Depends, Security

from pairing.auth import get_current_user, scheme
from pairing.db import from_prisma_model, get_transaction
from pairing.dtos.restaurant import CreateRestaurantDto, RestaurantDto
from pairing.dtos.user import UserDto
from pairing.services.restaurant import service as restaurant_service
from prisma import Prisma

router = APIRouter(
    dependencies=[Depends(scheme)]
)


@router.get("")
async def get_restaurants(
    db: Annotated[Prisma, Depends(get_transaction)],
    user: UserDto = Security(get_current_user),
) -> list[RestaurantDto]:
    restaurants = await restaurant_service.get_restaurants(db)
    return from_prisma_model(restaurants, RestaurantDto)


@router.post("")
async def create_restaurant(
    create_restaurant_dto: CreateRestaurantDto,
    db: Annotated[Prisma, Depends(get_transaction)],
    user: UserDto = Security(get_current_user),
) -> RestaurantDto:
    restaurant = await restaurant_service.create_restaurant(db, create_restaurant_dto)
    return from_prisma_model(restaurant, RestaurantDto)
