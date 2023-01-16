<template>
  <div class="displayWrapper">
    <span class="name"> {{ this.name }}</span>
    <div class="btnWrapper">
      <span @click="pageChangeClick($event)" id="play" class="btn">Play</span>
      <span @click="pageChangeClick($event)" id="edit" class="btn">Edit</span>
      <span @click="pageChangeClick($event)" id="del" class="btn">Delete</span>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['clickHandle'],
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    quizId: {
      type: String,
      required: true,
    },
  },
  methods: {
    pageChangeClick(e) {
      this.$emit('clickHandle', this.id, e.srcElement.id, this.quizId);
    },
  },
};
</script>

<style>
.displayWrapper {
  display: flex;
  height: 30%;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  background-color: var(--fgClr);
  transition: all 0.3s;
  border-bottom: 1px solid var(--textClr);
  margin-top: 1.5rem;
}

.displayWrapper:hover {
  scale: 1.02;
  background-color: var(--bgHighClr);
}

.name {
  padding: 1.5rem;
}

.btnWrapper {
  display: flex;
  width: 45%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  margin-right: 1.5rem;
  transition: all 0.3s;
}

.btn {
  height: 90%;
  width: 33.3%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s;
}

.btn:hover {
  font-size: 3.3rem;
}
</style>
