"""ObjectId helpers and Pydantic-compatible type for MongoDB _id fields."""

from __future__ import annotations

from bson import ObjectId
from bson.errors import InvalidId
from pydantic import GetCoreSchemaHandler
from pydantic_core import core_schema


def oid_to_str(value: ObjectId | str | None) -> str | None:
    if value is None:
        return None
    if isinstance(value, ObjectId):
        return str(value)
    return value


def str_to_oid(value: str) -> ObjectId:
    try:
        return ObjectId(value)
    except InvalidId as exc:
        raise ValueError("Invalid ObjectId string") from exc


def is_valid_oid(value: str) -> bool:
    return ObjectId.is_valid(value)


class PyObjectId(str):
    """String-based id validated as BSON ObjectId (for JSON/API and Pydantic)."""

    @classmethod
    def __get_pydantic_core_schema__(
        cls, _source_type: object, _handler: GetCoreSchemaHandler
    ) -> core_schema.CoreSchema:
        def validate(value: object) -> str:
            if isinstance(value, ObjectId):
                return str(value)
            if isinstance(value, str):
                if not ObjectId.is_valid(value):
                    raise ValueError("Invalid ObjectId")
                return value
            raise ValueError("ObjectId must be str or ObjectId")

        return core_schema.no_info_plain_validator_function(validate)


__all__ = [
    "PyObjectId",
    "is_valid_oid",
    "oid_to_str",
    "str_to_oid",
]
