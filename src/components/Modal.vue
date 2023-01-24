<template>
    <div class="fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-50 backdrop-blur-sm transition">
        <div class="bg-white p-6 rounded-md shadow-md">
            <p class="text-lg font-medium">{{ confirmation? confirmation: message }}{{ item?(" "+ item.nome) : "" }}?
            </p>
            <div class="flex justify-end mt-4">
                <button class="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                    @click="confirm">Confirmar</button>
                <button class="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 ml-4"
                    @click="cancel">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: String,
        confirmation: String,
        item: {
            type: Object,
            required: false,
        },
    },
    methods: {
        confirm() {
            this.$emit("confirm");
        },
        cancel() {
            this.$emit("cancel");
        },
    },
};
</script>