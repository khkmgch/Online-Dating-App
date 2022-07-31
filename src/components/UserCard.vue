<template>
    <v-card width="250" elevation="5" outlined class="ma-5">
        <v-img height="200" :src="user.picture.thumbnail" cover></v-img>

        <v-card-title>
            {{ user.name.first + " " + user.name.last }}
        </v-card-title>
        <v-card-subtitle>
            {{ user.dob.age + " years old" }}
        </v-card-subtitle>
        <v-card-subtitle>
            {{ user.location.state + " / " + user.location.country }}
        </v-card-subtitle>

        <div class="d-flex justify-center px-4 my-2">
            <v-btn 
                color="orange-lighten-2" 
                variant="text" 
                icon="format_list_bulleted" 
                :to="{ name: 'userDetail', params: { id: user.login.uuid } }">
            </v-btn>
            
            <v-spacer></v-spacer>

            <v-btn 
                color="orange-lighten-2" 
                variant="text" 
                icon="chat" 
                :to="{ name: 'chat', params: { id: user.login.uuid } }">
            </v-btn>
        </div>
    </v-card>
</template>

<script>

export default {
    name: 'UserCard',
    props: {
        user: Object
    }
}
</script>
