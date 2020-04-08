FROM python:3.8.1-alpine

ENV PYTHONUNBUFFERED = 1

WORKDIR /src/backend

COPY requirements.txt /src/backend
RUN \
 apk add --no-cache python3 postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc python3-dev musl-dev postgresql-dev


RUN pip install -r requirements.txt

EXPOSE 8003

COPY . /src/backend

RUN adduser -D risoko1
USER risoko1
