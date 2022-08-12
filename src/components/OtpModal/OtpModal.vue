<template>
  <div data-app>
    <v-dialog v-model="dialog">
      <p class="otp-modal-title">
        {{ persianLanguageResource.enterOtp }}
      </p>
      <v-otp-input
        v-model="otp"
        length="5"
        type="number"
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
            this.$emit('input', false)
          },
          submitOtp(){
            this.$emit('submit', this.otp)
            // this.closeModal()
          }
        }
    }
</script>

<style lang="scss" scoped>
:deep .v-dialog{
  width: 430px;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
}

.buttons-wrapper{
  display: flex;
  justify-content: flex-start;
}

.otp-modal-title{
  margin: 0.5rem 0;
  text-align: right;
  padding: 0 0.6rem;
}
</style>