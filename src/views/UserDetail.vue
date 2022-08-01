<template>
  <v-container>
    <v-row v-if="user !== null" class="d-flex justify-center">
      <v-col cols="12" class="d-flex justify-center">
        <v-card width="300" elevation="5" outlined class="ma-5" :to="{ name: 'chat', params: { id: user.login.uuid } }">
          <v-img height="300" :src="user.picture.thumbnail" cover></v-img>
        </v-card>
      </v-col>

      <v-col cols="8" class="d-flex justify-center">
        <v-table style="width: 700px;">
          <tbody>
            <tr>
              <td class="text-center">Name</td>
              <td class="text-center">{{ user.name.first + " " + user.name.last }}</td>
            </tr>
            <tr>
              <td class="text-center">Age</td>
              <td class="text-center">{{ user.dob.age }}</td>
            </tr>
            <tr>
              <td class="text-center">Gender</td>
              <td class="text-center">{{ user.gender }}</td>
            </tr>
            <tr>
              <td class="text-center">Country</td>
              <td class="text-center">{{ user.location.country }}</td>
            </tr>
            <tr>
              <td class="text-center">State</td>
              <td class="text-center">{{ user.location.state }}</td>
            </tr>
            <tr>
              <td class="text-center">Birthday</td>
              <td class="text-center">{{ birthDay(user) }}</td>
            </tr>
            <tr>
              <td class="text-center">Email</td>
              <td class="text-center">{{ user.email }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>

// Components

export default {
  name: 'UserDetail',

  components: {
    
  },
  computed: {
    user(){
      let id = this.$route.params.id
      let user = this.$store.getters['users/getUserById'](id)
      if(user === undefined)return null;
      return user
    }
  },
  methods: {
    birthDay(user){
      let birthDay = user.dob.date
      return birthDay.substring(0, 10).replace(/-/g, "/")
    }
  }
};
</script>