<template>
    <v-container>
        <v-row class="d-flex flex-column align-center">
            <v-col cols="6">
                <v-text-field
                    :label="persianLanguageResource.phoneNumber"
                    outlined
                ></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-text-field
                    :label="persianLanguageResource.password"
                    outlined
                ></v-text-field>
                <router-link :to="{name:'RetrievalPassword'}">
                    {{persianLanguageResource.forgotPassword}}
                </router-link>
            </v-col>
            <v-col cols="6">
                <v-btn>
                    {{persianLanguageResource.login}}
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import persianLanguageResource from '@/lang/fa-IR.js'
    // import RetrievalPassword from '@/views/RetrievalPassword/RetrievalPassword'
    export default {
        name: 'Login',
        data(){
            return {
                persianLanguageResource
            }
        },
        // components:{
        //     RetrievalPassword
        // },
        methods:{
            navigateToRetrievalPassword(){

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>