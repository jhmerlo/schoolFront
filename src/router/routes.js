
const routes = [
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Login.vue'),
        name: 'LoginPage'
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        name: 'Dashboard'
      },
      {
        path: 'atividade/:codigo',
        component: () => import('pages/Atividade.vue'),
        props: true
      },
      {
        path: 'prof',
        component: () => import('pages/ProfPage.vue'),
        name: 'ProfPage'
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
