<template>
  <site-header :quizName="this.quizName"></site-header>
  <div class="questionDisplayWrapper">
    <div
      class="questionFormWrapper"
      v-for="question in this.questions"
      :key="question"
    >
      <input
        type="text"
        class="questionText"
        v-model="question[1].questionText"
        placeholder="Question..."
      />
      <div
        class="questionWrapper"
        v-for="answer in Object.entries(question)[1][1].answers"
        :key="answer"
      >
        <input
          class="answerText"
          type="text"
          v-model="answer.answerText"
          placeholder="Answer..."
        />
        <input
          v-model="answer.answerValue"
          :id="this.getUniqueId(question, answer)"
          type="checkbox"
          class="answerCheck"
        /><label
          :for="this.getUniqueId(question, answer)"
          class="answerCheckLabel"
        ></label>
      </div>
    </div>
    <div @click="handleAddQuestion" class="questionFormAddQuestion">
      <img class="addQuestionPlus" src="../assets/plus.svg" /><span
        class="addQuestionText"
        >Add Question</span
      >
    </div>
  </div>
  <div @click="handleSaveData" class="saveBtn">Save</div>
</template>

<script>
import siteHeader from './siteHeader.vue';

export default {
  emits: ['setPageState'],
  components: {
    siteHeader,
  },
  props: {
    quizId: {
      type: String,
      required: true,
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
        this.quizName = data.displayName;

        //Parsing the questions to an array
        this.questions = [];
        for (let i = 0; i < Object.entries(data.questions).length; i++) {
          this.questions[i] = Object.entries(data.questions)[i];
        }
      });
    console.log(this.questions);
  },
  methods: {
    handleSaveData() {
      //formatting data to upload it
      let data = {};
      this.questions.forEach((question) => {
        data[question[0]] = question[1];
      });
      fetch(
        `https://quiz-app-bce68-default-rtdb.europe-west1.firebasedatabase.app/quizzes/${this.quizId}.json`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ questions: data }),
        }
      ).then((res) => {
        console.log(res);
      });
      //reset page state
      this.$emit('setPageState');
    },
    handleAddQuestion() {
      let ansNum = prompt('How many answers should the question have?');
      if (isNaN(ansNum)) {
        alert('Enter a number!');
        return;
      }
      this.questions.push(this.getQuestionLayout(ansNum));
    },
    getQuestionLayout(ansNum) {
      let layout = [];
      let num = this.questions.length + 1;
      let answers = {};
      for (let i = 0; i < ansNum; i++) {
        let index = i + 1;
        answers['answer' + index] = {
          answerText: '',
          answerValue: false,
        };
      }
      layout[0] = 'question' + num;
      layout[1] = { answers: answers };
      return layout;
    },
    getUniqueId(question, answer) {
      return (
        question[0] +
        Object.values(answer)[0].toString().replace(/\s+/g, '').toLowerCase()
      );
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

.questionFormAddQuestion {
  display: flex;
  justify-content: center;
  transition: all 0.3s;
}

.questionFormAddQuestion:hover {
  scale: 1.05;
  cursor: pointer;
}

.addQuestionPlus {
  aspect-ratio: 1;
  height: 5rem;
  padding: 2rem;
}

.addQuestionText {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.questionFormAddAnswer {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  transition: all 0.3s;
}

.questionFormAddAnswer:hover {
  scale: 1.05;
  cursor: pointer;
}

.addAnswerPlus {
  aspect-ratio: 1;
  height: 3rem;
  padding: 1rem;
}

.addAnswerText {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}

/* Toggle button styling */
.answerCheck {
  height: 0;
  width: 0;
  visibility: hidden;
}

.answerCheckLabel {
  height: 100%;
  aspect-ratio: 1;
  align-self: center;
  position: relative;
  background-color: var(--fgColor);
  cursor: pointer;
  border: 1px solid var(--textColor);
}
.answerCheckLabel::after {
  font-size: 2.2rem;
  text-align: center;
  content: 'False';
  position: absolute;
  top: clac(50% - 1.1rem);
  height: 100%;
  width: 100%;
  transition: all 0.3s;
}

.answerCheck:checked + .answerCheckLabel:after {
  content: 'True';
}

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

input[type='text']:focus {
  scale: 1.015;
  background-color: var(--fgHighlightColor);
}

.saveBtn {
  position: absolute;
  width: 20%;
  bottom: 3rem;
  padding: 2rem;
  background-color: var(--primColor);
  border-radius: 5rem;
  transition: all 0.3s;
}

.saveBtn:hover {
  background-color: var(--primHighlightColor);
  scale: 1.05;
  cursor: pointer;
}
</style>
