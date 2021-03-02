<template>
    <div class="nav" :class="{ darkMode: 'nav--dark'}">
        <router-link to="/catalogue">Catalogue</router-link>
        <router-link to="/favourites">Favourites</router-link>
<!--        <router-link to="/strongest">Strongest Beers</router-link>-->
<!--        <router-link to="/mildest">Mildest Beers</router-link>-->
<!--        <router-link to="/compromise">Compromise Beers</router-link>-->
        <router-link to="/deciding">Hard time deciding?</router-link>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class Nav extends Vue {}
</script>

<style lang="scss">
    @import "../assets/styles/styles";

    .nav {
        background-color: white;
        width: 100vw;
        position: fixed;
        top: 0;
        z-index: 100;
        text-align: left;
        padding: calc( (#{$nav-height}  - 1em) / 2 );

        a {
            margin-right: 2em;
            color: $grey;
            text-decoration: none;

            &:hover {
                color: $blue;
            }
        }

        .router-link-exact-active {
            color: $orange;
        }

        &.nav--dark {
            background-color: #242324;
        }
    }
</style>
