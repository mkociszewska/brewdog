<template>
    <section class="compromiseBeers">
        <BaseHeader title="i need balance" subtitle="help me find strongest beers that are also not too bitter"/>

        <div class="canvas">
            <span class="canvas__scale--high-ibu">high ibu</span>
            <span class="canvas__scale--low-ibu">low ibu</span>

            <span class="canvas__scale--low-abv">0% ALC</span>
            <span class="canvas__scale--high-abv">16% ALC</span>

            <div v-for="beer in beers"
                 class="beer-dot"
                 :style="{ left : (beer.abv * 100 / 16) + '%', bottom : beer.ibu + '%' }">
                <div class="tooltip">
                    <p>{{ beer.name }}</p>
                    <p>{{ beer.ibu }} IBU</p>
                    <p>{{ beer.abv }}% ALC </p>
                </div>
            </div>
        </div>

    </section>
</template>

<script lang="ts">
  import { Prop, Component, Vue } from 'vue-property-decorator'
  import { Beer } from '@/api/models/beer'
  import BrewdogService from '@/api/brewdog'
  import BaseHeader from '@/components/BaseHeader.vue'

  @Component({
    components: {BaseHeader}
  })
  export default class CompromiseBeers extends Vue {
    beers: Beer[] = []
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
      for( let i = 0; i < this.beers.length; i++){
        if ( this.beers[i].ibu == null) {
          this.beers.splice(i, 1);
        }
      }
    }

    sortBeersByABV() {
      this.mildestBeers =
        this.beers.sort((a, b) =>
          (a.ibu > b.ibu) ? 1: -1
        ).slice(0, this.itemsNumber)
    }
  }
</script>

<style lang="scss">
    .canvas {
        width: 100%;
        height: 60vh;
        position: relative;

        /* horizontal line */
        &:before {
            content: '';
            position: absolute;
            width: 2px;
            height:100%;
            display: block;
            left: 50%;
            background-color: white;
        }

        /* vertical line */
        &:after {
            content: '';
            position: absolute;
            height:2px;
            display: block;
            width: 100%;
            top: 30vh;
            background-color: white;
        }

        .beer-dot {
            width: 10px;
            height: 10px;
            background-color: white;
            display: block;
            position: absolute;
            border-radius: 5px;
        }

        span[class^=canvas__scale] {
           position: absolute;
       }

        .canvas__scale--high-ibu {
            left: 0;
            width: 100%;
            top: -2em
        }

        .canvas__scale--low-ibu {
            left: 0;
            width: 100%;
            bottom: -2em;
        }

        .canvas__scale--low-abv {
            left: 0;
            bottom: 50%;
        }

        .canvas__scale--high-abv {
            right: 0;
            bottom: 50%;
        }

        .tooltip {
            display: none;
            background-color: orange;
            padding: 0.5em;
            width: 10vw;
            border-radius: 0.5em;
            margin-left: 1em;
            text-align: left;
            z-index: 100;
            position: absolute;
            top: -1em;
            transition: 30ms linear;
            color: black;
        }

        .beer-dot:hover {
            cursor: pointer;
            background-color: orange;

            .tooltip {
                display: block;
                transition: 60ms ease-in-out;
            }
        }
    }
</style>
