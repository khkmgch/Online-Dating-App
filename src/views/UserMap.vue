<template>
  <v-container class="d-flex justify-center align-center">
    <div v-if="users !== undefined" style="height: 700px; width: 90%;" class="mt-5 pt-5">
        <LMap
          :center="mapCenter"
          :zoom="3"
        >
          <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          ></LTileLayer>
          <LControlLayers />
      
          <div v-for="(user, key) in users" :key="key">
            <LMarker
              :lat-lng="[latitude(user), longitude(user)]">
              <LPopup>
                <div class="d-flex justify-center">
                  <v-card 
                    elevation="3"
                    width="50"
                    :to="{ name: 'userDetail', params: { id: user.login.uuid } }">
                    <v-img
                      :src="user.picture.thumbnail"
                      height="50"
                      contain></v-img>
                  </v-card>
                </div>
                <div>{{ user.name.first + " " + user.name.last }}</div>
              </LPopup>
            </LMarker>
          </div>
        </LMap>
    </div>
  </v-container>
</template>

<script>
import 'leaflet/dist/leaflet.css'
// Components
import {
    LMap,
    LTileLayer,
    LControlLayers,
    LMarker,
    LPopup
} from '@vue-leaflet/vue-leaflet';

export default {
  name: 'UserMap',

  components: {
    LMap,
    LTileLayer,
    LControlLayers,
    LMarker,
    LPopup
  },
  data(){
    return {
      mapCenter : [35.68944, 139.69167]
    }
  },
  computed: {
    users(){
      return this.$store.state.users.users
    }
  },
  methods: {
    latitude(user){
      if(user === undefined)return;
      return user['location']['coordinates']['latitude']
    },
    longitude(user){
      if(user === undefined)return;
      return user['location']['coordinates']['longitude']
    }
  }
};
</script>