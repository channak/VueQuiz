<template>
    <div>
        <h1>Quiz Results</h1>
        <p>Score: {{numCorrect}} of {{countQuestions}}</p>
        <hr>
        <div v-for="(item, index) in allQuestions" :key="index">
            <h3>Question {{index+1}}:</h3>
            <h5>{{item.question}}</h5>
            <h5>hello</h5>
            <b-list-group>
                <b-list-group-item                  
                    v-for="(answer, i) in item.answer"                       
                    :key="i"
                    :class="[answerClass(i,index)]">{{answer}}                               
                    <span v-show="selectedIndice[index]===i&&selectedIndice[index]===item.answer.indexOf(item.correctAnswer)"><b-badge variant="success">&#10004; ឆ្លើយត្រូវ</b-badge></span>
                    <span v-show="selectedIndice[index]===i&&selectedIndice[index]!==item.answer.indexOf(item.correctAnswer)"><b-badge variant="danger">&#10006; ឆ្លើយមិនត្រូវ</b-badge></span>
                    <span v-show="selectedIndice[index]===null && i===item.answer.indexOf(item.correctAnswer) || selectedIndice[index]!==item.answer.indexOf(item.correctAnswer) && i===item.answer.indexOf(item.correctAnswer)"><b-badge variant="success">Correct Answer</b-badge></span>
                </b-list-group-item>                
            </b-list-group>
            <hr>
        </div>
    </div>
</template>

<script>
import { mapState,mapGetters  } from 'vuex'
export default {
    computed: {
        ...mapState([
             'allQuestions',
        'selectedIndice',
        'questions','index','numCorrect'
        ]),
        ...mapGetters([          
            'countQuestions'
        ]),
   
    },
    methods: {
        answerClass(i,index){
            let answerClass = ''
            if(this.selectedIndice[index]===i){
                if(this.selectedIndice[index]===this.allQuestions[index].answer.indexOf(this.allQuestions[index].correctAnswer)){
                    answerClass = 'list-group-item-success'
                }else{
                    answerClass = 'list-group-item-danger'
                }                
            }
            return answerClass
        },
    },
}
</script>
<style scoped>

.list-group{
    text-align: left;
}
.badge{
    float: right;
}
h5{
    text-align: left;
}

</style>