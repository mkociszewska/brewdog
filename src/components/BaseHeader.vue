<template>
    <div class="header">
        <h2>{{ title }}</h2>
        <h4>{{ subtitle }}</h4>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class BaseHeader extends Vue {
      @Prop({ required: true }) title!: string
      @Prop({ required: true }) subtitle!: string
    }
</script>

<style lang="scss">
    @import "../assets/styles/styles";

    $circleSize: 3em;

    .header {
        position: relative;
        text-align: left;
        margin-bottom: 2em;
        margin-top: 1em;

        h2 {
            font-size: 2em;
            color: white;
            margin-left: 1em;
            margin-top: - 1em;
        }

        h4 {
            color: $grey;
            margin-left: 2em;
            margin-top: .5em;
        }

        &:before {
            content: '';
            width: $circleSize;
            height: $circleSize;
            border-radius: calc(#{ $circleSize } / 2 );
            background-color: $orange;
            top:0; left: 0;
            z-index: 0;
            display: block;
        }
    }
</style>
