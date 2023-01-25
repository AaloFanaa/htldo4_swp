<template>
  <site-header :greetingClause="'Playing: '"></site-header>
  <div class="playWrapper">{{ this.quizId }}</div>
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
      required: true,
    },
  },
  data() {
    return {
      questions: [],
      quizName: '',
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
