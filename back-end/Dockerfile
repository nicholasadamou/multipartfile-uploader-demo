FROM maven:openjdk-18-slim as BUILDER

COPY pom.xml .
RUN mvn -ntp dependency:go-offline
COPY src src

RUN apk add maven

RUN mvn package -Dskiptests -DskipFormatCode=true

FROM eclipse-temurin:18-jre-alpine as LAYERS

COPY --from=BUILDER target/UploadService.jar .
RUN java -Djarmode=layertools -jar UploadService.jar extract

FROM eclipse-temurin:18-jre-alpine as SPRING_BOOT

LABEL solution="test"
LABEL component="Upload Service"

COPY --from=LAYERS dependencies/ .
COPY --from=LAYERS snapshot-dependencies/ .
COPY --from=LAYERS springboot-loader/ .
COPY --from=LAYERS application/ .

ENTRYPOINT ["java","org.springframework.boot.loader.JarLauncher"]
