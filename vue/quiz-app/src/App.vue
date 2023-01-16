<template>
  <div
    v-if="this.pageState.value !== 'std'"
    class="homeBtn"
    @click="setToStdPage"
  >
    Home
  </div>
  <div v-if="this.pageState.value === 'std'" class="stdDisplayWrapper">
    <quiz-display
      v-for="quiz in this.quizList"
      :key="quiz[0]"
      :quizId="quiz[0]"
      :name="quiz[1].displayName"
      :id="quiz[1].id"
      @clickHandle="handlePageChange"
    ></quiz-display>
    <img @click="handleAddQuiz" class="addBtn" src="./assets/plus.svg" />
  </div>
  <quiz-edit
    v-if="this.pageState.value === 'edit'"
    :id="this.selectedQuiz"
  ></quiz-edit>
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
      quizList: [],
      selectedQuiz: null,
    };
  },
  created() {
    this.fetchQuizzes();
  },
  methods: {
    handlePageChange(id, btnType, quizId) {
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
          if (confirm('Are you sure you want to delete this Quiz')) {
            fetch(
              `https://quiz-app-bce68-default-rtdb.europe-west1.firebasedatabase.app/quizzes/${quizId}.json`,
              {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            ).then((res) => {
              console.log(res);
            });
          }
          break;
      }
    },
    setToStdPage() {
      this.pageState = { value: 'std', displayValue: 'Hover me!' };
    },
    handleAddQuiz() {
      let quizName = prompt('Enter the name of the quiz:');
      let id = quizName.replace(/\s+/g, '').toLowerCase();
      fetch(
        `https://quiz-app-bce68-default-rtdb.europe-west1.firebasedatabase.app/quizzes.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            displayName: quizName,
            id: id,
          }),
        }
      ).then((res) => {
        console.log(res);
      });
      this.fetchQuizzes();
    },
    async fetchQuizzes() {
      await fetch(
        'https://quiz-app-bce68-default-rtdb.europe-west1.firebasedatabase.app/quizzes.json'
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.quizList = [];
          for (let i = 0; i < Object.entries(data).length; i++) {
            this.quizList[i] = Object.entries(data)[i];
          }
        });
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
  font-family: 'Quicksand', sans-serif;
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
  position: relative;
}

.stdDisplayWrapper::-webkit-scrollbar {
  width: 0.8rem;
}

.stdDisplayWrapper::-webkit-scrollbar-track {
  background: var(--fgHighClr);
  border-radius: 5rem;
}

.stdDisplayWrapper::-webkit-scrollbar-thumb {
  background: var(--textClr);
  border-radius: 5rem;
}

.stdDisplayWrapper {
  width: 50%;
  height: 50%;
  background-color: var(--fgClr);
  border-radius: 1rem;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.homeBtn {
  position: absolute;
  top: 2rem;
  left: 2rem;
  background-color: var(--redClr);
  border-radius: 5rem;
  padding: 1.2rem;
  cursor: pointer;
}

.homeBtn:hover {
  background-color: var(--redHighClr);
}

.addBtn {
  aspect-ratio: 1;
  height: 5rem;
  cursor: pointer;
  transition: all 0.2s;
  padding: 2rem;
}

.addBtn:hover {
  scale: 1.15;
}
</style>
