<template>
  <div v-if="this.quizFinished === false" class="playWrapper">
    <question-display
      :currQuestion="this.questions[this.currQuestion]"
      @handleAnswerClicked="handleAnswer"
    ></question-display>
  </div>
  <div v-if="this.quizFinished === true" class="finishedWrapper">
    <span
      >You got {{ this.rightAnswers }} of {{ this.questions.length }} answers
      right</span
    >
  </div>
</template>

<script>
import questionDisplay from './questionDisplay.vue';

export default {
  components: {
    questionDisplay,
  },
  props: {
    quizId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      questions: [],
      quizName: '',
      currQuestion: 0,
      rightAnswers: 0,
      quizFinished: false,
    };
  },
  methods: {
    handleAnswer(answerValue) {
      console.log(this.currQuestion + 1, this.questions.length);
      this.currQuestion + 1 == this.questions.length
        ? (this.quizFinished = true)
        : (this.quizFinished = false);
      this.currQuestion++;
      if (!answerValue) {
        return;
      }
      this.rightAnswers++;
    },
    fnishedQuiz() {
      this.quizFinished != this.quizFinished;
    },
  },
  async created() {
    await fetch(
      `https://quiz-app-bce68-default-rtdb.europe-west1.firebasedatabase.app/quizzes/${this.quizId}.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.quizName = data.displayName;
        this.questions = [];
        for (let i = 0; i < Object.entries(data.questions).length; i++) {
          this.questions[i] = Object.entries(data.questions)[i];
        }
      });
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
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.finishedWrapper {
  width: 50%;
  height: 60%;
  background-color: var(--primColor);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>
