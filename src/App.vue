<template>
  <v-app>

      <v-app-bar prominent class="bg-blue-grey-darken-2">
        <v-icon class="me-3">handshake</v-icon>

        <v-toolbar-title>Online Dating App</v-toolbar-title>

        <v-spacer></v-spacer>
        
      </v-app-bar>

      <v-navigation-drawer floating permanent elevation="5">
        <v-list density="compact" nav>
          <v-list-item prepend-icon="dashboard" title="userList" value="userList" :to="{ name: 'userList'}"></v-list-item>
          <v-list-item prepend-icon="chat" title="MessageList" value="messageList" :to="{ name: 'messageList'}"></v-list-item>
          <v-list-item prepend-icon="public" title="UserMap" value="userMap" :to="{ name: 'userMap'}"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view/>
      </v-main>
  
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
