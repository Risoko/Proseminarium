FROM python:3.8.1-alpine

ENV PYTHONUNBUFFERED = 1

WORKDIR /app/backend

COPY requirements.txt /app/backend
RUN \
 apk add --no-cache python3 postgresql-libs && \
 apk add --no-cache --virtual .build-deps gcc python3-dev musl-dev postgresql-dev

RUN apk --update add \
    build-base \
    jpeg-dev \
    zlib-dev

RUN pip install -r requirements.txt

EXPOSE 8005

COPY . /app/backend

RUN adduser -D risoko
USER risoko
