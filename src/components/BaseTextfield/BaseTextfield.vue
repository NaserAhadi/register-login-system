<template>
  <v-text-field 
    v-model="textfieldModel"
    :label="label"
    :placeholder="placeholder"
    filled
    :maxlength="maxLengthValue"
    v-bind="$attrs"
  />
</template>

<script>
    export default {
        name: 'BaseTextfield',
        props:{
            label:{
                type: String,
                default: ''
            },
            placeholder:{
                type: String,
                default: ''
            },
            maxLengthValue: {
			type: Number,
			default: 100,
        },
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
                border: 1px solid #B8B8B8;
                background-color: #fff !important;
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
        
            .v-messages__message{
                color: #636363 !important;
                margin: 0.3rem !important;
            }
        
            .v-text-field__details{
                height: 1.5rem !important;
            }
      }
</style>