<template>
    <form @submit.prevent="onSubmit" class="rounded bg-white py-3 px-3 flex overflow-hidden gap-3">
        <MagnifyingGlass />
        <input type="search" placeholder="Pesquisar" class="bg-transparent w-full focus:outline-none" v-model="text" />
    </form>
</template>

<script>
import MagnifyingGlass from '../components/icons/Magnifying-glass.vue'

export default {
    components: {
        MagnifyingGlass
    },
    data() {
        return {
            text: ""
        }
    },
    methods: {
        onSubmit() {
            alert(this.text)
            this.text = ""
        }
    },
}
</script>