<template>
    <form v-if="!loading" @submit.prevent="openModal" class="bg-white p-5 rounded-md">
        <h2 class="text-3xl font-bold mb-4 text-[#01487e]">Editar Usuário</h2>
        <div class="shadow-lg rounded-lg p-5 max-w-4xl">
            <div class="flex gap-10 w-full">
                <div class="w-1/2">
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="name">
                            Nome
                        </label>
                        <input class="border border-gray-400 p-2 rounded-md w-full" type="text" v-model="form.nome"
                            id="name" name="name" required placeholder="Vosso belíssimo nome" maxlength="150" />
                    </div>
                </div>
                <div class="w-1/2">
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="email">
                            E-mail
                        </label>
                        <input class="border border-gray-400 p-2 rounded-md w-full" v-model="form.email" id="email"
                            name="email" type="email" placeholder="seu@email.com" maxlength="100">
                    </div>
                </div>
            </div>
            <div class="flex gap-10 w-full">
                <div class="w-1/2">
                    <div class="mb-4">
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="cpf">
                                CPF
                            </label>
                            <input class="border border-gray-400 p-2 rounded-md w-full" type="text" v-model="form.cpf"
                                id="cpf" name="cpf" required placeholder="Apenas números" maxlength="11" />
                        </div>
                    </div>
                </div>
                <div class="w-1/2">
                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2" for="phone">
                            Telefone
                        </label>
                        <input class="border border-gray-400 p-2 rounded-md w-full" type="tel" v-model="form.telefone"
                            id="phone" name="phone" required placeholder="Apenas números, com DDD" />
                    </div>
                </div>
            </div>
            <div class="w-1/2 flex gap-10">
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="data_nascimento">
                        Data de Nascimento
                    </label>
                    <input class="border border-gray-400 p-2 rounded-md" type="date" v-model="form.data_nascimento"
                        id="data_nascimento" name="data_nascimento" required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2" for="gender">
                        Gênero
                    </label>
                    <select class="border border-gray-400 p-2 rounded-md" v-model="form.genero" id="gender"
                        name="gender" required>
                        <option value="">Selecione</option>
                        <option value="m">Masculino</option>
                        <option value="f">Feminino</option>
                    </select>
                </div>

            </div>
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="diferencial">
                    Seu Diferencial
                </label>
                <textarea class="border border-gray-400 p-2 rounded-md w-full" type="textarea"
                    v-model="form.seu_diferencial" id="diferencial" name="diferencial" required maxlength="500" rows="5"
                    placeholder="Nos conte o que você tem de melhor"></textarea>
            </div>
            <div class="flex justify-end">
                <button type="submit"
                    class="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">Salvar</button>
            </div>
        </div>
    </form>
    <div v-else class="flex items-center justify-center h-screen">
        <Loader />
    </div>
    <Modal v-if="showModal" @confirm="submitForm" @cancel="hideModal" message="Confirmar Edição" />
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
            itemData: [],
            form: {
                nome: "",
                email: "",
                data_nascimento: "",
                cpf: "",
                telefone: "",
                genero: "",
                seu_diferencial: ""
            },
            showModal: false,
            loading: true,
        };
    },
    methods: {
        //A função pega a lista e filtra o usuário pelo ID e depois seta para preencher como padrão no formulário
        async getData() {
            const res = await axios.get('https://www.unigran.br/campogrande/api/index.php/teste/tecnico')
            this.itemData = res.data.filter(item => item.id == this.$route.params.id)
            this.form.nome = this.itemData[0].nome
            this.form.email = this.itemData[0].email
            this.form.data_nascimento = this.itemData[0].data_nascimento
            this.form.cpf = this.itemData[0].cpf
            this.form.telefone = this.itemData[0].telefone
            this.form.genero = this.itemData[0].genero
            this.form.seu_diferencial = this.itemData[0].seu_diferencial

            this.loading = false
        },
        async submitForm() {
            //valida se o E-mail cadastrado é válido, com o @ e o .com, também valida se o cpf e o telefone foram escritos apenas com números
            if (!this.validateEmail(this.form.email) || !this.validateNumber(this.form.cpf)) {
                alert('Dados inválidos.')
                this.hideModal()
            } else {
                const response = await axios.put('https://www.unigran.br/campogrande/api/index.php/teste/tecnico/' + this.$route.params.id, {
                    nome: this.form.nome,
                    cpf: this.formatarCPF(this.form.cpf),
                    telefone: this.formatarTelefone(this.form.telefone),
                    email: this.form.email,
                    data_nascimento: this.form.data_nascimento,
                    genero: this.form.genero,
                    seu_diferencial: this.form.seu_diferencial
                })
                if (response.data == "Erro") {
                    alert("Ocorreu um erro durante a operação")
                } else {
                    this.hideModal()
                    alert("Usuário editado com sucesso!")
                    this.$router.push('/list')
                }
            }
        },
        openModal() {
            this.showModal = true;
        },
        hideModal() {
            this.showModal = false;
        },
        //os testes de validação utilizam Regex pra poder fazer as verificações, utilizando os padrões e a função .test() para comparações e .replace() para substituições
        validateEmail(email) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        validateNumber(value) {
            let numericReg = /^[0-9]+$/;
            if (!numericReg.test(value)) {
                return false;
            }
            return true;
        },
        formatarTelefone(phone) {
            phone = phone.replace(/[^\d]/g, "");
            return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3");
        },
        formatarCPF(cpf) {
            cpf = cpf.replace(/[^\d]/g, "");
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        },
    },
    created() {
        this.getData()
    }

}
</script>