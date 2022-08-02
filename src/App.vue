<template>
  <v-app>

      <v-app-bar height="100" class="bg-blue-grey-darken-2">
        <v-icon class="me-3 font-rem2">handshake</v-icon>
        <div class="text-h5">Online Dating App</div>

        <v-spacer></v-spacer>
        
      </v-app-bar>

      <v-navigation-drawer floating permanent elevation="5" width="350">
        <v-list density="compact" nav>
          <v-list-item :to="{ name: 'userList'}">
            <template v-slot:prepend>
              <v-icon class="font-rem2">dashboard</v-icon>
            </template>
            <v-list-item-title class="font-rem1p5 py-5">UserList</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'messageList'}">
            <template v-slot:prepend>
              <v-icon class="font-rem2">chat</v-icon>
            </template>
            <v-list-item-title class="font-rem1p5 py-5">MessageList</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'userMap'}">
            <template v-slot:prepend>
              <v-icon class="font-rem2">public</v-icon>
            </template>
            <v-list-item-title class="font-rem1p5 py-5">UserMap</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view/>
      </v-main>
  
  </v-app>
</template>

<style scoped>
  .font-rem2{
    font-size: 2rem;
  }
  .font-rem1p5{
    font-size: 1.2rem;
  }
</style>
<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
