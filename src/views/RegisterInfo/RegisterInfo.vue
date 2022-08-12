<template>
  <v-form
    class="register-info-form"
    @submit.prevent="submitUserInfo()"
  >
    <p class="title">
      {{ persianLanguageResource.setInformation }}
    </p>
    <BaseTextfield
      v-model="phoneNumber"
      readonly
    />

    <BaseTextfield
      v-model="subInfo.fname"
      :placeholder="persianLanguageResource.enterYourFirstName"
      :max-length-value="11"
      :hint="persianLanguageResource.enterYourFirstName"
    />
    
    <BaseTextfield
      v-model="subInfo.lname"
      :placeholder="persianLanguageResource.enterYourLastName"
      :max-length-value="11"
      :hint="persianLanguageResource.enterYourLastName"
    />

    <BaseTextfield
      v-model="subInfo.national_code"
      :placeholder="persianLanguageResource.enterNationalCode"
      :max-length-value="11"
      :hint="persianLanguageResource.enterNationalCode"
    />
    <BaseTextfield
      v-model="datetime"
      type="text"
      class="custom-input"
      placeholder="select date"
    />

    <VuePersianDatetimePicker
      v-model="datetime"
      custom-input=".custom-input"
    />

    <BaseTextfield
      v-model="subInfo.password"
      :placeholder="persianLanguageResource.newPassword"
      :is-password-field="true"
    />
    <PasswordValidations
      :password="subInfo.password"
      @check-pass-conditions="checkPasswordValidatioins($event)"
    />
    <BaseButton
      class="primary-button"
      type="submit"
    >
      {{ persianLanguageResource.submit }}
    </BaseButton>
    <BaseSnackbar :timeout="7000" />
  </v-form>
</template>

<script>
    import persianLanguageResource from '@/lang/fa-IR.js'
    import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
    import {getItemFromLocalStorage} from '@/util/localstorageFunctions.js'
    import PasswordValidations from '@/components/PasswordValidation/PasswordValidations'
    import registerService from '@/services/registerService.js'
    import {mapActions} from 'vuex'

    export default {
        name: 'RegisterInfo',
          components: {
             VuePersianDatetimePicker,
             PasswordValidations
        },
        data(){
            return{
                persianLanguageResource,
                isOpenOtpModal: false,
                subInfo:{
                    fname: '',
                    lname: '',
                    national_code: '',
                    password: '',
                },
                isPasswordValid: false,
                datetime: ''
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
           datetime(val){
            console.log(val.split('/'));
           } 
        },
        methods:{
            ...mapActions('global', ['triggerSnackbar']),
            async submitUserInfo(){
                try{
                    const splitedDateTime = this.datetime.split('/')
                    const registerInformation = {
                        ...this.subInfo,
                        mobile: this.phoneNumber,
                        scope: "Register",
                        year: splitedDateTime[0],
                        month: splitedDateTime[1],
                        day: splitedDateTime[2]
                    }
                    await registerService.httpRegisterInformation(registerInformation)
                    const snackbarConfig = {message:persianLanguageResource.successRegistering,color: '#46CAC0', toggle: true}
                    this.triggerSnackbar(snackbarConfig)
                }catch(error){
                    const snackbarConfig = {message:error.response.data.error,color: '#FF3D00', toggle: true}
                    this.triggerSnackbar(snackbarConfig)
                }
            },
            checkPasswordValidatioins(val){
                this.isPasswordValid = val
            }
        }
    }
</script>

<style lang="scss" scoped>
.register-info-form{
  padding: 1rem;
}

.title{
  text-align: center;
  margin: 1rem 0;
}
</style>