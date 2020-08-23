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
          <div class="row justify-center">
            <div class="col-12">
              <q-item-label class="q-pt-md" :caption="this.$q.dark.isActive ? false : true">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget hendrerit sapien. Pellentesque enim tellus, blandit eget sapien sodales, bibendum maximus nunc. Maecenas ac rhoncus mi.</q-item-label>
              <video-player
              style="width: 100%"
              class="block q-mt-md"
              :options="playerOptions"
              @play.once="alertPlay"
              @ended="onPlayerEnded"
              :playsinline="true"
              />
            </div>
          </div>
          <q-checkbox class="q-mt-md" v-model="watched" disable label="Completo" color="teal" />
        </Card>
      </div>
    </div>
  </q-page>
</template>

<script>
import 'video.js/dist/video-js.css'
import Card from '../components/Card'
import { videoPlayer } from 'vue-video-player'
import { Notify } from 'quasar'

export default {
  name: 'PageIndex',
  components: {
    Card,
    videoPlayer
  },
  data () {
    return {
      payments: [],
      atividades: [],
      playerOptions: {
        sources: [{
          type: 'video/mp4',
          src: 'assets/video.mp4'
        }],
        fluid: true
      },
      watched: false,
      seamless: false
    }
  },
  methods: {
    onPlayerEnded () {
      this.watched = true
    },
    alertPlay () {
      Notify.create({
        message: 'Você está assistindo a: Terra Girando',
        type: 'positive'
      })
    }
  },
  computed: {
    username () {
      const user = this.$store.getters['MainStore/getUser']
      return user ? user.nome : null
    }
  },
  mounted () {
    const user = this.$store.getters['MainStore/getUser']
    if (user.type !== 'student') {
      this.$router.back()
    }
    this.payments = this.$store.getters['MainStore/getPayments']
    this.atividades = this.$store.getters['MainStore/getAtividades']
  }
}
</script>
