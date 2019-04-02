<p align="center">
  <img width="400px" src="https://github.com/bufferapp/buzzer/blob/master/public/buzzer-logo.svg?raw=true&sanitize=true" alt="Buzzer"/>
</p>

A little buzzer app for running your own quizzes or game shows! Uses websockets to sent messages.

## Running the app

You'll need [Node.js](https://nodejs.org) or [Docker](https://www.docker.com/) to run this
application. For Node:

```
npm install
node index.js
```

For Docker:

```
docker build -t buzzer .
docker run -p 8090:8090 buzzer
```

Open http://localhost:8090 in your browser to start!

## How to use

The players goto the homepage (`http://localhost:8090/`) and they can enter their name and team
number. Joining will give them a giant buzzer button!

The host heads over to `/host` and will be able to see everyone that buzzes in and clear the list
in between questions.

Join a team                | Buzz in                   | Host view                  |
:-------------------------:|:-------------------------:|:-------------------------:|
<img width="250px" src="https://github.com/bufferapp/buzzer/blob/master/screenshots/player-join-v3.png?raw=true" alt="Join a team"/> | <img width="250px" src="https://github.com/bufferapp/buzzer/blob/master/screenshots/player-buzzer-v3.png?raw=true" alt="Buzz in"/> | <img width="250px" src="https://github.com/bufferapp/buzzer/blob/master/screenshots/host-v3.png?raw=true" alt="Host view"/>

## License

MIT
