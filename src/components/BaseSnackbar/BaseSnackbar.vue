<template>
  <v-snackbar
    v-model="snackbar"
    class="snackbar"
    :color="snackbarConfig.color? snackbarConfig.color: ''"
  >
    {{ snackbarConfig.message }}

    <template v-slot:action="{ attrs }">
      <CloseSvg
        v-bind="attrs"
        class="close-svg"
        @click="closeSnackbar()"
      />
    </template>
  </v-snackbar>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import CloseSvg from '@/assets/svg/close.svg'

    export default {
        name:'BaseSnackbar',
        components:{
            CloseSvg
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
.snackbar{
  direction: rtl;
}

.close-svg{
  margin-left: 0.5rem;
  path{
    stroke: #fff
  }
}
</style>