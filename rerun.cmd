docker stop buzzer
docker rm buzzer
docker build -t buzzer .
docker run --name buzzer -p 8090:8090 buzzer