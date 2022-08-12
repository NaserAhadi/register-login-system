<template>
  <div data-app>
    <v-dialog v-model="dialog">
      <v-text-field 
        v-model.number="otp"
        :label="persianLanguageResource.otp"
        outlined
      />
      <v-btn @click="closeModal()"> 
        close
      </v-btn>
    </v-dialog>
  </div>
</template>

<script>
    import persianLanguageResource from '@/lang/fa-IR.js'

    export default {
        name: 'OtpModal',
        props:{
          value:{
            type: Boolean,
            default: false
          }
        },
        data(){
          return{
            otp: '',
            persianLanguageResource
          }
        },
        computed:{
          dialog:{
            get(){
              return this.value
            },
            set(value){
              this.$emit('input', value)
            }
          }
        },
        methods:{
          closeModal(){
            this.$emit('input', false)
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>