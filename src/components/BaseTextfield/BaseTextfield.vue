<template>
  <v-text-field 
    v-model="textfieldModel"
    :label="label"
    filled
  />
</template>

<script>
    export default {
        name: 'BaseTextfield',
        props:{
            label:{
                type: String,
                default: ''
            }
        },
        computed:{
            textfieldModel:{
                get(){
                    return this.value
                },
                set(value){
                    this.$emit('input', value)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
  :deep .v-input__control{
    .v-input__slot{
      border: 1px solid #B8B8B8 !important;
      background-color: transparent !important;
      border-radius: 0.5rem !important;
      max-height: 56px;
      margin: 0 !important;

      &::before,&::after{
        border: 0px !important;
      }

      .v-label{
        color: #636363 !important;
      }
    }
  }
</style>