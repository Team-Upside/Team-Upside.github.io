from datetime import datetime

from pydantic import BaseModel


class CreateNotificationDto(BaseModel):
    pairing_id: int
    message: str


class NotificationDto(BaseModel):
    id: int
    message: str
    read: bool
    created_at: datetime
    updated_at: datetime
