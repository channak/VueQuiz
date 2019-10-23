<template>
  <div class="question-box">
    <b-jumbotron>
      <template v-slot:lead>{{currentQuestion.question}}</template>

      <hr class="my-4" />
      <b-list-group>
        <b-list-group-item
          v-for="(answer, index) in answers"
          :key="index"
          @click.prevent="selectAnswer(index)"
          :class="[selectedIndex===index?'list-group-item-primary':'']"
        >{{answer}}</b-list-group-item>
      </b-list-group>

      <b-button variant="primary" href="#">Submit</b-button>
      <b-button variant="success" href="#" @click="next">Next</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    currentQuestion: Object,
    next: Function
  },
  data() {
    return {
      selectedIndex: null,
      shuffledAnswers:[]
    };
  },
  watch: {
    // currentQuestion(){      
    //   this.selectedIndex=null
    //   this.shuffleAnswers()
    // }
    currentQuestion:{  
      immediate:true,
      handler(){
        this.selectedIndex=null
        this.shuffleAnswers()
      }    
    }
  },
  methods: {
    selectAnswer(index) {
      this.selectedIndex = index
    },
    shuffleAnswers(){
      let answers = [...this.currentQuestion.incorrect_answers,this.currentQuestion.correct_answer]
      this.shuffledAnswers = _.shuffle(answers) 
    }
  },
  computed: {
    answers() {
      let answers = [...this.currentQuestion.incorrect_answers]
      answers.push(this.currentQuestion.correct_answer)
      return answers
    }
  }
};
</script>

<style scoped>
.list-group {
  margin-bottom: 15px;
}
.list-group-item:hover {
  background-color: #eee;
  cursor: pointer;
}
.jumbotron {
  padding: 0;
}
.red {
  background: red;
}
</style>