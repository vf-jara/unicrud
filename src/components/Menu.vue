<template>
    <div class="flex flex-col w-full h-full gap-5 px-4 py-5">
        <img src="/logoCapital.webp" class="w-[50%] mx-auto" />
        <Button buttonText="Home" link="/" />
        <Button buttonText="Lista de Usuários" link="/list" />
        <Button buttonText="Adicionar Usuário" link="/add-user" />
    </div>
</template>

<script>
import Button from "./Button.vue"
import Search from "./Search.vue"

export default {
    components: {
        Button,
        Search
    },
}
</script>