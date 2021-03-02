<template>
    <section class="hard-time-deciding">
        <div>
            <router-link to="/strongest">
                <div class="hard-time-deciding__icon">
                    <IconFire size="200"/>
                </div>
                <h5>I want to get wasted</h5>
                <p>Beers with the highest alcohol percentage</p>
            </router-link>
        </div>
        <div>
            <router-link to="/mildest">
                <div class="hard-time-deciding__icon">
                    <IconTongue size="200"/>
                </div>
                <h5>I want something smooth</h5>
                <p>Beers with the lowest bittering unit</p>
            </router-link>
        </div>
        <div>
            <router-link to="/compromise">
                <div class="hard-time-deciding__icon">
                    <IconBalance size="200"/>
                </div>
                <h5>I need the balance</h5>
                <p>I would like to find a perfect compromise between high alcohol volume and low bittering unit</p>
            </router-link>
        </div>
    </section>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import { Beer } from '@/api/models/beer'
  import BrewdogService from '@/api/brewdog'
  import BaseHeader from '@/components/BaseHeader.vue'
  import IconFire from '@/components/Icons/IconFire.vue';
  import IconBalance from '@/components/Icons/IconBalance.vue';
  import IconTongue from '@/components/Icons/IconTongue.vue';

  @Component({
    components: {IconTongue, IconBalance, IconFire, BaseHeader}
  })
  export default class HardTimeDeciding extends Vue {

  }
</script>


<style lang="scss">
    @import "../assets/styles/styles.scss";

    .hard-time-deciding {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 17px;
        grid-row-gap: 30px;
        margin-top: 3em;

        .hard-time-deciding__icon {
            position: relative;
            &:before {
                content: '';
                display: block;
                background-color: $orange;
                border-radius: 50%;
                width: 10em;
                height: 10em;
                position: absolute;
                z-index: 0;
                top: 3em;
                left: 3em;
            }
        }
        > div{
            &:nth-child(2) {
                .hard-time-deciding__icon {
                    &:before {
                        background-color: $blue;
                        top: 6em;
                        left: 3em;
                    }
                }
            }
        }

        svg {
            position: relative;


            &:hover {
                transform: scale(0.9);
                transition: 1s ease-in-out;
            }
        }

        a {
            color: black;
            text-decoration: none;
        }

        h5 {
            font-size: 4em;
            margin-top: 2em;
        }

        p {
            font-family: $secondary-font;
            margin-top: 2em;
        }
    }

</style>
