from jose import JWTError, jwt

from core.config import settings
from core.database import get_users_collection
from core.security import create_access_token, hash_password, verify_password


class AuthService:
    async def create_user(self, name: str, email: str, password: str):
        users = get_users_collection()
        existing = await users.find_one({"email": email})
        if existing:
            raise ValueError("User already exists")

        payload = {"name": name, "email": email, "password_hash": hash_password(password)}
        result = await users.insert_one(payload)

        token = create_access_token(str(result.inserted_id))
        return token

    async def login_user(self, email: str, password: str):
        users = get_users_collection()
        user = await users.find_one({"email": email})
        if not user or not verify_password(password, user["password_hash"]):
            raise ValueError("Invalid credentials")
        return create_access_token(str(user["_id"]))

    async def forgot_password(self, email: str):
        users = get_users_collection()
        user = await users.find_one({"email": email})
        if not user:
            return {"message": "If this email is registered, reset instructions are sent.", "reset_hint": "Check your inbox."}
        return {
            "message": "Reset flow simulated for learning project.",
            "reset_hint": f"User {email} can now set a new password via future reset endpoint.",
        }

    async def get_user_by_token(self, token: str):
        try:
            payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
            user_id = payload.get("sub")
            if not user_id:
                raise ValueError("Invalid token payload")
        except JWTError as exc:
            raise ValueError("Invalid token") from exc

        users = get_users_collection()
        from bson import ObjectId  # local import keeps dependency focused

        user = await users.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise ValueError("User not found")
        return {"id": str(user["_id"]), "name": user["name"], "email": user["email"]}


auth_service = AuthService()
