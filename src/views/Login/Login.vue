<template>
  <v-form
    class="login-form"
    @submit.prevent="submitUserinfo()"
  >
    <p class="title">
      {{ persianLanguageResource.enterYourPassword }}
    </p>
    <BaseTextfield
      v-model="password"
      :hint="persianLanguageResource.enterYourPassword"
      :is-password-field="true"
    />
    <router-link
      :to="{name:'RetrievalPassword'}"
      tag="span"
      class="link"
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
                  const snackbarConfig = { message: error.response.data.error, color: '#FF3D00', toggle: true}
                  this.triggerSnackbar(snackbarConfig)
              }
            },
        }
    }
</script>

<style lang="scss" scoped>
.login-form{
  padding: 1rem;
}

.title{
  margin: 1rem 0;
  color: #636363
}

.link{
  cursor: pointer;
}
</style>