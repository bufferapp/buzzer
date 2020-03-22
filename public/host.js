const socket = io()
const active = document.querySelector('.js-active')
const buzzList = document.querySelector('.js-buzzes')
const playerList = document.querySelector('.js-players')
const clear = document.querySelector('.js-clear')

socket.on('active', (numberActive) => {
  active.innerText = `${numberActive} joined`
    playerList.innerHTML="<tr><th>Firstname</th></tr>"
})

socket.on('buzzes', (buzzes) => {
  buzzList.innerHTML = buzzes
    .map(buzz => {
      const p = buzz.split('-')
      return { name: p[0]}
    })
    .map(user => `<li>${user.name}</li>`)
    .join('')
})

clear.addEventListener('click', () => {
  socket.emit('clear')
})

