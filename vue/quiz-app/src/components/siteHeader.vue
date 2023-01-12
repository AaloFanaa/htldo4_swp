<template>
  <div
    @mouseenter="handleHoverBegin()"
    @mouseleave="handleHoverEnd()"
    class="headWrapper"
  >
    <span v-if="this.isHovered === false" class="headText">
      {{ this.textHeader }}</span
    >
  </div>
</template>

<script>
export default {
  props: {
    textHeader: {
      type: String,
      default: 'Quiz!',
    },
  },
  data() {
    return {
      isHovered: true,
    };
  },
  methods: {
    handleHoverBegin() {
      this.isHovered == true;
    },
    handleHoverEnd() {
      this.isHovered == false;
      console.log(this.isHovered);
    },
  },
};
</script>

<style>
.headWrapper {
  width: 50%;
  height: 10vh;
  color: var(--headerClr);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--headClr);
  margin-top: 1.5rem;
  border-radius: 5rem;
  position: absolute;
  bottom: 2.5rem;
}
</style>
