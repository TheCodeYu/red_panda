<template>
  <div id="mytitle">
    <TitleBtn type="min" />
    <!-- <TitleBtn type="max" />
    <TitleBtn type="close" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TitleBtn from '../widgets/TitleBtn.vue'
export default defineComponent({
  name: 'Header',
  methods: {
  },
  components: {
    TitleBtn
  }
})
</script>

<style>
#mytitle {
  width: 100%;
  background-color:aquamarine;
  -webkit-app-region: drag;
}
</style>
