<template>
    <div>
        <b-nav tabs>
            <b-nav-item disabled>Vue Quiz</b-nav-item>
            <b-nav-item disabled>Your Anser: {{numCorrect}}/{{numTotal}}</b-nav-item>           
        </b-nav>
    </div>
</template>

<script>
export default {
    props:[
        'numCorrect',
        'numTotal'
    ]
}
</script>