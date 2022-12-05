<template>
  <div class="calc">
    <div class="inputDisplay">
      <h1>Simple calculator</h1>
      <the-calculator :clacInput="this.calcString"></the-calculator>
    </div>
    <div class="buttons">
      <simple-button
        @handleClick="addOperation()"
        :calcOperation="'+'"
      ></simple-button>
      <simple-button
        @handleClick="addOperation()"
        :calcOperation="'-'"
      ></simple-button>
      <simple-button
        @handleClick="addOperation()"
        :calcOperation="'*'"
      ></simple-button>
      <simple-button
        @handleClick="addOperation()"
        :calcOperation="'/'"
      ></simple-button>
    </div>
    <div class="equal">
      <simple-button
        @handleClick="addOperation()"
        :calcOperation="'='"
      ></simple-button>
    </div>
  </div>
</template>

<script>
import SimpleButton from './components/SimpleButton.vue';
import TheCalculator from './components/TheCalculator.vue';

export default {
  name: 'App',
  components: {
    SimpleButton,
    TheCalculator,
  },
  data() {
    return {
      calcString: '',
    };
  },
  methods: {
    addOperation(operation) {
      console.log(operation);
      this.calcString += operation;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background-color: gray;
}

.calc {
  background-color: rgb(50, 50, 50);
  border-radius: 1rem;
  height: 60%;
  width: 50%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 40% 30% 30%;
  border: 2px solid aqua;
}

.buttons {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.equal {
  display: flex;
  justify-content: center;
  align-items: center;
}

.equal .btn {
  width: 80% !important;
}

.inputDisplay {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: aqua;
}
</style>
