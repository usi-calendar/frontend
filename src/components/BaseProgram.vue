<template>
    <v-card
        v-if="calendarType !== 2"
        class="mx-auto mt-8"
        variant="outlined"
        :loading="loading"
    >
        <v-toolbar
            :flat="true"
            color="blue"
            density="compact"
        >
            <v-toolbar-title>Select Courses from Base Program</v-toolbar-title>

            <v-spacer />

            <v-btn :class="hidden" icon :disabled="disabled" @click="getCalendar">
                <v-icon>mdi-check</v-icon>
            </v-btn>
        </v-toolbar>

        <v-card-text>
            <search-bar
                :filter="Object.keys(allPrograms)"
                placeholder="Search program (e.g. Artificial Intelligence)"
            />

            <v-list v-if="courses.length !== 0">
                <v-list-item
                    v-for="course in courses"
                    :key="course[0]"
                    :title="course[1]"
                >
                    <template v-slot:prepend="">
                        <v-list-item-action start>
                            <v-checkbox-btn color="blue" @click="setCourses(course[0])" />
                        </v-list-item-action>
                    </template>
                </v-list-item>
            </v-list>

            <div
                v-if="chosenBaseProgram && courses.length === 0 && !loading"
                class="mt-4 text-center"
            >
                There are no courses available for the selected program
            </div>
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
            courses: [],
            active: {},
            loading: false,
            disabled: true,
            hidden: ''
        }
    },
    computed: {
        ...mapState(['calendarType', 'allPrograms', 'chosenBaseProgram', 'chosenBaseCourses', 'calendarURL'])
    },
    methods: {
        ...mapActions(['updateChosenBaseCourses', 'updateCalendarURL']),
        async setCourses(course) {
            this.active[course] = !this.active[course]

            let chosen = ''

            for (const el in this.active) {
                if (this.active[el]) {
                    chosen += `${el}~`
                }
            }

            chosen = chosen.slice(0, -1)
            await this.updateChosenBaseCourses(chosen)
        },
        async getCalendar() {
            const url = this.chosenBaseProgram['url']
            const query = `url=${url}&subjects=${this.chosenBaseCourses}`

            let res = await fetch(`${import.meta.env.VITE_BASE_URL}/shorten?${query}`)
            let json = await res.json()

            await this.updateCalendarURL(json['shortened'])
            window.scrollTo(0, document.body.scrollHeight)
        }
    },
    watch: {
        calendarType(value) {
            this.hidden = value === 1 ? 'hidden' : ''
        },
        async chosenBaseProgram(value) {
            if (value) {
                this.loading = true

                let res = await fetch(`${import.meta.env.VITE_BASE_URL}/urlinfo?url=${value['url']}`)
                let json = await res.json()

                this.loading = false
                this.courses = json['courses']

                this.courses.forEach((el) => {
                    this.active[el[0]] = false
                })
            } else {
                this.courses = []
                this.active = {}
            }
        },
        active: {
            handler(value) {
                let hasTrue = false

                for (const el in value) {
                    if (value[el]) {
                        hasTrue = true
                    }
                }

                this.disabled = !hasTrue
            },
            deep: true
        }
    }
}
</script>

<style scoped>
.hidden {
    display: none;
}
</style>
