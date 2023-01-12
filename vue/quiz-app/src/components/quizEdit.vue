<template>
  <span>{{ this.id }}</span>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      name: '',
      questions: {},
    };
  },
  created() {
    fetch(
      `https://quiz-app-bce68-default-rtdb.europe-west1.firebasedatabase.app/quizzes/${this.id}.json`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.questions);
        this.name = data.displayName;
      });
    console.log(this.questions);
  },
};
</script>

<style></style>
