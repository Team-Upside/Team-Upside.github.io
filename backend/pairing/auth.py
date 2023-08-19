from typing import Annotated

from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, SecurityScopes
from fastapi_auth0 import Auth0, Auth0UnauthenticatedException, Auth0UnauthorizedException
from fastapi_auth0.auth import Auth0HTTPBearer

from pairing.db import from_prisma_model, get_transaction
from prisma import Prisma

from .dtos.user import UserDto

auth0 = Auth0(
    "dev-5dhyz47epja47fuj.us.auth0.com",
    "https://pairing",
)
scheme = auth0.implicit_scheme


async def get_current_user(
    security_scopes: SecurityScopes,
    credentials: HTTPAuthorizationCredentials = Depends(Auth0HTTPBearer(auto_error=False)),
    db: Prisma = Depends(get_transaction),
) -> UserDto:
    try:
        user = await auth0.get_user(security_scopes, credentials)
    except Auth0UnauthenticatedException:
        raise HTTPException(status_code=401, detail="Unauthorized")
    except Auth0UnauthorizedException:
        raise HTTPException(status_code=403, detail="Forbidden")

    user = await db.user.find_unique(where={"id": user.id})
    if user is None:
        raise HTTPException(status_code=403, detail="Forbidden")

    return from_prisma_model(user, UserDto)


async def get_current_user_id(
    security_scopes: SecurityScopes,
    credentials: HTTPAuthorizationCredentials = Depends(Auth0HTTPBearer(auto_error=False)),
) -> str:
    try:
        user = await auth0.get_user(security_scopes, credentials)
    except Auth0UnauthenticatedException:
        raise HTTPException(status_code=401, detail="Unauthorized")
    except Auth0UnauthorizedException:
        raise HTTPException(status_code=403, detail="Forbidden")

    return user.id
