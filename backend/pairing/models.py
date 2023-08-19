from pydantic import BaseModel


class ExampleDto(BaseModel):
    payload: str
