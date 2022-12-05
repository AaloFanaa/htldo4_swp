<template>
  <input :v-model="this.clacInput" type="text" />
</template>

<script>
export default {
  props: {
    clacInput: {
      type: String,
      required: true,
    },
  },
  methods: {},
};
</script>

<style>
input {
  outline: none;
  border: solid 2px aqua;
  background-color: rgb(50, 50, 50);
  color: white;
  height: 30%;
  width: 90%;
  font-size: 2.5rem;
  color: aqua;
}
</style>
