<template>
  <div class="question-box">
    <b-jumbotron v-if="allQuestions.length">
      <template v-if="allQuestions.length" v-slot:lead>{{allQuestions[index].question}}</template>
      <b-list-group v-if="allQuestions.length">
        <b-list-group-item
          v-for="(answers, i) in allQuestions[index].answer"
          :key="i"
          @click.prevent="selectAnswer(i)"
          :class="[answerClass(i)]"    
          
        >{{unescape(answers)}}</b-list-group-item>
      </b-list-group>
      <b-button variant="success" href="#" @click="previous"
        :disabled="index==0"
        >Back</b-button>
      <b-button variant="success" href="#" @click="next">Next</b-button>
    </b-jumbotron>
  
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState} from 'vuex'
export default { 
  data() {
    return {
      
    };
  },
  watch: {
    // currentQuestion(){      
    //   this.selectedIndex=null
    //   this.shuffleAnswers()
    // }
    currentQuestion:{  
      immediate:true,//get call when currentqusetion first pass as props
      handler(){
        this.selectedIndex=null
        this.answered = false        
      }    
    }
  },
  methods: {
    selectAnswer(index) {
      this.selectedIndex = index
      //this.selectedIndice[this.index]=index
      this.$set(this.selectedIndice,this.index,index)
    },
    shuffleAnswers(){
      let answers = [...this.currentQuestion.incorrect_answers,this.currentQuestion.correct_answer]
      this.shuffledAnswers = _.shuffle(answers) 
      this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer)
    },
    answerClass(index){
      let answerClass = ''
      if(this.selectedIndice[this.index]===index){
        answerClass = 'list-group-item-primary'
      }
      return answerClass
    },
    next() {
      //this.index++
      if (this.index < this.questions.length - 1) {
        this.$store.dispatch('NEXT')
      } else {
        this.submit();
      }
    },
    previous() {
     this.$store.dispatch('BACK')
    },   
    submit() {
      this.$store.dispatch('COUNT_CORRECT')
      this.$router.push('/result')
    },
    unescape(answer){
      return _.unescape(answer.replace('/"/g',""));
    }
    
  },
  computed: {
      ...mapState([
        'allQuestions',
        'selectedIndice',
        'questions','index'
      ])
  },
  mounted(){
    console.log("mounted in questionbox..");
    //     fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple", {
    //   method: "get"
    // })
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(jsonData => {
    //     this.questions = jsonData.results;
    //     this.questionSize = this.questions.length;
    //     this.selectedIndice = Array(this.questionSize).fill(null);
    //     this.questions.forEach(element => {
    //       let answer = [...element.incorrect_answers, element.correct_answer];
    //       this.allQuestions.push({
    //         question: element.question,
    //         answer: _.shuffle(answer),
    //         correctAnswer: element.correct_answer
    //       });
    //     });
    //   });

    this.$store.dispatch('GET_ALLQUESTIONS')
  },
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
.not-active{
  pointer-events: none;
  cursor: default;
}
.btn-success {
  margin-left: 5px;
}

</style>