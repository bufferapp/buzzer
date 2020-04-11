const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express();
const server = http.Server(app);
const io = socketio(server);

const title = 'Buffer Buzzer'

const initData = () => ({
  users: new Set(),
  buzzes: new Map(),
  firstResponse: null,
});

let data = initData();

const getBuzzerValues =  (data) => Array.from(data.buzzes, ([ _key, values ]) => values);


const getData = () => ({
  users: [...data.users],
  buzzes: [...getBuzzerValues(data)]
})

const computeLatence = (firstResponse) => new Date().getTime() - firstResponse

app.use(express.static('public'))
app.set('view engine', 'pug')

app.get('/', (_req, res) => res.render('index', { title }))
app.get('/host', (_req, res) => res.render('host', Object.assign({ title }, getData())))

io.on('connection', (socket) => {
  socket.on('join', (user) => {
    data.users.add(user.id)
    io.emit('active', [...data.users].length)
    console.log(`${user.name} joined!`)
  })

  socket.on('buzz', (user) => {
    const latence = data.firstResponse
      ? computeLatence(data.firstResponse)
      : null;

    if(data.buzzes.size === 0) {
      data.firstResponse = new Date().getTime()
    }

    if(!data.buzzes.get(user.name)){
      data.buzzes.set(
        user.name,
        { latence, user: { name: user.name, team: user.team } }
      )
    }

    io.emit('buzzes', [...data.buzzes])
    console.log(`${latence} ${user.name} buzzed in! ${latence ? `(+ ${latence}ms)` : ''}`)
  })

  socket.on('clear', () => {
    data = initData();
    io.emit('buzzes', [...data.buzzes])
    console.log(`Clear buzzes`)
  })
})

const port = process.env.PORT || 8090;
server.listen(port, () => console.log(`Listening on ${port}`))
