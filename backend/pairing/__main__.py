import uvicorn

from .app import create_app

if __name__ == "__main__":
    app = create_app()
    uvicorn.run("pairing:create_app", host="0.0.0.0", port=8000, reload=True, factory=True)
