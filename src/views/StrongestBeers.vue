<template>
    <section class="strongest-beers">
        <BaseHeader title="i want to get wasted" subtitle="our strongest beers"/>
            <div v-for="beer in strongestBeers" :key="beer.id" class="strongest-beers__beer">
                    <p class="strongest-beers__beer__abv">{{ beer.abv }}%</p>
                    <div class="strongest-beers__beer__chart" :style="{ width : (beer.abv * 1.2) + '%'}">
                        {{ beer.name }}
                    </div>
            </div>
    </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Beer } from '@/api/models/beer';
  import BrewdogService from '@/api/brewdog';
  import BaseHeader from '@/components/BaseHeader.vue';
  @Component({
    components: {BaseHeader}
  })
  export default class StrongestBeers extends Vue {
    beers: Beer[] = []
    strongestBeers: Beer[] = []
    itemsNumber: number = 10

    mounted() {
      BrewdogService.fetchBeers().then(data => {
        this.beers = data
        this.sortBeersByABV()
      })
    }

    sortBeersByABV() {
      this.strongestBeers =
        this.beers.sort((a, b) =>
          (a.abv < b.abv) ? 1: -1
        ).slice(0, this.itemsNumber)
    }
  }
</script>

<style lang="scss">
    @import "../assets/styles/styles";

    @for $i from 1 through 11    {
        .strongest-beers__beer:nth-child( #{$i}) {
            opacity:  100% - ($i * 5);
        }
    }

    .strongest-beers__beer {
        display: flex;
        padding: 1em 0;

        .strongest-beers__beer__abv {
            width: 10%;
        }

        .strongest-beers__beer__chart {
            background-color: $yellow;
            color: black;
            display: flex;
            padding-left: 1em;
            border-radius: 0.25em;
            align-items: center;
            height: 2.5em;
        }
    }
</style>
