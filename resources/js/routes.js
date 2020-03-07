import Vue from 'vue'
import Router from 'vue-router'

import commerces from './components/CommercesComponent'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: require('./views/Index')
		},
		{
			path: '/commerces',
			name: 'commerces',
			component: commerces
		},
		{
			path: ':commerce_slug',
			name: 'commerce',
			qery:'commerce_slug',
			component: require('./views/Commerce'),//show
			props: true
		},
		/*{
			path: '/products',
			name: 'products',
			component: products
		},
		{
			path: '/promos',
			name: 'promos',
			component: promos
		},
		{
			path: '/events',
			name: 'events',
			component: events
		},*/
		{
			path: '*',
			component: require('./views/404')
		}
	],
	mode: 'history'
})