<template>
    <v-autocomplete
        :chips="chips"
        :multiple="multiple"
        v-model="query"
        placeholder="Search program (e.g. Artificial Intelligence)"
        variant="outlined"
        density="compact"
        :items="filter"
        :persistent-placeholder="true"
        :clearable="true"
        prepend-inner-icon="mdi-magnify"
        menu-icon=""
        :hide-details="true"
        @update:model-value="saveQuery"
    />
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
    props: {
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
        ...mapState(['allPrograms', 'allExtraCourses']),
    },
    methods: {
        ...mapActions(['updateChosenBaseProgram', 'updateChosenExtraCourses']),
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
        }
    }
}
</script>

<style scoped>
</style>
