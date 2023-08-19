from datetime import datetime

from pydantic import BaseModel


class RestaurantDto(BaseModel):
    id: int
    name: str
    longitude: float
    latitude: float
    pictures: list[str]
    created_at: datetime
    updated_at: datetime
