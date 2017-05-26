/**
 *	使用VUEX来存储部分用户数据
 * 	可全局访问
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user : {
  	name : "",
  	token : localStorage.getItem("token")
  }
}

const mutations = { 
	login : function(token){
		state.user.token = token
	},
	logout : function(){
		state.user.token = ""
	}
}

export default new Vuex.Store({
  state,
  mutations
})