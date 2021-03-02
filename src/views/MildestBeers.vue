<template>
    <section class="mildestBeers">
        <BaseHeader title="i want something smooth" subtitle="beers with lowest IBU"/>
        <div class="mildestBeers__wrapper">
            <div v-for="beer in mildestBeers">
                <div  class="mildestBeers__beer">
                <div class="mildestBeers__beer__chart">
                    <p>{{ beer.ibu }} IBU</p>
                    <div class="ibu_level" :style="{ height : beer.ibu + '%'}"></div>
                </div>
                </div>
                <p class="mildestBeers__beer__name">{{ beer.name }}</p>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Beer } from '@/api/models/beer'
  import BrewdogService from '@/api/brewdog'
  import BaseHeader from '@/components/BaseHeader.vue'

  @Component({
    components: {BaseHeader},
  })
  export default class LowestIBUBeers extends Vue {
    beers: Beer[] = []
    search: string = ''
    mildestBeers: Beer[] = []
    itemsNumber: number = 5

    mounted() {
      BrewdogService.fetchBeers().then(data => {
        this.beers = data
        this.checkIfHasIBU()
        this.sortBeersByABV()
      })
    }

    checkIfHasIBU() {
      for (let i = 0; i < this.beers.length; i++) {
        if ( this.beers[i].ibu == null) {
          this.beers.splice(i, 1)
        }
      }
    }

    sortBeersByABV() {
      this.mildestBeers =
        this.beers.sort((a, b) =>
          (a.ibu > b.ibu) ? 1 : -1,
        ).slice(0, this.itemsNumber)
    }
  }
</script>

<style lang="scss">
    @import "../assets/styles/styles";

    .mildestBeers__beer {
        display: flex;
        flex-direction: column;
        background-color: white;
        padding: 0.5em;
        clip-path: polygon(0 0, 100% 0, 91% 100%, 9% 100%);
    }

    .mildestBeers__wrapper {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-column-gap: 24px;
        grid-row-gap: 30px;
    }

    .mildestBeers__beer__chart {
        display: flex;
        flex-direction: column;
        background-color: $blue;
        width: 100%;
        height: 250px;
        clip-path: polygon(0 0, 100% 0, 91% 100%, 9% 100%);
        justify-content: flex-end;
    }

    .ibu_level {
        width: 100%;
        background-color: $yellow;
        height: 30px;
        border-top: 0.5em solid white;
        clip-path: polygon(0 0, 100% 0, 91% 100%, 9% 100%);
    }

    .mildestBeers__beer__name {
        margin-top: 3em
    }
</style>
