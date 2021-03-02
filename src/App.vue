<template>
    <div id="app">
        <Nav :class="{ 'nav--dark': darkMode}" />
        <div class="container" :class="{ 'container--dark': darkMode, 'container--small': containerSmall}">
            <router-view/>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator'
    import { Route } from 'vue-router'
    import Nav from '@/components/Nav.vue'

    @Component({
        components: { Nav },
    })
    export default class App extends Vue {
      darkMode: boolean = true
      containerSmall: boolean = false

      @Watch('$route')
      onRouteChange(to: Route) {
        this.darkMode = to.meta.darkMode ?? true
        this.containerSmall = to.meta.containerSmall ?? true
      }
    }
</script>

<style lang="scss">
    @import "assets/styles/styles";

    @font-face {
        font-family: "Veneer";
        src: local("Veneer"),
        url(./assets/fonts/Veneer.ttf) format("truetype");
    }

    @font-face {
        font-family: "Sofia Pro";
        src: local("SofiaProBold"),
        url(./assets/fonts/SofiaProBold.ttf) format("truetype");
    }

    #app {
        font-family: Veneer;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        font-size: 16px;
        font-weight: normal;
    }

    body {
        margin: 0;
    }

    .beer-name {
        font-size: 1.5em;
        text-align: left;
        margin-top: 1em;
    }

    .description {
        text-align: left;
        color: $grey;
        font-family: $secondary-font;
        margin-top: 1em;
    }

    button {
        background-color: transparent;
        border: none;
    }

    .container {
        margin-top: $nav-height;
        min-height: 100vh;
        background-color: #f2f2f2;

        &.container--dark {
            background-color: #201f1f;
            color: white;
        }

        &.container--small {
            padding: 1em 10%;
        }
    }
</style>
