import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')

export default (_, inject) => {
  const echo = new Echo({
    broadcaster: 'pusher',
    key: 'local', // .env
    // wsHost: 'localhost',
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
    // authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
    // authModule: true,

  })

  inject('echo', echo)
}
