<template>
  <v-container>
    <div class="d-flex flex-wrap">
      <UserCard v-for="(user, key) in users" :key="key" :user="user"></UserCard>
    </div>
  </v-container>
</template>

<script>
import UserCard from '../components/UserCard.vue'
import axios from 'axios'

export default {
  name: 'UserList',
  components: {
    UserCard,
  },
  created(){
    let users = this.$store.state.users.users
    if(Object.values(users).length === 0){
      axios.get('https://randomuser.me/api/?results=20')
        .then(response => {
          let userData = response.data.results
          for(let i = 0; i < userData.length; i++){
            this.$store.dispatch('users/fetchUsers', userData[i])
          }
        })
        .catch(error => console.log(error))
    }    
  },
  computed: {
    users(){
      return this.$store.state.users.users
    }
  },
  methods: {
    
  }
}
</script>