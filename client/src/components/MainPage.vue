<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="container">
      <li v-for="user of newusers" :key={user}>

        </li>
      <div class="row">
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
      <div v-if="auth">
        ascaa
      </div>
    </div>
  </div>
</template>

<script>

import {socketio} from '../main'

export default {
  name: 'MainPage',
  props: {
    msg: String
  },
  data() {
    return {
      login: "",
      auth: "",
      newusers: []
    }
  },
  created() {
socketio.emit('getAllUsers');
      socketio.on('returnAllUsers', function(data) {
        console.log(data)
      })
  },
  methods: {
    loginUser() {
      this.$http.post('http://localhost:3000/login', {
        login: this.login, 
      })
      .then(data => {
        this.$store.commit('login', data.data._id)
        this.auth = this.$store.state.userid
      }) 
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
