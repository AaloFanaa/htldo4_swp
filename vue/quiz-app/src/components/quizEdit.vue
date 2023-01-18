<template>
  <site-header :quizName="this.quizName"></site-header>
  <div class="questionDisplayWrapper">
    <div class="questionFormWrapper" v-for="item in this.questions" :key="item">
      <span class="questionText">{{ item[1].questionText }}</span>
      <div class="questionWrapper">
        <input
          v-for="question in item[1]"
          class="answerText"
          type="text"
          :key="question.answer"
        /><input class="answerCheck" type="checkbox" />
      </div>
    </div>
  </div>
</template>

<script>
import siteHeader from './siteHeader.vue';

export default {
  components: {
    siteHeader,
  },
  props: {
    quizId: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      quizName: '',
      questions: [],
    };
  },
  async created() {
    await fetch(
      `https://quiz-app-bce68-default-rtdb.europe-west1.firebasedatabase.app/quizzes/${this.quizId}.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.quizName = data.displayName;

        //Parsing the questions to an array
        this.questions = [];
        for (let i = 0; i < Object.entries(data).length - 1; i++) {
          this.questions[i] = Object.entries(data.questions)[i];
        }
      });
    console.log(this.questions);
  },
};
</script>

<style>
.questionDisplayWrapper::-webkit-scrollbar {
  width: 0.8rem;
}

.questionDisplayWrapper::-webkit-scrollbar-track {
  background: var(--fgHighlightColor);
  border-radius: 5rem;
}

.questionDisplayWrapper::-webkit-scrollbar-thumb {
  background: var(--textColor);
  border-radius: 5rem;
}

.questionDisplayWrapper {
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

.questionDisplayWrapper {
  overflow: hidden;
}

.questionFormWrapper {
  display: flex;
  min-height: 9rem;
  width: 90%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--fgColor);
  transition: all 0.3s;
  margin-top: 1.5rem;
  border: 1px solid white;
}

.questionText {
}

.questionWrapper {
  display: grid;
  grid-template-columns: 70% 30%;
}

.answerText {
  width: 95%;
}

.answerCheck {
}
</style>
