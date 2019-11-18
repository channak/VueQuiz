import Result from './components/Result.vue';
import Summary from './components/Summary.vue';
import QuestionBox from './components/QuestionBox.vue';

export default[
    { path: '/', component: QuestionBox },
    { path: '/result', component: Result },
    { path: '/summary', component: Summary },
]