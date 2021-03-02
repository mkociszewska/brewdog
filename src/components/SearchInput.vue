<template>
    <label @click.stop class="input-search">
        <input placeholder="search in names and descriptions" v-model="internalSearchValue">
    </label>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
  import { isEqual } from 'lodash'


  @Component
  export default class Search extends Vue {
    @Prop() readonly placeholder!: string
    @Prop() readonly value!: string
    internalSearchValue: string = ''
    search: string = ''
    focus: boolean = false
  }
</script>
