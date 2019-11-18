<template>
    <div>
        <h1>This is result: </h1>  
        <h3>{{numCorrect}} of {{countQuestions}}</h3>  
        <b-button variant="success" @click="$router.push('/summary')">Check Your Answers</b-button>
    </div>
</template>

<script>
import { mapState,mapGetters  } from 'vuex'
export default {
    computed: {
        ...mapState([
            'title',
            'links',
            'numCorrect'
        ]),
        ...mapGetters([
            'countLinks',
            'countQuestions'
        ]),
        

    }

}
</script>