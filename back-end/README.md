# Back-End

Handles building compressed and uncompressed chunks, extracting their fully formed file byte data and deleting the built file(s).

## API

The set of available end-points for this service can be found [here](src/main/java/com/nicholasadamou/upload/service/services/DocumentService.java).

## Development

### Requirements

- [Docker](http://docker.com/)
- [Maven](https://maven.apache.org/)
- [Java JDK 18](https://www.oracle.com/java/technologies/downloads/)

### Steps

Create a `.env` file with the following properties using the [`env.example`](env.example) as an example:

```
MAX_FILE_SIZE=10MB
MAX_REQUEST_SIZE=100MB

CORS_ALLOWED_ORIGINS=localhost:3000

PORT=8080

UPLOAD_SERVICE_LOG_LEVEL=INFO
```

Install dependencies.

```bash
mvn -ntp dependency:go-offline
```

Build the `UploadService.jar` file.

```bash
mvn -e -U package -P docker
```

Start the `UploadService.jar` file.

```bash
java -jar target/UploadService.jar
```

## Docker

To build the docker image for Upload Service, run the following command.

```bash
docker compose build
```

Then to execute the docker container, run the following command.

```bash
docker compose up -d
```

## License

© Nicholas Adamou.

It is free software, and may be redistributed under the terms specified in the [LICENSE] file.

[license]: LICENSE
