<template>
    <router-link :to="link"
        class="inline-block rounded-lg hover:bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-center text-white shadow-sm ring-1 hover:ring-indigo-600 bg-[#01487e] ring-[#01487e]">
        {{ buttonText }}
    </router-link>

</template>

<script>
export default {
    props: {
        buttonText: String,
        link: String
    }
}
</script>