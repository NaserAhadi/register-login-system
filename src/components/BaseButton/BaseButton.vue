<template>
  <v-btn
    v-bind="$attrs"
    class="button"
    elevation="0"
    :class="[className]"
    :ripple="false"
    v-on="$listeners"
  >
    <slot />
  </v-btn>
</template>

<script>
    export default {
        name: 'BaseButton',
        props:{
            className:{
                type: String,
                default: 'secondary-button'
            }
        },
    }
</script>

<style lang="scss" scoped>
.button{
    width: 120px;
    padding: 0.5rem !important;
    margin: 0.5rem;
}

.secondary-button{
    color: #636363;
    background: #fff !important;
    border: thin solid #00C5BA !important;
}

.primary-button{
    color: #fff;
    background: #00C5BA !important;
}
</style>