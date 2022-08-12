<template>
  <v-form
    class="register-form"
    @submit.prevent="submitPhoneNumber()"
  >
    <p class="title">
      {{ persianLanguageResource.enterYourPhoneNumber }}
    </p>
    <BaseTextfield
      v-model="phoneNumber"
      placeholder="09XXXXXXXXX"
      :max-length-value="11"
      hint="شماره موبایل 11 رقمی وارد کنید"
    />

    <BaseButton
      type="submit"
      class="primary-button"
    >
      {{ persianLanguageResource.submit }}
    </BaseButton><br>

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
    import registerService from '@/services/registerService.js'
    import {setItemsOnLocalStorage, getItemFromLocalStorage} from '@/util/localstorageFunctions.js'

    export default {
        name: 'Register',
        data(){
            return{
                persianLanguageResource,
                phoneNumber:'',
                isOpenOtpModal: false,
            }
        },
        computed:{
          ...mapState('global', ['snackbarConfig'])
        },
        mounted(){
          if(getItemFromLocalStorage('phoneNumber')){
            this.phoneNumber = getItemFromLocalStorage('phoneNumber')
          }
        },
        methods:{
          ...mapActions('register', ['checkUserRegistering', 'verifyOtp', 'setUserPhoneNumber']),
          ...mapActions('global', ['triggerSnackbar']),
            async submitPhoneNumber(){
                const reg = new RegExp('^[0-9]+$');
                if(reg.test(this.phoneNumber)){
                  const payload = {
                    mobile: this.phoneNumber
                  }
                  try{
                    const { data:{ message, status } } = await registerService.httpCheckRegistering(payload)
                    console.log(message);
                    localStorage.clear()
                    if(status===0){
                      this.$router.push({name:'Login'})
                      setItemsOnLocalStorage('phoneNumber', this.phoneNumber)
                    } else if(status===1){
                      const snackbarConfig = {message:persianLanguageResource.sendMessage, toggle: true}
                      this.triggerSnackbar(snackbarConfig)
                      setItemsOnLocalStorage('phoneNumber', this.phoneNumber)
                      this.openOtpModal()
                    } else{
                      const snackbarConfig = {message:persianLanguageResource.notValidNumber, toggle: true}
                      this.triggerSnackbar(snackbarConfig)
                    }
                  } catch(error){
                    console.log(error);
                  }
                } else {
                  const snackbarConfig = {message: persianLanguageResource.justUseNumber, toggle: true}
                  this.triggerSnackbar(snackbarConfig)
                }
            },
            async submitOtp(otp){
              try{
                const otpPayload={
                  key:otp,
                  mobile: this.phoneNumber,
                  scope: 'Register'
                }
                await registerService.httpVerifyOtp(otpPayload)
                this.navigateToSettingInformation()
              } catch(error){
                  const snackbarConfig = { message: error.response.data.error, toggle: true}
                  this.triggerSnackbar(snackbarConfig)
              }
            
            },
            openOtpModal(){
              this.isOpenOtpModal = true
            },
            closeOtpModal(){
              this.isOpenOtpModal = false
            },
            navigateToSettingInformation(){
              this.$router.push({name: 'RegisterInfo'})
            }
        }
    }
</script>

<style lang="scss" scoped>
.register-form{
  padding: 1rem;
}

.title{
  text-align: center;
  margin: 1rem 0;
}
</style>