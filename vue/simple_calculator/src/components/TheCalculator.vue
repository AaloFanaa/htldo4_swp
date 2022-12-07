<template>
  <input @change="stringChanged()" type="text" v-model="this.calcString" />
</template>

<script>
export default {
  emits: ['stringChanged'],
  props: {
    strInput: {
      type: String,
    },
  },
  watch: {
    strInput: function (newVal, oldVal) {
      this.calcString = this.strInput;
      console.log('Prop changed: ', newVal, ' | was: ', oldVal);
    },
  },

  methods: {
    stringChanged() {
      this.$emit('stringChanged', this.calcString);
    },
  },
  data() {
    return {
      calcString: '',
    };
  },
};
</script>

<style>
input {
  outline: none;
  border: solid 2px aqua;
  background-color: rgb(50, 50, 50);
  color: white;
  height: 30%;
  width: calc(90% - 0.5rem);
  font-size: 2.5rem;
  color: aqua;
  padding: 0 0.5rem;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}
</style>
