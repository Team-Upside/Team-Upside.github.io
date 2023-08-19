from datetime import datetime

from pydantic import BaseModel

from .restaurant import RestaurantDto
from .user import UserDto


class ChatRoomDto(BaseModel):
    id: int
    restaurant: RestaurantDto
    users: list[UserDto]
    created_at: datetime
    updated_at: datetime


class ChatRoomWithOpponentAndUnreadCountDto(BaseModel):
    id: int
    restaurant: RestaurantDto
    opponent_user: UserDto
    unread_count: int
    created_at: datetime
    updated_at: datetime


class ChatDto(BaseModel):
    id: int
    user_id: str
    message: str
    created_at: datetime
