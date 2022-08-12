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
    <div class="change-password-conditions"> 
      <span class="condition-item">
        {{ persianLanguageResource.atleastEightCharacter }}
        <CloseSvg
          v-if="password.length>0 && !hasPasswordEightCharacters"
          class="close-svg"
        />
        <DoneSvg
          v-else-if="password.length>0 && hasPasswordEightCharacters"
          class="done-svg"
        />
      </span>
      <span class="condition-item">
        {{ persianLanguageResource.atleastOneNumber }}

        <CloseSvg
          v-if="password.length>0 && !hasPasswordAtleastOneNumber"
          class="close-svg"
        />
        <DoneSvg
          v-else-if="password.length>0 && hasPasswordAtleastOneNumber"
          class="done-svg"
        />
      </span>
      <span class="condition-item">
        {{ persianLanguageResource.atleastOneBigCharacter }}
        <CloseSvg
          v-if="password.length>0 && !hasPasswordAtleastOneBigChar"
          class="close-svg"
        />
        <DoneSvg
          v-else-if="password.length>0 && hasPasswordAtleastOneBigChar"
          class="done-svg"
        />
      </span>
    </div>
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
    import DoneSvg from '@/assets/svg/done.svg'
    import CloseSvg from '@/assets/svg/close.svg'

    export default {
        name: 'RetrievalPassword',
        components:{
            DoneSvg,
            CloseSvg
        },
        data(){
            return {
                persianLanguageResource,
                password: '',
                isOpenOtpModal: false,
                hasPasswordEightCharacters: false,
                hasPasswordAtleastOneNumber: false,
                hasPasswordAtleastOneBigChar: false
            }
        },
        computed:{
          phoneNumber:{
            get(){
              return getItemFromLocalStorage('phoneNumber')
            },
          }
        },
       watch:{
          password(val){
            this.checkHasAtleastEightChar(val)
            this.checkHasAtleastOneNumber(val)
            this.checkHasAtleastOneUppercase(val)
          }
       },
        methods:{
          ...mapActions('global', ['triggerSnackbar']),

          cancelRetrievalPassword(){
            this.$router.push({name: 'Login'})
          },
          async changePassword(){
            if(this.hasPasswordEightCharacters && this.hasPasswordAtleastOneNumber && this.hasPasswordAtleastOneBigChar){
              try{
                  const retrievalInfo = {
                    mobile: getItemFromLocalStorage('phoneNumber'),
                    password: this.password,
                    scope: 'ForgotPass'
                  }
                  const {data:{message, status}} = await retrievalService.httpSendRetrievalInfo(retrievalInfo)
                  const snackbarConfig = {message,status, toggle: true}
                  this.triggerSnackbar(snackbarConfig)
                  if(status===1){
                     this.isOpenOtpModal = true
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
                const snackbarConfig = {message:persianLanguageResource.successChangePassword, toggle: true}
                this.triggerSnackbar(snackbarConfig)
                this.closeOtpModal()
                this.navigateToRegisterPage()
              }
           } catch(error){
              const snackbarConfig = {message:error.response.data.error,status:error.response.data.status, toggle: true}
              this.triggerSnackbar(snackbarConfig)
            }
          },
          closeOtpModal(){
            this.isOpenOtpModal = false
          },
          checkHasAtleastEightChar(val){
            if(val.length>=8){
              this.hasPasswordEightCharacters = true
            } else {
              this.hasPasswordEightCharacters = false
            }
          },
          checkHasAtleastOneNumber(val){
            const regexForAtleastOneNumber = /\d/;
            if(regexForAtleastOneNumber.test(val)){
              this.hasPasswordAtleastOneNumber = true
            } else{
              this.hasPasswordAtleastOneNumber = false
            }
          },
          checkHasAtleastOneUppercase(val){
           const regexForAtleastOneBigCharacter = /(?=.*[A-Z])/
              if(regexForAtleastOneBigCharacter.test(val)){
                this.hasPasswordAtleastOneBigChar = true
              } else{
                this.hasPasswordAtleastOneBigChar = false
              }
        },
        navigateToRegisterPage(){
          this.$router.push({name: 'Register'})
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