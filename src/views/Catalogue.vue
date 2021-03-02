<template>
    <section class="catalogue">
        <div class="input-search__wrapper">
            <i class="fas fa-search"></i>
            <input type="text" v-model="search" placeholder="Search in beers" @input="searchInBeers" class="input-search"/>
        </div>

        <div class="catalogue__wrapper">
            {{ this.favouriteBeers }}

            <div v-for="beer in filteredBeers" class="catalogue__beer">
                <div class="catalogue__beer__button">
                    <button v-if="beer.favourite" @click="removeFromFavorites(beer.id)">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button v-else @click="addToFavorites(beer.id)">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
                <img :src="beer.image_url" class="beer-image" />
                <p class="beer-name"> {{ beer.name }}</p>
                <p class="description"> {{ beer.tagline}}</p>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Beer } from '@/api/models/beer';
  import BrewdogService from '@/api/brewdog';
  import store from '@/store'

  @Component
  export default class Catalogue extends Vue {
    beers: Beer[] = []
    search: string = ''
    filteredBeers: Beer[] = []
    favouriteBeers: number[] = []

    mounted() {
      BrewdogService.fetchBeers().then(data => {
        this.beers = data
        this.getFavourites()
        this.mergeFavourites()
        this.filteredBeers = data
      })
    }

    async getFavourites() {
      this.favouriteBeers = store.getters.favouriteBeers
    }

    async mergeFavourites() {
      this.beers = this.beers.map(beer => {
        beer.favourite = (this.favouriteBeers.includes(beer.id))
        return beer
      })
    }

    async searchInBeers() {
      if(this.search === '' || this.search == null || !this.search) {
        this.filteredBeers = this.beers
      }
      else {
        this.filteredBeers = this.beers.filter((beer: Beer) => {
          return beer.name.toLowerCase().includes(this.search.toLowerCase())
            || beer.tagline.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    }

    addToFavorites(beerId: number) {
      store.dispatch('addFavourites', beerId);
      this.getFavourites();
      this.mergeFavourites()
    }

    removeFromFavorites(beerId: number) {
      store.dispatch('removeFavourites', beerId)
      this.getFavourites()
      this.mergeFavourites()
    }
  }
</script>

<style lang="scss">
    @import "../assets/styles/styles";

    .catalogue__wrapper {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-column-gap: 17px;
        grid-row-gap: 30px;
    }

    .beer-image {
        height: 15em;
    }

    .catalogue__beer__button {
        position: absolute;
        right: 0;
    }

    .catalogue__beer {
        position: relative;
    }

    .input-search__wrapper {
        display: flex;
        justify-content: flex-end;
        padding: 2em 0;
    }

    .input-search {
        background-color: transparent;
        border: none;
        font-family: $secondary-font;
        color: $grey;
        border-bottom: 2px solid $grey;
    }
</style>

