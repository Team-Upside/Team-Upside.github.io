from typing import AsyncIterator, Dict, List, Type, Union

from pydantic import BaseModel

from prisma import Json, Prisma

prisma = Prisma()


async def connect():
    await prisma.connect()


async def disconnect():
    await prisma.disconnect()


async def get_transaction() -> AsyncIterator[Prisma]:
    async with prisma.tx() as transaction:
        yield transaction


def to_prisma_dict(model: BaseModel, remove_null: bool = False) -> Dict:
    """
    Pydantic BaseModel을 Prisma Dict에 맞게 변환합니다.

    :param model: Pydantic Model
    :param remove_null: null 값을 가진 key를 dict에서 없앨지 여부
    :returns:변환된 딕셔너리
    """

    model_dict = model.dict()

    new_model_dict = {}
    for key, val in model_dict.items():
        # nested basemodel을 처리합니다.
        if isinstance(getattr(model, key), BaseModel):
            new_model_dict[key] = to_prisma_dict(getattr(model, key))
        # Pydantic Dict를 prisma Json 형태로 변환하여 저장합니다.
        elif isinstance(val, dict):
            val = Json(val)

        if remove_null and val is None:
            pass
        else:
            new_model_dict[key] = val

    return new_model_dict


def from_prisma_model(
    prisma_models: Union[BaseModel, List[BaseModel]], dto_type: Type[BaseModel]
) -> Union[BaseModel, List[BaseModel]]:
    """
    Prisma의 인스턴스를 dto_type에 맞게 변환합니다.

    :param prisma_models: prisma 인스턴스 혹은 인스턴스 리스트
    :param dto_type: 변환하길 원하는 pydantic 인스턴스 타입
    :returns: 변환된 pydantic 인스턴스 혹은 인스턴스 리스트
    """

    def _from_prisma_model(prisma_model: BaseModel, inner_dto_type: Type[BaseModel]) -> BaseModel:
        new_prisma_dict = {}
        for key, val in prisma_model.__dict__.items():
            # nested basemodel을 처리합니다.
            if isinstance(val, BaseModel):
                new_prisma_dict[key] = _from_prisma_model(val, inner_dto_type.__fields__[key].type_)
            elif isinstance(val, list):
                new_prisma_dict[key] = []
                for inner_val in val:
                    if isinstance(inner_val, BaseModel):
                        new_prisma_dict[key].append(
                            _from_prisma_model(inner_val, inner_dto_type.__fields__[key].type_)
                        )
                    else:
                        new_prisma_dict[key].append(inner_val)
            # Prisma Json를 Dict 형태로 변환하여 저장합니다.
            elif isinstance(val, Json):
                new_prisma_dict[key] = val.data
            else:
                new_prisma_dict[key] = val

        return inner_dto_type(**new_prisma_dict)

    if isinstance(prisma_models, BaseModel):
        return _from_prisma_model(prisma_models, dto_type)
    else:
        return [_from_prisma_model(prisma_model, dto_type) for prisma_model in prisma_models]
