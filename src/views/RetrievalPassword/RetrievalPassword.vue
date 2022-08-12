<template>
  <v-form
    class="retrieval-form"
    @submit.prevent="changePassword()"
  >
    <h3 class="title">
      {{ persianLanguageResource.RetrievalPassword }}
    </h3>
    <BaseTextfield
      v-model="phoneNumber"
      readonly
      :placeholder="persianLanguageResource.phoneNumberWithExample"
      :max-length-value="11"
    />
    <BaseTextfield
      v-model="password"
      :placeholder="persianLanguageResource.newPassword"
      :is-password-field="true"
    />
    <PasswordValidations
      :password="password"
      @check-pass-conditions="checkPasswordValidatioins($event)"
    />
    <BaseButton
      class="primary-button"
      type="submit"
    >
      {{ persianLanguageResource.submit }}
    </BaseButton>
    <BaseButton @click="cancelRetrievalPassword()">
      {{ persianLanguageResource.cancel }}
    </BaseButton>
    <BaseSnackbar :timeout="7000" />
    <OtpModal
      v-model="isOpenOtpModal"
      @submit="submitOtp($event)"
    />
  </v-form>
</template>

<script>
    import persianLanguageResource from '@/lang/fa-IR.js'
    import {getItemFromLocalStorage} from '@/util/localstorageFunctions.js'
    import retrievalService from '@/services/retrievalService.js'
    import { mapActions } from 'vuex'
    import PasswordValidations from '@/components/PasswordValidation/PasswordValidations'

    export default {
        name: 'RetrievalPassword',
        components:{
            PasswordValidations
        },
        data(){
            return {
                persianLanguageResource,
                password: '',
                isOpenOtpModal: false,
                isPasswordValid: false
            }
        },
        computed:{
          phoneNumber:{
            get(){
              return getItemFromLocalStorage('phoneNumber')
            },
          }
        },
        methods:{
          ...mapActions('global', ['triggerSnackbar']),
          cancelRetrievalPassword(){
            this.$router.push({name: 'Login'})
          },
          async changePassword(){
            if(this.isPasswordValid){
              try{
                  const retrievalInfo = {
                    mobile: getItemFromLocalStorage('phoneNumber'),
                    password: this.password,
                    scope: 'ForgotPass'
                  }
                  const {data:{message, status}} = await retrievalService.httpSendRetrievalInfo(retrievalInfo)
                  const snackbarConfig = {message,status,color:'46CAC0', toggle: true}
                  this.triggerSnackbar(snackbarConfig)
                  if(status===1){
                     this.openOtpModal()
                  }
              } catch(error){
                console.log(error);
              }
            } else {
              const snackbarConfig = {message:persianLanguageResource.enterProperPassword, toggle: true}
              this.triggerSnackbar(snackbarConfig)
            }
           
          },
          async submitOtp(otp){
            try{
              const retrievalInfo = {
                  mobile: getItemFromLocalStorage('phoneNumber'),
                  key: otp,
                  scope: 'ForgotPass'
                }
              const {data:{status}} = await retrievalService.httpVerifyChangingPassword(retrievalInfo)
              if(status===1){
                const snackbarConfig = {message:persianLanguageResource.successChangePassword, color: '#46CAC0', toggle: true}
                this.triggerSnackbar(snackbarConfig)
                this.closeOtpModal()
                this.navigateToRegisterPage()
              }
           } catch(error){
              const snackbarConfig = {message:error.response.data.error,status:error.response.data.status,color: '#FF3D00', toggle: true}
              this.triggerSnackbar(snackbarConfig)
            }
          },
          openOtpModal(){
            this.isOpenOtpModal = true
          },
          closeOtpModal(){
            this.isOpenOtpModal = false
          },
        navigateToRegisterPage(){
          this.$router.push({name: 'Register'})
        },
        checkPasswordValidatioins(val){
          this.isPasswordValid = val
        }
    }
  }
</script>

<style lang="scss" scoped>
.retrieval-form{
  padding: 1rem;
}

.title{
  margin: 1rem;
  color: #636363
}

.change-password-conditions{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  flex-wrap: wrap;
  color: #636363;
  font-size: 13px;
  margin-top: -1.3rem;
  margin-bottom: 0.2rem;
  padding: 0 0.3rem;
}

.condition-item{
  display: flex;
  align-items: center;
}

.svg-wrapper{
  width: 1rem;
  height: 1rem;
}

.done-svg{
  path{
    stroke: green
  }
}

.close-svg{
  path{
    stroke: red
  }
}
</style>