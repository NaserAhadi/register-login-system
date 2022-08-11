<template>
    <v-container>
        <v-row class="d-flex flex-column align-center">
            <v-col cols="6">
                <v-text-field
                    label="phone"
                    outlined
                ></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-text-field
                    label="pass"
                    outlined
                ></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-btn>
                    ورود
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: 'Login',
    }
</script>

<style lang="scss" scoped>

</style>