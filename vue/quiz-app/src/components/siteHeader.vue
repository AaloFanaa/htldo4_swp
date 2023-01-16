<template>
  <div class="headWrapper">
    <span>Editing quiz: {{ this.quizName }}</span>
  </div>
</template>

<script>
export default {
  props: {
    quizName: {
      type: String,
      default: 'Quiz!',
    },
  },
  data() {
    return {};
  },
  methods: {},
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
  top: 2.5rem;
}
</style>
