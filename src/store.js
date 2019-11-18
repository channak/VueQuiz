import _ from 'lodash'
export default{
    state:{
        questions: [],
        selectedIndice: [],
        allQuestions: [],
        index: 0,
        numCorrect: 0
        
    },
    getters:{
        countQuestions: state =>{
            return state.questions.length
        }
    },
    mutations:{
        SET_ALLQUESTIONS:(state,data)=>{
            state.questions = [...data]
            state.selectedIndice = Array(state.questions.length).fill(null);
            state.questions.forEach(element => {
                let answer = [...element.incorrect_answers, element.correct_answer];
                state.allQuestions.push({
                        question:_.unescape(element.question.replace('/"/g',"")),
                        answer: _.shuffle(answer),
                        correctAnswer: element.correct_answer
                })
            })
        },
        INC_INDEX:(state) => {
            state.index++
        },
        DEC_INDEX:(state) => {
            state.index--
        },
        COUNT_CORRECT:(state)=>{
            for (let i = 0; i < state.allQuestions.length; i++) {
                if (state.selectedIndice[i] != null) {
                  if (
                    state.selectedIndice[i] ===
                    state.allQuestions[i].answer.indexOf(state.allQuestions[i].correctAnswer)
                  ) {
                    state.numCorrect++;
                  }
                }
            }
        }

    },
    actions:{
        GET_ALLQUESTIONS:(context)=>{
            fetch("https://opentdb.com/api.php?amount=10&category=18&type=multiple", {
                method: "get"
            })
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                context.commit('SET_ALLQUESTIONS',jsonData.results)
            });
           
        },
        NEXT:(context)=>{
            context.commit('INC_INDEX')
        },
        BACK:(context)=>{
            context.commit('DEC_INDEX')
        },
        COUNT_CORRECT:(context)=>{
            context.commit('COUNT_CORRECT')
        }
    }
}