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
    <BaseSnackbar :timeout="7000" />
    <OtpModal
      v-model="isOpenOtpModal"
      @submit="submitOtp($event)"
    />
  </v-form>
</template>

<script>
    import persianLanguageResource from '@/lang/fa-IR.js'
    import { mapActions, mapState } from 'vuex'
    export default {
        name: 'Register',
        data(){
            return{
                persianLanguageResource,
                phoneNumber:'',
                isOpenOtpModal: false
            }
        },
        computed:{
          ...mapState('global', ['snackbarConfig'])
        },
        watch:{
          snackbarConfig(val){
            if(val.message==='SMS Send'){
              this.isOpenOtpModal = true
            }
          }
        },
        methods:{
          ...mapActions('register', ['checkUserRegistering', 'verifyOtp']),
            submitPhoneNumber(){
                const payload = {
                  mobile: this.phoneNumber
                }
                this.checkUserRegistering(payload)
            },
            submitOtp(otp){
              const payload={
                Key:otp,
                Mobile: this.phoneNumber,
                Scope: 'Register'
              }
              this.verifyOtp(payload)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>