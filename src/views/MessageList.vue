<template>
    <v-navigation-drawer elevation="5"
      width="400"
      class="overflow-auto">
      <v-list v-for="(user, index) in sortedUsers" :key="index">
        <v-list-item 
          v-if="lastMessage(user.login.uuid) !== null" 
          :to="{ name: 'chat', params: { id: user.login.uuid } }"
          height="80"  
          class="my-0 py-0">
          <v-row class="my-0">
            <v-col cols="2">
              <v-avatar>
                <v-img :src="user.picture.thumbnail"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="8">
              <div class="font-weight-bold">
                {{ user.name.first + " " + user.name.last }}
              </div>
              <div class="text-medium-emphasis d-inline-block text-truncate" style="max-width: 150px;">
                {{ lastMessage(user.login.uuid)['reply'] }}
              </div>
            </v-col>
            <v-col cols="2" class="text-medium-emphasis">
              <div class="text-medium-emphasis">
                {{ dateString(lastMessage(user.login.uuid)['date']) }}
              </div>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>

// Components

export default {
  name: 'MessageList',

  components: {
    
  },
  computed: {
    sortedUsers(){
      let usersObj = this.$store.state.users.users
      let users = Object.values(usersObj).filter(user => this.lastMessage(user.login.uuid) !== null)
      if(users.length <= 1)return users
      return this.sortedUsersHelper(users, 0, users.length-1)
    }
  },
  methods: {
    sortedUsersHelper(usersArr, start, end){
      if(start === end)return [usersArr[start]]

      let mid = Math.floor((start + end)/ 2)

      let left = this.sortedUsersHelper(usersArr, start, mid)
      let right = this.sortedUsersHelper(usersArr, mid+1, end)

      left.push(Infinity)
      right.push(Infinity)

      let merged = []

      let li = 0
      let ri = 0
      while(li + ri < left.length + right.length -2){
        if(right[ri] === Infinity){
          merged.push(left[li])
          li++
        }else if(left[li] === Infinity){
          merged.push(right[ri])
          ri++
        }else if(this.lastMessage(left[li].login.uuid).date <= this.lastMessage(right[ri].login.uuid).date){
          merged.push(right[ri])
          ri++
        }else{
          merged.push(left[li])
          li++
        }
      }
      return merged
    },
    lastMessage(id){
      let messages = this.$store.getters['messages/getMessagesById'](id)
      if(messages === undefined)return null
      return messages[messages.length-1]
    },
    dateString(dateObj){
      if(dateObj === undefined)return ""
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