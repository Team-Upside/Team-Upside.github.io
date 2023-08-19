# Pairing Backend

Backend of **Pairing** project.

## How to build

```bash
$ docker build pairing:latest .
```

## How to run

### Local Environment (Python >= 3.10)

```bash
$ python3 -m pip install -r requirements.txt
$ python3 -m pairing
```

### Container Environment

```bash
$ docker run -p 8000:8000 pairing:latest
```

## Swagger Docs

```
http://localhost:8000/docs
```
