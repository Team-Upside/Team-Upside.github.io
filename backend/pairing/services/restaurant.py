from fastapi import HTTPException
from prisma.models import Pairing, Restaurant

from prisma import Prisma


class NoRestaurantFoundByIdException(HTTPException):
    def __init__(self, id: int):
        super().__init__(status_code=404, detail=f"Restaurant id {id} not found")


class RestaurantService:
    async def get_restaurant(self, db: Prisma, id: int) -> Restaurant:
        restaurant = await db.restaurant.find_first(where={"id": id})
        if restaurant is None:
            raise NoRestaurantFoundByIdException(id)
        return restaurant

    async def get_restaurants(self, db: Prisma) -> list[Restaurant]:
        return await db.restaurant.find_many()


service = RestaurantService()
