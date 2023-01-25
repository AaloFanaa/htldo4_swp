<template><div class="playWrapper"></div></template>

<script>
export default {
  props: {
    quizId: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.playWrapper::-webkit-scrollbar {
  width: 0.8rem;
}

.playWrapper::-webkit-scrollbar-track {
  background: var(--fgHighlightColor);
  border-radius: 5rem;
}

.playWrapper::-webkit-scrollbar-thumb {
  background: var(--textColor);
  border-radius: 5rem;
}

.playWrapper {
  width: 50%;
  height: 60%;
  background-color: var(--fgColor);
  border-radius: 1rem;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
