<template>
  <v-form>
    <p class="title">
      {{ persianLanguageResource.setInformation }}
    </p>
    <BaseTextfield
      v-model="phoneNumber"
    />

    <BaseTextfield
      v-model="firstName"
      :placeholder="persianLanguageResource.enterYourFirstName"
      :max-length-value="11"
      :hint="persianLanguageResource.enterYourFirstName"
    />
    
    <BaseTextfield
      v-model="lastName"
      :placeholder="persianLanguageResource.enterYourLastName"
      :max-length-value="11"
      :hint="persianLanguageResource.enterYourLastName"
    />

    <BaseTextfield
      v-model="nationalCode"
      :placeholder="persianLanguageResource.enterNationalCode"
      :max-length-value="11"
      :hint="persianLanguageResource.enterNationalCode"
    />
  </v-form>
</template>

<script>
    import persianLanguageResource from '@/lang/fa-IR.js'

    export default {
        name: 'RegisterInfo',
        data(){
            return{
                persianLanguageResource,
                phoneNumber:'',
                isOpenOtpModal: false,
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>