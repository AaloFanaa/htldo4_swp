<template>
  <div class="headWrapper">
    <span>{{ this.greetingClause + this.quizName }}</span>
  </div>
</template>

<script>
export default {
  props: {
    quizName: {
      type: String,
      default: 'Quiz!',
    },
    greetingClause: {
      type: String,
      default: 'Quiz: ',
    },
  },
};
</script>

<style>
.headWrapper {
  width: 50%;
  height: 10vh;
  color: var(--textColor);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primColor);
  margin-top: 1.5rem;
  border-radius: 5rem;
  position: absolute;
  top: 2.5rem;
}
</style>
