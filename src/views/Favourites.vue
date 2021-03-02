<template>
    <section class="favourites">
        <div v-for="beer in favouriteBeers" :key="beer.id" class="favourites__beer">
            <button @click="removeFromFavorites(beer.id)"><i class="fas fa-trash"></i></button>
            <img :src="beer.image_url" class="beer-image" />
            <p class="beer-name"> {{ beer.name }}</p>
            <p class="description"> {{ beer.tagline}}</p>
        </div>
    </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Beer } from '@/api/models/beer'
  import BrewdogService from '@/api/brewdog'
  import store from '@/store'


  @Component
  export default class Favourites extends Vue {
    beers: Beer[] = []
    favouriteBeers: Beer[] = []
    favoritesIds: number[] = []

    mounted() {
      BrewdogService.fetchBeers().then(data => {
        this.beers = data
        this.getFavs()
        this.mergeFavourites()
        this.filterBeers()
      })
    }

    async getFavs() {
      this.favoritesIds = store.getters.favouriteBeers
    }

    // TODO: move to service
    mergeFavourites() {
      this.beers = this.beers.map(beer => {
        beer.favourite = (this.favoritesIds.includes(beer.id))
        return beer
      })
    }

    async filterBeers() {
      this.favouriteBeers = this.beers.filter(beer => beer.favourite)
    }

    removeFromFavorites(beerId: number) {
      store.dispatch('removeFavourites', beerId)
      this.getFavs()
      this.mergeFavourites()
      this.filterBeers()
    }
  }
</script>

<style lang="scss">
    .favourites {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 17px;
        grid-row-gap: 30px;
        margin-top: 3em;

        button {
            position: absolute;
            right: 0;
            color: white;

            &:hover {
                cursor: pointer;
            }
        }
    }

    .beer-image {
        height: 20em;
    }

    .favourites__beer {
        position: relative;
    }
</style>
