from pydantic import BaseSettings


class ServerSettings(BaseSettings):
    example: str = "ExampleConfig"


settings = ServerSettings()
