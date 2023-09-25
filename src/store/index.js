import Vuex from 'vuex'

export default new Vuex.Store({
    state: {
        calendarType: 0,
        allPrograms: [],
        allExtraCourses: [],
        chosenBaseProgram: undefined,
        chosenBaseCourses: [],
        chosenExtraCourses: '',
        calendarURL: undefined
    },
    mutations: {
        setCalendarType(state, value) {
            state.calendarType = value
        },
        setAllPrograms(state, value) {
            state.allPrograms = value
        },
        setAllExtraCourses(state, value) {
            state.allExtraCourses = value
        },
        setChosenBaseProgram(state, value) {
            state.chosenBaseProgram = value
        },
        setChosenBaseCourses(state, value) {
            state.chosenBaseCourses = value
        },
        setChosenExtraCourses(state, value) {
            state.chosenExtraCourses = value
        },
        setCalendarURL(state, value) {
            state.calendarURL = value
        }
    },
    actions: {
        updateCalendarType({ commit }, payload) {
            commit('setCalendarType', payload)
        },
        updateAllPrograms({ commit }, payload) {
            commit('setAllPrograms', payload)
        },
        updateAllExtraCourses({ commit }, payload) {
            commit('setAllExtraCourses', payload)
        },
        updateChosenBaseProgram({ commit }, payload) {
            commit('setChosenBaseProgram', payload)
        },
        updateChosenBaseCourses({ commit }, payload) {
            commit('setChosenBaseCourses', payload)
        },
        updateChosenExtraCourses({ commit }, payload) {
            commit('setChosenExtraCourses', payload)
        },
        updateCalendarURL({ commit }, payload) {
            commit('setCalendarURL', payload)
        }
    }
})
