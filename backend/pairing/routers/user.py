import os
from typing import Annotated
from uuid import uuid4

from fastapi import APIRouter, Depends, Security, UploadFile
from google.cloud import storage

from pairing.auth import get_current_user, get_current_user_id, scheme
from pairing.db import from_prisma_model, get_transaction
from pairing.dtos.user import CreateUserDto, UserDto
from pairing.services.user import service as user_service
from prisma import Prisma

router = APIRouter(
    dependencies=[Depends(scheme)]
)

client = storage.Client()
bucket = client.get_bucket("pairing-artifacts")


@router.get("/me")
async def get_me(user: UserDto = Security(get_current_user)) -> UserDto:
    return user


@router.get("/{user_id}")
async def get_user(user_id: str, db: Annotated[Prisma, Depends(get_transaction)], user: UserDto = Security(get_current_user)) -> UserDto:
    user = await user_service.get_user(db, user_id)
    return from_prisma_model(user, UserDto)


@router.post("")
async def create_user(
    create_user_dto: CreateUserDto,
    db: Annotated[Prisma, Depends(get_transaction)],
    user_id: str = Security(get_current_user_id),
) -> UserDto:
    user = await user_service.create_user(db, user_id, create_user_dto)
    return from_prisma_model(user, UserDto)

@router.post("/profile")
async def update_user_profile(
    file: UploadFile,
    db: Annotated[Prisma, Depends(get_transaction)],
    user: UserDto = Security(get_current_user),
):
    content = await file.read()
    file_extension = file.filename.split('.')[-1]

    # Generate a random UUID for the filename
    random_filename = f"{str(uuid4())}.{file_extension}"

    # Upload the file to GCS
    blob = bucket.blob(random_filename)
    blob.upload_from_string(content, content_type=file.content_type)

    # Update the user profile
    profile_url = blob.public_url
    user_ = await user_service.update_user_profile(db, user.id, profile_url)
    return from_prisma_model(user_, UserDto)
