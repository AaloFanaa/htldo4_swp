<template>
  <div v-if="this.pageState.value === 'std'" class="stdDisplayWrapper">
    <div class="quizDisplayWrapper">
      <quiz-display
        v-for="quiz in this.quizList"
        :key="quiz.name"
        :name="quiz.displayName"
        :id="quiz.id"
        @clickHandle="handlePageChange"
      ></quiz-display>
    </div>
  </div>
  <quiz-edit
    v-if="this.pageState.value === 'edit'"
    :id="this.selectedQuiz"
  ></quiz-edit>
  <site-header :textHeader="this.pageState.displayValue"></site-header>
</template>

<script>
/* eslint-disable */
import siteHeader from './components/siteHeader.vue';
import quizDisplay from './components/quizDisplay.vue';
import quizEdit from './components/quizEdit.vue';
import quizGame from './components/quizGame.vue';

export default {
  name: 'App',
  components: {
    siteHeader,
    quizDisplay,
    quizEdit,
    quizGame,
  },
  data() {
    return {
      // Needed to keep track of the current page state
      pageState: { value: 'std', displayValue: 'Hover me!' },
      quizList: {},
      selectedQuiz: null,
    };
  },
  created() {
    fetch(
      'https://quiz-app-bce68-default-rtdb.europe-west1.firebasedatabase.app/quizzes.json'
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.quizList = data;
      });
  },
  methods: {
    handlePageChange(id, btnType) {
      switch (btnType) {
        case 'play':
          this.pageState = { vlaue: 'play', displayValue: 'Good luck!' };
          this.selectedQuiz = id;
          console.log('Changing page...');
          break;
        case 'edit':
          this.pageState = { value: 'edit', displayValue: 'Edit quiz!' };
          this.selectedQuiz = id;
          console.log('Changing page...');
          break;
        case 'del':
          alert('Are you sure about that??');
          //Delete
          break;
      }
    },
    setToStdPage() {
      this.pageState = { value: 'std', displayValue: 'Hover me!' };
    },
  },
};
</script>

<style>
/* Importing global color variables */
@import './colors.css';

body,
html {
  margin: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: var(--bgClr);
  font-size: 10px;
}

#app {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--textClr);
  font-size: 3rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.quizDisplayWrapper {
  display: flex;
  height: 60%;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
}

.stdDisplayWrapper {
  margin-top: 1.5rem;
  width: 50%;
  min-height: 50%;
  background-color: var(--fgClr);
  border-radius: 1rem;
}
</style>
