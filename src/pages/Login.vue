<template>
  <q-page class="full-height full-width">
      <div class="row fixed-full full-height items-center justify-center q-pa-md">
          <div class="col-md-4 col-sm-6 col-xs-12 shadow-5 rounded-borders">
              <q-bar class="bg-primary text-secondary text-weight-bold q-py-lg text-caption">
                LOGIN
              </q-bar>
              <form @submit.prevent="onLogin" class="q-px-md q-py-lg">
                <q-input color="primary" v-model="email" label="Email">
                    <template v-slot:append>
                    <q-icon name="person" />
                    </template>
                </q-input>
                <q-input v-model="pass" :type="isPwd ? 'password' : 'text'" label="Senha">
                    <template v-slot:append>
                    <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                    />
                    </template>
                </q-input>
                <q-btn class="q-mt-lg" type="submit" label="Login" color="primary" text-color="secondary" icon-right="send"/>
              </form>
          </div>
      </div>
  </q-page>
</template>

<script>
import { Notify } from 'quasar'

export default {
  name: 'LoginPage',
  data () {
    return {
      email: '',
      pass: '',
      isPwd: true
    }
  },
  methods: {
    async onLogin () {
      //  apenas simulando um login que na verdade de login
      //  não tem nada
      if (this.email === 'jhmerlo@outlook.com' && this.pass === '12345') {
        const user = {
          nome: 'José Henrique',
          type: 'student'
        }
        await this.$store.dispatch('MainStore/loginUser', user)
        this.showLoading('Dashboard', false)
      } else if (this.email === 'prof@prof.com' && this.pass === '12345') {
        const user = {
          nome: 'Professor',
          type: 'prof'
        }
        await this.$store.dispatch('MainStore/loginUser', user)
        this.showLoading('ProfPage', false)
      } else {
        this.showLoading('', true)
      }
    },
    showLoading (path, error) {
      if (!error) {
        this.$q.loading.show({
          message: 'Aguarde, estamos processando as suas credenciais.',
          spinnerColor: 'secondary'
        })
        this.timer = setTimeout(() => {
          this.$q.loading.hide()
          this.$router.push({ name: path })
          this.timer = 0
        }, 3000)
      } else {
        this.$q.loading.show({
          message: 'Aguarde, estamos processando as suas credenciais.',
          spinnerColor: 'secondary'
        })
        this.timer = setTimeout(() => {
          this.$q.loading.hide()
          Notify.create({
            message: 'Login ou senha incorretos',
            type: 'negative'
          })
          this.timer = 0
        }, 3000)
      }
    }
  }
}
</script>
