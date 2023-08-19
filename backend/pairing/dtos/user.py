from datetime import date, datetime

from prisma.enums import Gender
from pydantic import BaseModel


class CreateUserDto(BaseModel):
    nickname: str
    birthdate: str
    gender: Gender
    mbti: str | None = None
    interest: str | None = None
    favorite_food: str | None = None
    profile: str | None = None


class UserDto(BaseModel):
    id: str
    nickname: str
    birthdate: str
    gender: Gender
    mbti: str | None = None
    interest: str | None = None
    favorite_food: str | None = None
    profile: str | None = None
    created_at: datetime
    updated_at: datetime
