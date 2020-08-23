<template>
  <q-page>
    <p :class="this.$q.dark.isActive ? 'text-white' : 'text-secondary'" class="q-px-md q-pt-md text-body2">Bons estudos, <strong>{{username}}</strong>!</p>
    <div class="row q-my-md">
      <div class="col-md-4 col-sm-6 col-xs-12 q-pa-sm">
        <Card label="Financeiro" icon='money'>
          <q-list separator>
            <q-expansion-item
              :header-class="payment.pago ? 'text-green' : 'text-red'"
              :label="payment.servico"
              icon="attach_money"
              :caption="payment.pago ? 'Pago' : 'Pendente'"
              v-for="(payment, index) in payments"
              class="q-pa-sm"
              v-bind:key="index">
              <q-card>
                <q-card-section class="text-caption">
                  <div class="row items-center">
                    <div class="col-md-7 col-sm-12 col-xs-12">
                      <p class="q-my-sm"><strong>Valor:</strong> R${{payment.valor}},00</p>
                      <p v-if="payment.pago"><strong>Data da transação: </strong> {{payment.data}}</p>
                    </div>
                    <div class="col-md-5 col-sm-12 col-xs-12">
                      <q-card-actions class="q-pa-none" v-if="payment.pago">
                        <q-btn color="secondary" size="sm" label="Visualizar Recibo" />
                      </q-card-actions>
                      <q-card-actions class="q-pa-none" v-else>
                        <q-btn color="secondary" size="sm" label="Gerar 2° via do boleto" />
                      </q-card-actions>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </Card>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12 q-pa-sm">
        <Card label="Minhas Atividades" icon="assignment">
          <q-list separator>
            <q-item
            clickable
            :disable="atividade.done ? true : false"
            v-ripple
            v-for="(atividade, index) in atividades"
            v-bind:key="index"
            :to="'/atividade/' + atividade.codigo">
              <q-item-section>
                {{atividade.assunto}}
                <q-item-label caption v-if="atividade.done">Feito</q-item-label>
                <q-item-label caption class="text-red" v-else>Não realizado</q-item-label>
              </q-item-section>
              <q-item-section class="text-grey">{{atividade.codigo}}</q-item-section>
              <q-item-section avatar>
                <q-icon :color="atividade.done ? 'green' : ''" :name="atividade.done ? 'assignment_turned_in' : 'keyboard_arrow_right'"/>
              </q-item-section>
            </q-item>
          </q-list>
        </Card>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12 q-pa-sm">
        <Card label="Vídeo recomendado" icon="movie">
          <iframe width="100%" height="224px" class="q-mt-md" src="https://www.youtube.com/embed/NH6msPAScUE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <q-item-label caption>Análise de um filtro passa baixa RC</q-item-label>
        </Card>
      </div>
    </div>
  </q-page>
</template>

<script>
import Card from '../components/Card'
export default {
  name: 'PageIndex',
  components: {
    Card
  },
  data () {
    return {
      payments: [],
      atividades: []
    }
  },
  computed: {
    username () {
      const user = this.$store.getters['MainStore/getUser']
      return user ? user.nome : null
    }
  },
  mounted () {
    this.payments = this.$store.getters['MainStore/getPayments']
    this.atividades = this.$store.getters['MainStore/getAtividades']
  }
}
</script>
