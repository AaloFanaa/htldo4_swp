<template>
  <div @click="click()" class="btn">{{ this.calcOperation }}</div>
</template>

<script>
export default {
  emits: ['handleClick'],
  props: {
    calcOperation: {
      type: String,
      required: true,
    },
  },
  methods: {
    click() {
      this.$emit('handleClick', this.calcOperation);
    },
  },
};
</script>

<style>
.btn {
  width: 20%;
  height: 3.5rem;
  aspect-ratio: 2;
  background-color: rgb(50, 50, 50);
  color: aqua;
  text-align: center;
  font-size: 1.5rem;
  border-radius: 1rem;
  border: 1px solid aqua;
  line-height: 3.5rem;
  transition: all 0.3s;
  font-size: 2rem;
}

.btn:hover {
  background-color: rgb(70, 70, 70);
}
</style>
