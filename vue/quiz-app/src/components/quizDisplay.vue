<template>
  <div class="displayWrapper">
    <span class="name"> {{ this.name }}</span>
    <!-- TO DO: Add number of questions -->
    <div class="btnWrapper">
      <span @click="pageChangeClick($event)" id="play" class="btn">Play</span>
      <span @click="pageChangeClick($event)" id="edit" class="btn">Edit</span>
      <span @click="pageChangeClick($event)" id="del" class="btn">Delete</span>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['changePage'],
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    pageChangeClick(e) {
      this.$emit('clickHandle', this.id, e.srcElement.id);
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
  border-bottom: 1px solid var(--highlightClr);
}
.displayWrapper:hover {
  box-shadow: 0px 0px 15px 7px rgba(0, 0, 0, 0.1);
  width: 92%;
  height: 33%;
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
}
</style>
