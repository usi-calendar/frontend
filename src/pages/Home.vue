<template>
    <v-container class="container">
        <top-bar />

        <v-container>
            <choose-type />
            <base-program />
            <extra-courses />
            <link-holder />
        </v-container>
    </v-container>
</template>

<script>
import TopBar from "../components/TopBar.vue"
import ChooseType from "../components/ChooseType.vue"
import {mapState} from "vuex";
import BaseProgram from "../components/BaseProgram.vue";
import ExtraCourses from "../components/ExtraCourses.vue";
import LinkHolder from "../components/LinkHolder.vue";

export default {
    components: {
        ExtraCourses,
        TopBar,
        ChooseType,
        BaseProgram,
        LinkHolder
    },
    computed: {
        ...mapState(['calendarType', 'calendarURL'])
    }
}
</script>

<style scoped>
.container {
    width: 100%;

    padding: 15px 0;
    margin: 0;
}
</style>
