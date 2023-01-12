<template>
  <div class="headWrapper">
    <span class="headText"> {{ this.textHeader }}</span>
  </div>
</template>

<script>
export default {
  props: {
    textHeader: {
      type: String,
      default: 'Welcome!',
    },
  },
};
</script>

<style>
.headWrapper {
  width: 100%;
  height: 10vh;
  color: var(--headerClr);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--headClr);
}
</style>
