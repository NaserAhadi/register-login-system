<template>
  <div data-app>
    <v-dialog v-model="dialog">
      <BaseTextfield
        v-model.number="otp"
        :label="persianLanguageResource.otp"
      />
      <section class="buttons-wrapper">
        <BaseButton
          class-name="primary-button"
          @click="submitOtp()"
        > 
          {{ persianLanguageResource.submit }}
        </BaseButton>
        <BaseButton @click="closeModal()"> 
          {{ persianLanguageResource.cancel }}
        </BaseButton>
      </section>  
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
              console.log('this.value', this.value);
              return this.value
            },
            set(value){
              this.$emit('input', value)
            }
          }
        },
        methods:{
          closeModal(){
            console.log('this.otp',this.otp);
            this.$emit('input', false)
          },
          submitOtp(){
            console.log('submit this.otp',this.otp);
            this.$emit('input', false)
          }
        }
    }
</script>

<style lang="scss" scoped>
:deep .v-dialog{
  width: 560px;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
}

.buttons-wrapper{
  display: flex;
  justify-content: flex-start;
}
</style>