<template>
  <div class="quizDisplayWrapper">
    <span> {{ this.name }}</span>
    <!-- TO DO: Add number of questions -->
    <div class="btnWrapper">
      <span class="btn">Play</span>
      <span class="btn">Edit</span>
      <span class="btn">Delete</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
