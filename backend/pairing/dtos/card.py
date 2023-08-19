from datetime import datetime

from prisma.enums import CardStatus
from pydantic import BaseModel

from .restaurant import RestaurantDto
from .user import UserDto


class CreateCardDto(BaseModel):
    restaurant_id: int
    message: str


class CardDto(BaseModel):
    id: int
    restaurant: RestaurantDto
    user: UserDto
    message: str
    status: CardStatus
    created_at: datetime
    updated_at: datetime
