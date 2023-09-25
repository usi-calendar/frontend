<template>
    <v-container class="bar mt-10 mb-10">
        <img class="logo" :src="logoLong" alt="usicalendar logo">
    </v-container>
</template>

<script>
import LogoLong from "../assets/logo-long.svg"

export default {
    data() {
        return {
            logoLong: LogoLong
        }
    }
}
</script>

<style scoped>
.bar {
    display: flex;
    flex-direction: row;

    justify-content: center;
}

.logo {
    height: 40px;
}
</style>
