<template>
  <v-container>
    <v-row v-if="user !== null" class="d-flex justify-center">
      <v-col cols="12" class="d-flex justify-center">
        <v-card width="400" elevation="5" outlined class="ma-5" :to="{ name: 'chat', params: { id: user.login.uuid } }">
          <v-img height="400" :src="user.picture.thumbnail" cover></v-img>
        </v-card>
      </v-col>

      <v-col cols="8" class="d-flex justify-center">
        <v-table style="width: 700px;">
          <tbody>
            <tr>
              <td class="text-center text-body-1">Name</td>
              <td class="text-center text-body-1">{{ user.name.first + " " + user.name.last }}</td>
            </tr>
            <tr>
              <td class="text-center text-body-1">Age</td>
              <td class="text-center text-body-1">{{ user.dob.age }}</td>
            </tr>
            <tr>
              <td class="text-center text-body-1">Gender</td>
              <td class="text-center text-body-1">{{ user.gender }}</td>
            </tr>
            <tr>
              <td class="text-center text-body-1">Country</td>
              <td class="text-center text-body-1">{{ user.location.country }}</td>
            </tr>
            <tr>
              <td class="text-center text-body-1">State</td>
              <td class="text-center text-body-1">{{ user.location.state }}</td>
            </tr>
            <tr>
              <td class="text-center text-body-1">Birthday</td>
              <td class="text-center text-body-1">{{ birthDay(user) }}</td>
            </tr>
            <tr>
              <td class="text-center text-body-1">Email</td>
              <td class="text-center text-body-1">{{ user.email }}</td>
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