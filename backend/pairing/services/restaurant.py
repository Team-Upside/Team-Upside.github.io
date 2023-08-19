from fastapi import HTTPException
from prisma.models import Restaurant

from pairing.dtos.restaurant import CreateRestaurantDto
from prisma import Prisma


class NoRestaurantFoundByIdException(HTTPException):
    def __init__(self, id: int):
        super().__init__(status_code=404, detail=f"Restaurant id {id} not found")


class RestaurantService:
    async def create_restaurant(self, db: Prisma, create_restaurant_dto: CreateRestaurantDto) -> Restaurant:
        return await db.restaurant.create(
            data={
                "name": create_restaurant_dto.name,
                "longitude": create_restaurant_dto.longitude,
                "latitude": create_restaurant_dto.latitude,
                "pictures": create_restaurant_dto.pictures,
            }
        )

    async def get_restaurant(self, db: Prisma, id: int) -> Restaurant:
        restaurant = await db.restaurant.find_first(where={"id": id})
        if restaurant is None:
            raise NoRestaurantFoundByIdException(id)
        return restaurant

    async def get_restaurants(self, db: Prisma) -> list[Restaurant]:
        return await db.restaurant.find_many()


service = RestaurantService()
