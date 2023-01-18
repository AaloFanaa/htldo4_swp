<template>
  <site-header :quizName="this.quizName"></site-header>
  <div class="questionDisplayWrapper">
    <div class="questionFormWrapper" v-for="item in this.questions" :key="item">
      <input
        type="text"
        class="questionText"
        v-model="item[1].questionText"
        placeholder="Question..."
      />
      <div
        class="questionWrapper"
        v-for="question in item[1]"
        :key="question.answer"
      >
        <input class="answerText" type="text" placeholder="Answer..." />
        <input class="answerCheck" type="checkbox" />
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
        for (let i = 0; i < Object.entries(data).length; i++) {
          this.questions[i] = Object.entries(data.questions)[i];
        }
      });
    console.log(this.questions);
  },
  methods: {
    logQuestion(e) {
      console.log(e);
    },
  },
};
</script>

<style scoped>
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

.questionFormWrapper {
  display: flex;
  width: 90%;
  height: auto;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--fgColor);
  transition: all 0.3s;
  margin-top: 3rem;
  padding: 1.5rem;
}

.questionText {
  padding: 1.5rem;
  width: calc(100% - 3rem);
  text-align: left;
  font-size: 2rem;
  height: 6rem;
}

.questionWrapper {
  display: flex;
  width: 100%;
  margin-top: 1.5rem;
  justify-content: space-between;
}

.answerText {
  padding: 1.5rem;
  width: 85%;
  height: 4rem;
  font-size: 2rem;
}

/* Toggle button styling */
.answerCheck {
  height: 100%;
  width: 10%;
  align-self: center;
  opacity: 0;
  position: relative;
}

.answerCheck::after {
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  background-color: transparent;
  border: 1px solid var(--textColor);
}

/* text input style */
input[type='text'] {
  border: 1px solid var(--textColor);
  background-color: var(--fgtColor);
  color: var(--textColor);
  outline: none;
  transition: all 0.3s;
}

input[type='text']:hover {
  scale: 1.015;
  background-color: var(--fgHighlightColor);
}
</style>
