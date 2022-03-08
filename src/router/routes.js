
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', name:'front',component: () => import('pages/front'), meta:'an' },
      { path: 'home', name:'home',component: () => import('pages/home'), meta:'ay' },
      { path: 'alerts', name:'alerts',component: () => import('pages/alerts'), meta:'ay' },
      { path: 'me',component: () => import('pages/me/index'), meta:'ay',
        children:[
          { path: '', name:'me',component: () => import('pages/me/account'), meta:'ay' },
          { path: 'account', name:'account',component: () => import('pages/me/account'), meta:'ay' },
          { path: 'profile', name:'profile',component: () => import('pages/me/profile'), meta:'ay' },
          { path: 'events', name:'events',component: () => import('pages/me/events'), meta:'ay' },
          { path: 'wallet', name:'wallet',component: () => import('pages/me/wallet'), meta:'ay' },
        ]
      },
      { path: 'about', name:'about', component: () => import('pages/about.vue'), meta:'adm'},
      { path: 'help', name:'help', component: () => import('pages/help.vue'), meta:'adm'},
      { path: 'privacy', name:'privacy', component: () => import('pages/privacy.vue'), meta:'adm'},
      { path: 'terms', name:'terms', component: () => import('pages/terms.vue'), meta:'adm'},
      { path: 'login', name:'login',component: () => import('pages/login.vue'), meta:'an' },
      { path: 'signup', name:'signup',component: () => import('pages/signup.vue'), meta:'an' },
      { path: 'forgot', name:'forgot',component: () => import('pages/forgot.vue'), meta:'an' },
      { path: 'u/:id', name:'user',component: () => import('pages/user.vue'), meta:'adm' },
      { path: 'e/:id', name:'event',component: () => import('pages/event.vue'), meta:'adm' },
      { path: '*', name:'error',component: () => import('pages/Error404.vue'), meta:'adm' }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
