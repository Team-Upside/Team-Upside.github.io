from datetime import datetime

from fastapi import HTTPException
from prisma.models import User

from pairing.dtos.user import CreateUserDto
from prisma import Prisma


class NoUserFoundByIdException(HTTPException):
    def __init__(self, id: str):
        super().__init__(status_code=404, detail=f"User id {id} not found")


class UserAlreadyExistsException(HTTPException):
    def __init__(self, id: str):
        super().__init__(status_code=409, detail=f"User id {id} already exists")


class UserService:
    async def get_user(self, db: Prisma, user_id: str) -> User:
        user = await db.user.find_unique(where={"id": user_id})
        if user is None:
            raise NoUserFoundByIdException(user_id)
        return user

    async def create_user(self, db: Prisma, user_id: str, create_user_dto: CreateUserDto) -> User:
        user = await db.user.find_unique(where={"id": user_id})
        if user is not None:
            raise UserAlreadyExistsException(user_id)
        return await db.user.create(
            data={
                "id": user_id,
                "nickname": create_user_dto.nickname,
                "birthdate": create_user_dto.birthdate,
                "gender": create_user_dto.gender,
                "mbti": create_user_dto.mbti,
                "interest": create_user_dto.interest,
                "favorite_food": create_user_dto.favorite_food,
                "profile": create_user_dto.profile,
            }
        )

    async def delete_user(self, db: Prisma, user_id: str) -> User:
        user = await db.user.delete(where={"id": user_id})
        if user is None:
            raise NoUserFoundByIdException(user_id)
        return user

    async def update_user_profile(self, db: Prisma, user_id: str, profile: str):
        user = await db.user.update(where={"id": user_id}, data={"profile": profile})
        if user is None:
            raise NoUserFoundByIdException(user_id)
        return user


service = UserService()
