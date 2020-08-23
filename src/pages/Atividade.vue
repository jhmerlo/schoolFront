<template>
  <q-page>
      <q-breadcrumbs separator="---" class="text-secondary q-pa-md cursor-pointer" active-color="primary">
        <q-breadcrumbs-el :to="{ name: 'Dashboard' }" icon="home" />
        <q-breadcrumbs-el :label="atividade.disciplina" icon="view_module" />
        <q-breadcrumbs-el :label="atividade.assunto" icon="view_list" />
        <q-breadcrumbs-el :label="atividade.codigo" icon="assignment" />
    </q-breadcrumbs>
    <div class="q-pa-md">
        <p class="text-body1"><strong>{{atividade.codigo}}. </strong>{{atividade.pergunta}}</p>
        <form @submit.prevent="handleSubmit">
            <q-option-group
            :options="atividade.options"
            label="Alternativas"
            type="radio"
            v-model="resposta"
            />
            <q-btn class="q-mt-md q-ml-sm" color="secondary" type="submit" icon-right="send" label="Enviar" :disable="resposta != '' ? false: true"/>
        </form>
    </div>
  </q-page>
</template>

<script>
import { Notify } from 'quasar'
export default {
  name: 'Atividade',
  props: ['codigo'],
  data () {
    return {
      atividade: {},
      resposta: ''
    }
  },
  methods: {
    handleSubmit () {
      this.$q.loading.show({
        message: 'Aguarde, estamos processando a sua resposta.',
        spinnerColor: 'secondary'
      })
      this.atividade.done = true
      setTimeout(() => {
        Notify.create({
          message: 'Resposta enviada com sucesso.',
          type: 'positive'
        })
        this.$q.loading.hide()
        this.$router.push({ name: 'Dashboard' })
      }, 3000)
    }
  },
  mounted () {
    const atividades = this.$store.getters['MainStore/getAtividades']
    this.atividade = atividades.find((att, index) =>
      att.codigo === this.codigo
    )
  }
}
</script>
