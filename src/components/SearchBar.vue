<template>
    <v-autocomplete
        v-model="query"
        variant="outlined"
        density="compact"
        prepend-inner-icon="mdi-magnify"
        menu-icon=""
        :chips="chips"
        :multiple="multiple"
        :placeholder="placeholder"
        :items="filter"
        :clearable="true"
        :persistent-placeholder="true"
        :hide-details="true"
        @update:model-value="saveQuery"
        @click:clear="clearAll"
    />
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    props: {
        placeholder: String,
        filter: Array,
        isCourse: false,
        chips: false,
        multiple: false
    },
    data() {
        return {
            loading: false,
            query: null
        }
    },
    computed: {
        ...mapState(['allPrograms', 'allExtraCourses', 'calendarType']),
    },
    methods: {
        ...mapActions(['updateChosenBaseProgram', 'updateChosenBaseCourses', 'updateChosenExtraCourses', '']),
        saveQuery() {
            if (this.isCourse) {
                if (this.query !== null) {
                    let coursesIds = ''

                    for (const el of this.query) {
                        coursesIds += `${this.allExtraCourses[el]}~`
                    }

                    this.updateChosenExtraCourses(coursesIds.slice(0, -1))
                } else {
                    this.updateChosenExtraCourses(undefined)
                }
            } else {
                if (this.query !== null) {
                    this.updateChosenBaseProgram({
                        name: this.query,
                        url: this.allPrograms[this.query]
                    })
                } else {
                    this.updateChosenBaseProgram(undefined)
                }
            }
        },
        clearAll() {
            if (!this.isCourse) {
                this.updateChosenBaseCourses([])
            }
        }
    },
    watch: {
        calendarType() {
            this.query = null
        }
    }
}
</script>

<style scoped>
</style>
