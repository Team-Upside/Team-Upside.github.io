# pyright: reportUnusedFunction=false
import traceback

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from loguru import logger
from starlette.middleware.sessions import SessionMiddleware

from .db import connect, disconnect
from .errors import ServerRequestError
from .routers.card import router as card_router
from .routers.example import router as example_router
from .routers.restaurant import router as restaurant_router
from .routers.user import router as user_router


def create_app():
    app = FastAPI(
        title="Pairing Backend",
        description="Pairing Backend",
        swagger_ui_parameters={
            "persistAuthorization": True,
        }
    )
    app.add_middleware(SessionMiddleware, secret_key="some-random-string")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(
        example_router,
        prefix="/example",
        tags=["Example"],
    )
    app.include_router(
        user_router,
        prefix="/users",
        tags=["User"],
    )
    app.include_router(
        restaurant_router,
        prefix="/restaurants",
        tags=["Restaurant"],
    )
    app.include_router(
        card_router,
        prefix="/cards",
        tags=["Card"],
    )

    @app.on_event("startup")
    async def startup():
        await connect()

    @app.on_event("shutdown")
    async def shutdown():
        await disconnect()

    @app.get("/health")
    async def health():
        return {"message": "OK"}

    @app.exception_handler(Exception)
    async def exception_handler(request: Request, exc: Exception):
        tb = traceback.format_exception(type(exc), exc, exc.__traceback__)
        return JSONResponse(
            {
                "type": "InternalError",
                "message": "Internal Server Error",
                "detail": str(exc),
                "traceback": "".join(tb),
            },
            status_code=500,
        )

    @app.exception_handler(ServerRequestError)
    async def server_request_error_handler(request: Request, exc: ServerRequestError):
        tb = traceback.format_exception(type(exc), exc, exc.__traceback__)
        logger.error("대상 서버 요청에 실패하였습니다.", exc_info=exc)
        return JSONResponse(
            {
                "type": "ServerRequestError",
                "status": exc.status,
                "message": exc.message,
                "detail": exc.response,
                "traceback": "".join(tb),
            },
            status_code=503,
        )

    return app
