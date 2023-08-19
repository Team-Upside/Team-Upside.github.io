FROM python:3.10-slim

# 필요한 파일들을 복사합니다.
WORKDIR /app

# 필요한 dependency 를 설치합니다.
COPY requirements.txt .
RUN pip3 install --no-cache-dir --upgrade pip
RUN pip3 install --no-cache-dir --upgrade -r requirements.txt

ADD ./pairing ./pairing

# Clean UP
RUN rm /root/.ssh/id_rsa && \
    apt-get purge openssh-client git -y && \
    apt-get autoremove openssh-client git -y

ENTRYPOINT ["uvicorn", "pairing.app:create_app"]

CMD ["--host", "0.0.0.0", "--port", "8000"]
EXPOSE 8000
