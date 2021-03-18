<template>
  <v-app class="overflow-hidden">
    <v-app-bar
        fixed
        color="#6A76AB"
        dark
        flat
        src="https://picsum.photos/1920/1080?random"

    >
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>중고차 조회</v-toolbar-title>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-sheet
        id="scrolling-techniques-3"
        class="overflow-y-auto"
        min-height="600"
        style="margin-top:100px;"
    >
      <v-container>
        <router-view></router-view>
      </v-container>

    </v-sheet>


    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {

  },

  data: () => ({
    drawer: false,
    items: [],
  }),
};
</script>
