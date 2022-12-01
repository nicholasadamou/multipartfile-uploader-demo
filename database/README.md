# Database

This is the PostgreSQL database.

## Docker

Build the docker image using [`make`](Makefile):

```bash
make all
```

Start the docker container:

```bash
docker compose up -d && docker logs -f postgres
```

## License

This project is ©, Nicholas Adamou.

It is free software, and may be redistributed under the terms specified in the [LICENSE] file.

[license]: LICENSE
