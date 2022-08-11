<template>
  <v-snackbar
    v-model="snackbar"
  >
    {{ snackbarConfig.message }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="pink"
        text
        v-bind="attrs"
        @click="closeSnackbar()"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
        name:'BaseSnackbar',
        props:{
            modelValue:{
                type: String,
                default: ''
            } 
        },
        computed:{
            ...mapState('global', ['snackbarConfig']),
            snackbar:{
                get(){
                    return this.snackbarConfig.toggle
                },
                set(value){
                    const snackbarConfig= {message:'', toggle: value}
                    this.triggerSnackbar(snackbarConfig)
                }
            },
        },
        methods:{
            ...mapActions('global', ['triggerSnackbar']),
            closeSnackbar(){
                const snackbarConfig= {message:'', toggle: false}
                this.triggerSnackbar(snackbarConfig)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>