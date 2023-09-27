<template>
    <home />
</template>

<script>
import Home from "./pages/Home.vue"
import {mapActions} from "vuex";

export default {
    components: {
        Home
    },
    async created() {
        let res = await fetch(`${import.meta.env.VITE_BASE_URL}/courses`)
        let json = await res.json()

        let allCourses = {}
        json['cals'].forEach((el) => {
            let name = this.titleCase(el.split('/')[6].replaceAll('-', ' '))
            let year = el.split('/')[9]
            allCourses[`${name} - Year ${year}`] = el
        })

        await this.updateAllPrograms(allCourses)

        // ----

        let res_all = await fetch(`${import.meta.env.VITE_BASE_URL}/extcourses`)
        let json_all = await res_all.json()

        let allExtCourses = {}
        for (const el of json_all) {
            const coursesIds = el['subjects'].reduce((prev, curr) => {
                return prev + `${curr}~`
            }, '').slice(0, -1)
            let coursesResolved = await fetch(`${import.meta.env.VITE_BASE_URL}/idinfo?ids=${coursesIds}`)
            let jsonResolved = await coursesResolved.json()

            jsonResolved['courses'].forEach((course) => {
                allExtCourses[course[1]] = course[0]
            })
        }

        await this.updateAllExtraCourses(allExtCourses)
    },
    methods: {
        ...mapActions(['updateAllPrograms', 'updateAllExtraCourses']),
        titleCase(str) {
            str = str.toLowerCase().split(' ');

            for (let i = 0; i < str.length; i++) {
                str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
            }

            return str.join(' ');
        }
    }
}
</script>

<style>
.v-container {
    max-width: none !important;
}

.v-card {
    border-color: #969696 !important;
}
</style>
