const Home = r => require.ensure([], r => (require('pages/Home')), 'Home')
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    name: 'home',
    path: '/home',
    component: Home
  }
]
export default routes
