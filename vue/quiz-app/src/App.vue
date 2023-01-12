<template>
  <site-header :textHeader="this.pageState.displayValue"></site-header>
  <quiz-display
    v-for="item in this.quizList"
    :name="item.displayName"
  ></quiz-display>
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
      pageState: { value: 'std', displayValue: 'Welcome!' },
      quizList: [],
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
        for (item in data) {
          this.quizList.push(data);
        }
      });
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--textclr);
}
</style>
