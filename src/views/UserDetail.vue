<template>
  <v-container>
    <v-card width="250" elevation="5" outlined class="ma-5">
        <v-img height="200" v-if="user !== null" :src="user.picture.thumbnail" cover></v-img>
    </v-card>

    <v-table>
      <tbody>
        <tr>
          <td>Name</td>
          <td>{{  }}</td>
        </tr>
        <tr>
          <td>Age</td>
          <td>{{  }}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>{{  }}</td>
        </tr>
        <tr>
          <td>Country</td>
          <td>{{  }}</td>
        </tr>
        <tr>
          <td>State</td>
          <td>{{  }}</td>
        </tr>
        <tr>
          <td>Birthday</td>
          <td>{{  }}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{{  }}</td>
        </tr>
      </tbody>
    </v-table>

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
  }
};
</script>