<template>
  <v-app>
    <v-main>
      <Login /> 
    </v-main>
  </v-app>
</template>

<script>
import Login from '@/components/Login/Login';

export default {
  name: 'App',

  components: {
    Login
  },

  data: () => ({
    //
  }),
};
</script>
