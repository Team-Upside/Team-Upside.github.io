from fastapi import APIRouter

from pairing.dtos.example import ExampleDto

router = APIRouter()


@router.post("")
async def example(request: ExampleDto):
    return {"message": f"Your payload is {request.payload}"}
