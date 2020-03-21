docker stop buzzer
docker rm buzzer
docker build -t buzzer .
docker run -d --name buzzer -p 8090:8090 buzzer