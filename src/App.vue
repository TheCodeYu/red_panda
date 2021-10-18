<template>
    <Header/>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Header from '@/components/layout/header.vue'

export default defineComponent({
  setup () {
    const item = {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }

    const tableData = ref(Array(20).fill(item))

    return {
      tableData
    }
  },
  components: {
    Header
  }
})
</script>

<style>
</style>
