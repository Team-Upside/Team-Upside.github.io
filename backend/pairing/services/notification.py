from fastapi import HTTPException
from prisma.models import Notification, Pairing

from prisma import Prisma


class NoNotificationFoundByIdException(HTTPException):
    def __init__(self, id: int):
        super().__init__(status_code=404, detail=f"Notification id {id} not found")


class NotificationService:
    async def create_notification(self, db: Prisma, user_id: str, pairing: Pairing) -> Notification:
        return await db.notification.create(
            data={
                "user": {"connect": {"id": user_id}},
                "pairing": {"connect": {"id": pairing.id}},
                "message": f"{pairing.user.nickname} has requested pairing with you!",
            }
        )

    async def get_notifications(self, db: Prisma, user_id: str) -> list[Notification]:
        return await db.notification.find_many(where={"user_id": user_id}, order={"created_at": "desc"})

    async def patch_notification(self, db: Prisma, notification_id: int, read: bool) -> Notification:
        notification = await db.notification.update(where={"id": notification_id}, data={"read": read})
        if notification is None:
            raise NoNotificationFoundByIdException(notification_id)
        return notification


service = NotificationService()
