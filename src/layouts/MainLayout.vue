<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="text-secondary text-weight-bold">
          ESD
        </q-toolbar-title>
        <q-btn flat icon-right="keyboard_arrow_down">
          <q-avatar color="secondary" size="md" text-color="white">{{initialLetter}}</q-avatar>
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <q-list separator padding>
                  <q-item-label header class="q-py-xs">Menu</q-item-label>
                  <q-item @click="dialog = !dialog" clickable dense v-ripple>
                    <q-item-section :class="dark ? 'text-primary' : 'text-secondary'" class="text-weight-bold">Configurações</q-item-section>
                    <q-item-section avatar>
                      <q-icon color="grey" size="20px" name="settings" />
                    </q-item-section>
                  </q-item>
                  <q-item class="q-pr-xs" @click="dark = !dark" clickable dense v-ripple>
                    <q-item-section :class="dark ? 'text-primary' : 'text-secondary'" class="text-weight-bold">Modo Escuro</q-item-section>
                    <q-item-section avatar>
                      <q-toggle v-model="dark" size="xs"/>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar color="secondary" size="60px" text-color="white">{{initialLetter}}</q-avatar>

                <div style="font-size: 0.9em;" class="text-subtitle2 text-weight-light text-center q-mt-sm q-mb-xs">{{username}}</div>

                <q-btn
                  color="primary"
                  label="Sair"
                  push
                  size="sm"
                  @click="logOut"
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <transition
        appear
        enter-active-class="animated fadeInRight"
        leave-active-class="animated fadeOutLeft"
        :duration='200'>
        <router-view />
      </transition>
    </q-page-container>

    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-bar class="bg-primary text-secondary text-weight-bold text-caption">
          CONFIGURAÇÕES
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Fechar</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <q-item-label header class="q-pa-none">Perfil</q-item-label>
          <div class="row">
            <div class="col">
              <form @submit.prevent="handleEdit">
                <q-input name="nome" @input="hidden = false" v-model="name" label="Nome">
                  <template v-slot:before>
                    <q-avatar color="secondary" class="q-mt-sm" size="50px" text-color="white">{{initialLetter}}</q-avatar>
                  </template>
                </q-input>
                <q-card-actions align="right">
                  <q-btn :class="hidden ? 'hidden' : ' '" type="submit" flat label="Salvar"/>
                </q-card-actions>
              </form>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-item-label header class="q-pa-none">Sistema</q-item-label>
          <span class="text-caption">Área destinada para que sejam reportados bugs/erros no sistema.</span>
          <form ref="reportForm" @submit.prevent="handleReportError">
            <q-select
              label="Motivo do contato"
              v-model="contato.motivo"
              :options="options"
            />
            <q-input
              label="Mensagem"
              type="textarea"
              v-model="contato.mensagem"
            />
            <q-card-actions align="right">
              <q-btn
                type="submit"
                flat rounded
                color="secondary"
                label="Enviar"
                icon="send"
              />
            </q-card-actions>
          </form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { Notify } from 'quasar'

export default {
  name: 'MainLayout',
  data () {
    return {
      dark: false,
      dialog: false,
      hidden: true,
      name: '',
      options: [
        {
          label: 'Bug/Erro',
          value: 'Bug/Erro'
        },
        {
          label: 'Sugestão',
          value: 'Sugestão'
        },
        {
          label: 'Outro',
          value: 'Outro'
        }
      ],
      contato: {
        motivo: '',
        mensagem: ''
      }
    }
  },
  methods: {
    async handleEdit () {
      const user = {
        nome: this.name
      }
      if (this.name.trim() !== '') {
        await this.$store.dispatch('MainStore/loginUser', user)
        this.hidden = !this.hidden
        Notify.create({
          message: 'Nome editado com sucesso!',
          type: 'positive'
        })
      } else {
        Notify.create({
          message: 'Ocorreu um erro ao editar o nome do usuário.',
          type: 'negative'
        })
      }
    },
    handleReportError () {
      if (this.contato.mensagem.trim() !== '' && this.contato.motivo !== '') {
        this.contato.motivo = ''
        this.contato.mensagem = ''
        this.$refs.reportForm.reset()
        Notify.create({
          message: 'Contato enviado com sucesso!',
          type: 'positive'
        })
      } else {
        Notify.create({
          message: 'Ocorreu um erro ao enviar contato.',
          type: 'negative'
        })
      }
    },
    async logOut () {
      this.$q.loading.show({
        message: 'Desconectando...',
        spinnerColor: 'secondary'
      })

      setTimeout(() => {
        this.$store.dispatch('MainStore/logoutUser')
        this.$router.push({ name: 'LoginPage' })
        this.$q.loading.hide()
      }, 2000)
    }
  },
  watch: {
    dark: function () {
      this.$q.dark.toggle()
    }
  },
  computed: {
    initialLetter () {
      const name = this.username
      return name ? name.slice(0, 1).toUpperCase() : null
    },
    username () {
      const user = this.$store.getters['MainStore/getUser']
      return user ? user.nome : null
    }
  },
  mounted () {
    if (this.$store.getters['MainStore/getUser'] == null) {
      this.$router.push({ name: 'LoginPage' })
    } else {
      this.name = this.username
    }
  }
}
</script>
