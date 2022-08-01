<template>
  <div v-if="user !== null">
    <v-app-bar 
      prominent 
      class="bg-blue-grey-lighten-1 mx-0"
      >
      <v-btn 
        icon="logout" 
        class="rotate-180" 
        :to="{ name: 'messageList'}"></v-btn>

      <v-toolbar-title>{{ user.name.first + " " + user.name.last }}</v-toolbar-title>

      <v-spacer></v-spacer>
        
    </v-app-bar>

    <div v-for="(message, index) in messages" :key="index" class="pa-5 ma-5">
      <div class="pa-2">
        <v-row class="justify-end">
          <v-spacer></v-spacer>
          <v-col cols="3" class="d-flex flex-column">
            <v-card width="250" elevation="4" color="teal-accent-2" class="rounded-lg rounded-te-0 px-4 py-3">
              {{ message.send }}
            </v-card>
            <div class="text-left text-medium-emphasis text-body-2 my-1">{{ dateString(message) }}</div>
          </v-col>
        </v-row>
        <v-row class="justify-start">
          <v-avatar>
            <v-img :src="user.picture.thumbnail"></v-img>
          </v-avatar>
          <v-col cols="3" class="d-flex flex-column">
            <v-card width="250" elevation="4" color="teal-accent-2" class="rounded-lg rounded-ts-0 px-4 py-3 ms-2 mt-4">
              {{ message.reply }}
            </v-card>
            <div class="w-px250 text-right text-medium-emphasis text-body-2 my-1 pe-5">{{ dateString(message) }}</div>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </div>
    </div>

    <v-footer 
      app
      class="bg-blue-grey-lighten-5 mx-0"
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-col
          class="mt-4"
          cols="11"
        >
          <v-text-field
            label="message"
            hide-details="auto"
            v-model="currMessage"
            @keydown.enter="sendMessage"
          ></v-text-field>
        </v-col>

        <v-btn
          icon="send"
          color="blue-grey-darken-2"
          variant="text"
          class="mx-2 mt-5"
          rounded="xl"
          @click="sendMessage"
        >
        </v-btn>
      </v-row>
    </v-footer>

  </div>
</template>

<style scoped>
  .rotate-180{
    transform: rotate(180deg);
  }
  .w-px250{
    width: 250px;
  }
</style>

<script>
import axios from 'axios'
// Components

export default {
  name: 'ChatView',

  components: {
    
  },
  data(){
    return {
      currMessage: ""
    }
  },
  computed: {
    user(){
      let id = this.$route.params.id
      let user = this.$store.getters['users/getUserById'](id)
      if(user === undefined)return null;
      return user
    },
    messages(){
    let id = this.$route.params.id
    let messages = this.$store.getters['messages/getMessagesById'](id)
    if(messages === undefined)return null
    return messages
    }
  },
  methods: {
    sendMessage(){
      if(this.currMessage === "")return;

      let messageObj = {
        id : this.$route.params.id,
        message : {
          date : new Date(),
          send : this.currMessage,
          reply : ""
        }
      }
      let params = new FormData();
      params.append("apikey", "DZZsuJlHHOiO2PcsnoGFU9a38oxGQzBG");
      params.append("query", this.currMessage);
      axios.post('https://api.a3rt.recruit.co.jp/talk/v1/smalltalk',params)
        .then(response =>{
          let reply = response.data.results[0].reply
          messageObj.message.reply = reply
          this.$store.commit('messages/setMessages', messageObj)
          this.currMessage = ""
        }).catch(error => {
          console.log(error);
        });
    },
    dateString(messageObj){
      if(messageObj === undefined)return ""

      let dateObj = messageObj.date
      let curr = new Date()
      let dateStr = ""
      if(dateObj.getFullYear() !== curr.getFullYear()){
        dateStr += dateObj.getFullYear() + "/"
      }
      if(dateObj.getFullYear() !== curr.getFullYear() || dateObj.getMonth() !== curr.getMonth() || dateObj.getDate() !== curr.getDate()){
        let month = dateObj.getMonth() + 1
        dateStr += (1 <= month && month <= 9) ? `0${month}/` : `${month}/`

        let date = dateObj.getDate()
        dateStr += (1 <= date && date <= 9) ? `0${date}/` : `${date}/`
      }
      let hour = dateObj.getHours()
      dateStr += (0 <= hour && hour <= 9) ? `0${hour}:` : `${hour}:`

      let minutes = dateObj.getMinutes()
      dateStr += (0 <= minutes && minutes <= 9) ? `0${minutes}` : `${minutes}`

      return dateStr
    }
  }
};
</script>