<template>
  <v-form @submit.prevent="submitPhoneNumber()">
    <v-text-field
      v-model="phoneNumber"
      :label="persianLanguageResource.phoneNumber"
      outlined
    />
    <v-btn type="submit">
      {{ persianLanguageResource.submit }}
    </v-btn>
    <span>{{ persianLanguageResource.haveAccount }}</span>
    <router-link :to="{name:'Login'}">
      {{ persianLanguageResource.doLogin }}
    </router-link>
  </v-form>
</template>

<script>
    import persianLanguageResource from '@/lang/fa-IR.js'
    import { mapActions } from 'vuex'
    export default {
        name: 'Register',
        data(){
            return{
                persianLanguageResource,
                phoneNumber:''
            }
        },
        methods:{
          ...mapActions('register', ['checkUserRegistering']),
            submitPhoneNumber(){
                const payload = {
                  mobile: this.phoneNumber
                }
                this.checkUserRegistering(payload)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>