<template>
    <div v-if="!loading" class="w-full h-screen py-5 px-5 pb-5 flex flex-col gap-6 items.center max-w-4xl">
        <div>
            <h2 class="text-3xl font-bold text-[#01487e]">Lista de Usuários:</h2>
            <input type="text" placeholder="Filtrar pelo nome" class="border mt-5 p-2 shadow rounded-lg"
                v-model="searchText">
        </div>
        <template v-for="item in filteredItems">
            <div class="shadow-md p-5 rounded-lg flex justify-between">
                <div>
                    <p>ID: {{ item.id }}</p>

                    <p>Nome: {{ item.nome }}</p>

                    <p>E-mail: {{ item.email }}</p>

                    <p>Data de Nascimento: {{ formatarNascimento(item.data_nascimento) }}</p>

                    <p>CPF: {{ formatarCPF(item.cpf) }}</p>

                    <p>Telefone: {{ formatarTelefone(item.telefone) }}</p>

                    <p>Gênero: {{ formatarGenero(item.genero) }}</p>

                    <p>Seu diferencial: {{ item.seu_diferencial }}</p>
                </div>
                <div class="flex flex-col gap-5">
                    <div>
                        <button @click="goToEdit(item)" item="item"
                            class="text-white w-full bg-[#01487e] hover:bg-indigo-600 rounded-lg px-3 py-2">Editar</button>
                    </div>
                    <div>
                        <button @click="openModal(item)"
                            class=" text-white w-full bg-red-600 rounded-lg px-3 py-2 hover:bg-red-800">Deletar</button>
                    </div>
                </div>
            </div>
        </template>
        <Modal v-if="showModal" @confirm="deleteUser(selectedItem)" @cancel="hideModal" :item="selectedItem"
            message="Você tem certeza que deseja deletar" />
    </div>
    <div v-else class="flex items-center justify-center h-screen">
        <Loader />
    </div>
</template>

<script>
import axios from 'axios'
import Loader from '../components/Loader.vue'
import Modal from '../components/Modal.vue'

export default {
    components: {
        Loader,
        Modal
    },
    data() {
        return {
            list: [],
            searchText: "",
            loading: true,
            showModal: false,
            selectedItem: null,
        }
    },
    computed: {
        filteredItems() {
            return this.list.filter(item => {
                return item.nome.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1
            })
        }
    },
    methods: {
        async getList() {
            const res = await axios.get('https://www.unigran.br/campogrande/api/index.php/teste/tecnico')
            this.list = res.data
            this.loading = false
        },
        async deleteUser(item) {
            await axios.delete(`https://www.unigran.br/campogrande/api/index.php/teste/tecnico/${item.id}`)
            this.showModal = false
            this.loading = true
            this.getList()
        },
        goToEdit(item) {
            this.$router.push({
                path: '/edit/' + item.id
            })
        },
        formatarCPF(cpf) {
            cpf = cpf.replace(/[^\d]/g, "");
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        },
        formatarNascimento(nascimento) {
            let novaData = nascimento.split('-')
            if (novaData[0].length < 4) {
                return "Data preenchida de forma incorreta"
            } else {
                return novaData.reverse().join(".")
            }
        },
        formatarTelefone(phone) {
            phone = phone.replace(/[^\d]/g, "")
            return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3")
        },
        formatarGenero(genero) {
            return genero.toLowerCase() == 'm' ? 'Masculino' : genero.toLowerCase() == 'f' ? 'Feminino' : 'Gênero não especificado'
        },
        openModal(item) {
            this.showModal = true;
            this.selectedItem = item;
        },
        hideModal() {
            this.showModal = false;
            this.selectedItem = null;
        }
    },
    created() {
        this.getList()
    }
}
</script>