<template>
  <site-header :quizName="this.quizName"></site-header>
  <div class="questionFormWrapper"></div>
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
      questions: {},
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
      });
    console.log(this.quizName);
  },
};
</script>

<style>
.questionFormWrapper {
  background-color: var(--fgClr);
  width: 50%;
  height: 50%;
  border-radius: 1rem;
}
</style>
