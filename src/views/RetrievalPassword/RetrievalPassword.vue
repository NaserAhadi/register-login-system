<template>
    <v-container>
        {{persianLanguageResource.RetrievalPassword}}
        <v-row class="d-flex flex-column align-center">
            <v-col cols="6">
                <v-text-field
                    :label="persianLanguageResource.phoneNumber"
                    outlined
                ></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-text-field
                    :label="persianLanguageResource.newPassword"
                    outlined
                ></v-text-field>
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
    export default {
        name: 'RetrievalPassword',
        data(){
            return {
                persianLanguageResource
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>