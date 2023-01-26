<template>
  <div class="questionText">{{ this.currQuestion[1].questionText }}</div>
  <div class="answerWrapper">
    <div
      class="answerPanel"
      v-for="answer in this.currQuestion[1].answers"
      :key="answer.answerText"
      @click="answerClicked(answer)"
    >
      <span>{{ answer.answerText }}</span>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['handleAnswerClicked'],
  props: ['currQuestion'],
  created() {},
  methods: {
    answerClicked(answer) {
      this.$emit('handleAnswerClicked', answer.answerValue);
    },
  },
};
</script>

<style>
.questionText {
  width: 90%;
  height: 3rem;
  padding: 3rem;
  border-bottom: 1px solid var(--textColor);
}

.answerWrapper {
  height: calc(100% - 13rem);
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.answerWrapper::-webkit-scrollbar {
  width: 0.8rem;
}

.answerWrapper::-webkit-scrollbar-track {
  background: var(--fgHighlightColor);
  border-radius: 5rem;
}

.answerWrapper::-webkit-scrollbar-thumb {
  background: var(--textColor);
  border-radius: 5rem;
}

.answerPanel {
  display: flex;
  align-items: center;
  margin: 2rem 0rem;
  padding: 1.5rem;
  min-height: 7rem;
  width: 90%;
  border: solid 1px var(--textColor);
  transition: all 0.3s;
  cursor: pointer;
}

.answerPanel:hover {
  scale: 1.03;
  background-color: var(--fgHighlightColor);
}
</style>
