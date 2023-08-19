import openai
from fastapi import HTTPException
from prisma.enums import CardStatus, UserCardStatus
from prisma.models import Card, UserCard

from pairing.dtos.card import CreateCardDto
from prisma import Prisma


class NoCardByIdException(HTTPException):
    def __init__(self, id: int):
        super().__init__(status_code=404, detail=f"Card id {id} not found")


class UserCardExistsException(HTTPException):
    def __init__(self, user_id: str, card_id: int):
        super().__init__(status_code=409, detail=f"User id {user_id} and card id {card_id} relation exists.")


def get_prompt(
    opponent_name: str,
    opponent_birthdate: str,
    opponent_gender: str,
    user_name: str,
    user_birthdate: str,
    user_gender: str,
    opponent_mbti: str | None = None,
    opponent_interest: str | None = None,
    user_mbti: str | None = None,
    user_interest: str | None = None,
) -> str:
    return f"""
You are a bot that listens to the characteristics of a user and opponent, and suggests what conversation they should have when they meet.

Here are the characteristics of the other user and the user:

Below is opponent's features:
* Name: {opponent_name}
* Date of birth: {opponent_birthdate}
* Gender: {opponent_gender}
* MBTI: {opponent_mbti or "Not Provided"}
* Interests: {opponent_interest or "Not Provided"}

Below is user's features:
* Name: {user_name}
* Date of birth: {user_birthdate}
* Gender: {user_gender}
* MBTI: {user_mbti or "Not Provided"}
* Interests: {user_interest or "Not Provided"}

Using the information of each user, I want to find commonalities between them to pique each other's interest.
Instead of focusing on the user's features, I want to focus on the features of the other user.
In 1 **short** sentence (less than 180 letters), suggest to the user what kind of conversations they should have.
You are speaking to the user.
    """.strip()


class CardService:
    async def create_card(self, db: Prisma, user_id: str, create_card_dto: CreateCardDto) -> Card:
        return await db.card.create(
            data={
                "user": {"connect": {"id": user_id}},
                "restaurant": {"connect": {"id": create_card_dto.restaurant_id}},
                "message": create_card_dto.message,
            },
            include={"restaurant": True, "user": True},
        )

    async def get_card(self, db: Prisma, id: int) -> Card:
        card = await db.card.find_first(
            where={"id": id},
            include={"restaurant": True, "user": True},
        )
        if not card:
            raise NoCardByIdException(id)
        return card

    async def get_user_card(self, db: Prisma, user_id: str, card_id: int) -> UserCard | None:
        user_card = await db.usercard.find_first(
            where={"user_id": user_id, "card_id": card_id},
        )
        return user_card

    async def get_cards(self, db: Prisma, user_id: str) -> list[Card]:
        return await db.card.find_many(
            where={"user_id": {"not": user_id}, "status": CardStatus.WAITING},
            include={"restaurant": True, "user": True},
            order={"created_at": "desc"},
        )

    async def change_card_status(self, db: Prisma, id: int, status: CardStatus) -> Card:
        card = await db.card.update(where={"id": id}, data={"status": status})
        if not card:
            raise NoCardByIdException(id)
        return card

    async def change_user_card_status(self, db: Prisma, user_id: str, card_id: int, status: UserCardStatus) -> UserCard:
        user_card = await db.usercard.find_first(
            where={"user_id": user_id, "card_id": card_id},
        )
        if user_card:
            raise UserCardExistsException(user_id, card_id)
        user_card = await db.usercard.create(
            data={
                "user": {"connect": {"id": user_id}},
                "card": {"connect": {"id": card_id}},
                "status": status,
            },
        )
        return user_card

    async def gpt_advice(self, db: Prisma, user_id: str, card_id: int) -> str:
        user =  await db.user.find_first_or_raise(
            where={"id": user_id},
        )
        card = await db.card.find_first_or_raise(
            where={"id": card_id},
            include={"restaurant": True, "user": True},
        )
        opponent = card.user

        gpt_advice = await db.gptadvice.find_first(
            where={"user_id": user_id, "opponent_user_id": opponent.id},
        )
        if gpt_advice:
            message = gpt_advice.message
        else:
            prompt = get_prompt(
                user_name=user.nickname,
                user_birthdate=user.birthdate,
                user_gender=user.gender,
                user_mbti=user.mbti,
                user_interest=user.interest,
                opponent_name=opponent.nickname,
                opponent_birthdate=opponent.birthdate,
                opponent_gender=opponent.gender,
                opponent_mbti=opponent.mbti,
                opponent_interest=opponent.interest,
            )
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": prompt},
                ]
            )

            message = response['choices'][0]['message']['content']
            input_tokens = response['usage']['prompt_tokens']
            output_tokens = response['usage']['completion_tokens']
            price = 0.03 * input_tokens / 1000 + 0.06 * output_tokens / 1000

            await db.gptadvice.create(
                data={
                    "user": {"connect": {"id": user_id}},
                    "opponent": {"connect": {"id": opponent.id}},
                    "message": message,
                    "price": price,
                },
            )

        return message.replace('"', "").replace("'", "").replace("\n", " ").strip()


service = CardService()
