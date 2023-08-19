from typing import Optional


class ServerRequestError(Exception):
    """
    타켓 서버 요청 시 응답 코드가 2xx가 아닐 경우, 발생하는 에러

    :param status: 요청한 서버의 응답 코드
    :param response: 요청한 서버의 응답 메시지
    :param message: Error 메시지
    """

    def __init__(
        self,
        status: Optional[int] = None,
        response: str = "",
        message: str = "대상 클라이언트 요청에 실패하였습니다.",
    ):
        self.status = status
        self.response = response
        self.message = message

    def __str__(self):
        return f"[status: {self.status}] {self.message}"

    def __repr__(self) -> str:
        return f"[status: {self.status}] {self.message}"
