<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button v-if="auth" type="submit" class="btn btn-primary" @click.prevent="logout()">Logout</button>
    <div class="container">
      <div>Users</div>
      <User
        v-for="user in users"
        :key="user._id"
        :user="user"
      />
      <div class="row" v-if="!auth">
        <div style="display: flex; justify-content: center; width: 100%; margin-top: 5rem;">
          <div class="col-sm-4">
            <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Login address</label>
                <input type="test" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="login">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              </div>
              <button type="submit" class="btn btn-primary" @click.prevent="loginUser()">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div v-else>
        <div>
          <input type="text" class="form-control"/>
          <button type="submit" class="btn btn-primary" @click.prevent="loginUser()">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import socket from '../socket'
import User from "./Users";

export default {
  name: 'MainPage',
  components: { User },
  props: {
    msg: String
  },
  data() {
    return {
      login: "",
      auth: "",
      users: []
    }
  },
  created() {
    this.$http.get('http://localhost:3000/users')
      .then(data => this.users = data.data)
    socket.connect()
    socket.on('users', (data) => {
      this.users = data
    })
  },
  methods: {
    loginUser() {
    //   this.$http.post('http://localhost:3000/login', {
    //     login: this.login, 
    //   })
    //   .then(data => {
    //     this.$store.commit('login', data.data._id)
    //     this.auth = this.$store.state.userid

    //   })

    socket.emit('login', {
      login: this.login
    })
    
    },
    logout() {
      socket.emit('logon', this.auth)
  

      this.auth = ""
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
