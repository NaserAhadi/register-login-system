<template>
  <v-form @submit.prevent="submitUserinfo()">
    <BaseTextfield
      v-model="password"
      hint="رمز عبور خود را وارد کنید"
      :is-password-field="true"
    />
    <router-link
      :to="{name:'RetrievalPassword'}"
      tag="span"
    >
      {{ persianLanguageResource.RetrievalPassword }}
    </router-link>
    <BaseButton
      class="primary-button"
      type="submit"
    >
      {{ persianLanguageResource.login }}
    </BaseButton>
    <BaseSnackbar :timeout="7000" />
  </v-form>
</template>

<script>
    import persianLanguageResource from '@/lang/fa-IR.js'
    // import RetrievalPassword from '@/views/RetrievalPassword/RetrievalPassword'
    import loginService from '@/services/loginService.js'
    import {mapState,mapActions} from 'vuex'
    import {setItemsOnLocalStorage} from '@/util/localstorageFunctions.js'
    export default {
        name: 'Login',
        data(){
            return {
                persianLanguageResource,
                password:'',
            }
        },
        // components:{
        //     RetrievalPassword
        // },
        computed:{
          ...mapState('register', ['userPhoneNumber'])
        },
        methods:{
          ...mapActions('global', ['triggerSnackbar']),
            navigateToRetrievalPassword(){

            },
            async submitUserinfo(){
              try{
                 const userInfo = {
                    mobile: localStorage.getItem('phoneNumber'),
                    password: this.password
                  }
                  const {data} = await loginService.httpLogin(userInfo)
                  setItemsOnLocalStorage('access_token', data.access_token)
                  setItemsOnLocalStorage('refresh_token', data.refresh_token)
                  setItemsOnLocalStorage('token_type', data.token_type)
                  setItemsOnLocalStorage('exporation', data.expires_in)
              } catch(error){
                  const snackbarConfig = { message: error.response.data.error, toggle: true}
                  this.triggerSnackbar(snackbarConfig)
              }
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>