import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
    	path: '/requirementManagement',
    	name: 'requirementManagement',
    	component: require('views/requirement/requirementManagement.vue')
    },
    //增加需求
     {
      path: '/addRequirement',
      name: 'addRequirement',
      component: require('views/requirement/addRequirement.vue')
    },
    //查看详情
     {
      path: '/viewRequirement',
      name: 'viewRequirement',
      component: require('views/requirement/viewRequirement.vue')
    },
    //属性管理
     {
      path: '/propertyManagement',
      name: 'propertyManagement',
      component: require('views/requirement/propertyManagement.vue')
    },
    {
      path: '/versionList',
      name: 'versionList',
      component: require('views/versionManagement/versionList.vue')
    },{
      path: '/versionPropertyManagement',
      name: 'versionPropertyManagement',
      component: require('views/versionManagement/versionPropertyManagement.vue')
    },{
      path: '/versionManagement',
      name: 'versionManagement',
      component: require('views/versionManagement/versionManagement.vue')
    }
  ]
})
