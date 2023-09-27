<template>
    <v-card
        v-if="calendarType !== 0"
        class="mx-auto mt-8"
        variant="outlined"
    >
        <v-toolbar
            :flat="true"
            color="blue"
            density="compact"
        >
            <v-toolbar-title>Select Courses Outside of a Specific Program</v-toolbar-title>

            <v-spacer />

            <v-btn
                icon :disabled="
                    chosenExtraCourses.length === 0 || (chosenBaseCourses.length === 0 && calendarType === 1)
                "
                @click="generateCalendar"
            >
                <v-icon>mdi-check</v-icon>
            </v-btn>
        </v-toolbar>

        <v-card-text>
            <search-bar
                placeholder="Search course (e.g. Bioinformatics)"
                :chips="true"
                :multiple="true"
                :is-course="true"
                :filter="Object.keys(allExtraCourses)"
            />
        </v-card-text>
    </v-card>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import {mapActions, mapState} from "vuex";

export default {
    components: {
        SearchBar
    },
    data() {
        return {
            disabled: true
        }
    },
    computed: {
        ...mapState(['calendarType', 'allExtraCourses', 'chosenBaseProgram', 'chosenBaseCourses', 'chosenExtraCourses',
            'calendarURL'])
    },
    methods: {
        ...mapActions(['updateCalendarURL']),
        async generateCalendar() {
            const url = this.calendarType === 1 ? `url=${this.chosenBaseProgram['url']}&` : ''
            const subjects = this.calendarType === 1 ? `subjects=${this.chosenBaseCourses}&` : ''
            const extraSubjects = this.calendarType !== 0 ? `extra_subjects=${this.chosenExtraCourses}&` : ''
            const hasBaseCalendar = this.calendarType === 1 ? 'has_base_calendar=true' : 'has_base_calendar=false'

            let res = await fetch(`${import.meta.env.VITE_BASE_URL}/cshorten?`
                + url + subjects + extraSubjects + hasBaseCalendar)
            let json = await res.json()

            await this.updateCalendarURL(json['shortened'])
            window.scrollTo(0, document.body.scrollHeight)
        }
    }
}
</script>

