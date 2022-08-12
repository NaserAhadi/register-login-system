<template>
  <div class="password-validation"> 
    <span class="condition-item">
      {{ persianLanguageResource.atleastEightCharacter }}
      <CloseSvg
        v-if="password.length>0 && !hasPasswordEightCharacters"
        class="close-svg"
      />
      <DoneSvg
        v-else-if="password.length>0 && hasPasswordEightCharacters"
        class="done-svg"
      />
    </span>
    <span class="condition-item">
      {{ persianLanguageResource.atleastOneNumber }}

      <CloseSvg
        v-if="password.length>0 && !hasPasswordAtleastOneNumber"
        class="close-svg"
      />
      <DoneSvg
        v-else-if="password.length>0 && hasPasswordAtleastOneNumber"
        class="done-svg"
      />
    </span>
    <span class="condition-item">
      {{ persianLanguageResource.atleastOneBigCharacter }}
      <CloseSvg
        v-if="password.length>0 && !hasPasswordAtleastOneBigChar"
        class="close-svg"
      />
      <DoneSvg
        v-else-if="password.length>0 && hasPasswordAtleastOneBigChar"
        class="done-svg"
      />
    </span>
  </div>
</template>

<script>
    import persianLanguageResource from '@/lang/fa-IR.js'
    import DoneSvg from '@/assets/svg/done.svg'
    import CloseSvg from '@/assets/svg/close.svg'
    
    export default {
        name: 'PasswordValidations',
        components:{
            DoneSvg,
            CloseSvg
        },
        props:{
            password:{
                type: String,
                default: ''
            }
        },
        data(){
            return {
                persianLanguageResource,
                hasPasswordEightCharacters: false,
                hasPasswordAtleastOneNumber: false,
                hasPasswordAtleastOneBigChar: false
            }
        },
        computed:{
            checkPassTheConditions(){
                return this.hasPasswordEightCharacters && this.hasPasswordAtleastOneNumber && this.hasPasswordAtleastOneBigChar
            }
        },
       watch:{
          password(val){
            this.checkHasAtleastEightChar(val)
            this.checkHasAtleastOneNumber(val)
            this.checkHasAtleastOneUppercase(val)
          },
          checkPassTheConditions(val){
            this.$emit('check-pass-conditions', val)
          }
       },
        methods:{
          checkHasAtleastEightChar(val){
                if(val.length>=8){
                    this.hasPasswordEightCharacters = true
                } else {
                    this.hasPasswordEightCharacters = false
                }
          },
          checkHasAtleastOneNumber(val){
            const regexForAtleastOneNumber = /\d/;
            if(regexForAtleastOneNumber.test(val)){
              this.hasPasswordAtleastOneNumber = true
            } else{
              this.hasPasswordAtleastOneNumber = false
            }
          },
          checkHasAtleastOneUppercase(val){
            const regexForAtleastOneBigCharacter = /(?=.*[A-Z])/
            if(regexForAtleastOneBigCharacter.test(val)){
                this.hasPasswordAtleastOneBigChar = true
            } else{
                this.hasPasswordAtleastOneBigChar = false
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
.password-validation{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  flex-wrap: wrap;
  color: #636363;
  font-size: 13px;
  margin-top: -1.3rem;
  margin-bottom: 0.2rem;
  padding: 0 0.3rem;
}

.condition-item{
  display: flex;
  align-items: center;
}

.svg-wrapper{
  width: 1rem;
  height: 1rem;
}

.done-svg{
  path{
    stroke: green
  }
}

.close-svg{
  path{
    stroke: red
  }
}
</style>