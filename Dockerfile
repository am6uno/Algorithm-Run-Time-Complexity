FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY target/encounter-0.0.1-SNAPSHOT.jar ./myapp.jar

COPY src/main/resources/application.properties ./application.properties

COPY .env ./.env

CMD ["java", "-jar", "/app/myapp.jar"]