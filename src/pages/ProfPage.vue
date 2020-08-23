<template>
  <q-page>
    <div class="q-ma-md">
      <h6 class="q-ma-none text-secondary">Painel do Professor</h6>
      <q-item-label caption>Painel destinado aos professores para atribuição de atividades </q-item-label>
    </div>
    <div class="row">
      <div class="col-4 q-pa-sm">
        <Card label="Adicionar tarefas" icon="assignment">
          <form ref="formAddAtt" @submit.prevent="handleSubmit">
            <q-input label="Disciplina" v-model="formData.disciplina" />
            <q-input label="Código" type="number" v-model="formData.codigo" />
            <q-input label="Assunto" v-model="formData.assunto" />
            <q-input label="Pergunta" v-model="formData.pergunta" />
            <q-btn type="submit" class="q-mt-md" color="secondary" label="Enviar" icon-right="send" />
          </form>
        </Card>
      </div>
    </div>
  </q-page>
</template>

<script>
import Card from '../components/Card'
import { Notify } from 'quasar'

export default {
  name: 'ProfPage',
  components: {
    Card
  },
  data () {
    return {
      formData: {
        disciplina: '',
        done: false,
        codigo: '',
        assunto: '',
        pergunta: ''
      },
      atividades: []
    }
  },
  methods: {
    handleSubmit () {
      const formData = this.formData
      this.$q.loading.show({
        message: 'Adicionando tarefa...',
        spinnerColor: 'secondary'
      })

      setTimeout(() => {
        this.$q.loading.hide()
        Notify.create({
          message: 'Tarefa enviada com sucesso!',
          type: 'positive'
        })
        this.atividades.push({
          disciplina: formData.disciplina,
          done: false,
          codigo: formData.codigo,
          assunto: formData.assunto,
          pergunta: formData.pergunta
        })
        this.formData.disciplina = ''
        this.formData.codigo = ''
        this.formData.assunto = ''
        this.formData.pergunta = ''
        this.$refs.formAddAtt.reset()
      }, 3000)
    }
  },
  mounted () {
    const user = this.$store.getters['MainStore/getUser']
    if (user.type !== 'prof') {
      this.$router.back()
    }
    this.atividades = this.$store.getters['MainStore/getAtividades']
  }
}
</script>
