<template>
    <v-card class="mx-auto" variant="outlined">
        <v-toolbar
            :flat="true"
            color="blue"
            density="compact"
        >
            <v-toolbar-title>Select Calendar Type</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
            <p class="mb-1">Select the type of calendar you want to generate. The options are as follow:</p>
            <ul class="ml-6 mb-4">
                <li>
                    <b>Only Base Course</b>: You want to select only the courses of your program (e.g. Master in AI,
                    Master in Software and Data Engineering...);
                </li>

                <li>
                    <b>Base Program + Extra Courses</b>: In this case, you can select – in addition to the courses of
                    your base program – also those that belong to other programs;
                </li>

                <li>
                    <b>No Base Program</b>: In this case, you can select courses that belong to any program. This mode
                    is useful in the case you are still doing some exams outside of the 3 years of Bachelor or 2 years
                    of Master.
                </li>
            </ul>

            <v-chip-group
                mandatory
                v-model="selection"
                selected-class="text-blue"
            >
                <v-chip variant="outlined">Only Base Program</v-chip>
                <v-chip variant="outlined">Base Program + Extra Courses</v-chip>
                <v-chip variant="outlined">No Base Program</v-chip>
            </v-chip-group>
        </v-card-text>
    </v-card>
</template>

<script>
import {mapActions} from "vuex";

export default {
    data() {
        return {
            selection: 0
        }
    },
    methods: {
        ...mapActions(['updateCalendarType', 'updateChosenBaseCourses', "updateChosenBaseProgram",
            "updateChosenExtraCourses"]),
    },
    watch: {
        selection(val) {
            this.updateCalendarType(val)
            this.updateChosenBaseProgram(undefined)
            this.updateChosenBaseCourses([])
            this.updateChosenExtraCourses('')
        }
    }
}
</script>
