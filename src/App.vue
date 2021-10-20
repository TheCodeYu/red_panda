<template>
    <div class="desktop"></div>
    <!-- <Header/> -->

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

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

  }
})
</script>

<style scoped lang="scss">
.desktop{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
