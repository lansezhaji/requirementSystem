/**
 *	使用VUEX来存储部分用户数据
 * 	可全局访问
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user : {
  	name : "tanjunyi",
  	tocken : "majun@danlu.com"
  }
}

const mutations = { 
	login : function(name){
		state.user.tocken = name
	},
	logout : function(){
		state.user.tocken = ""
	}
}

export default new Vuex.Store({
  state,
  mutations
})