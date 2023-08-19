# pyright: reportUnusedFunction=false
import traceback

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from loguru import logger

from .errors import ServerRequestError
from .routers.example import router as example_router


def create_app():
    app = FastAPI(
        title="Pairing Backend",
        description="Pairing Backend",
    )
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
                "detail": repr(exc),
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
