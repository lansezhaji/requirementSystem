import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user : {
  	name : "tanjunyi",
  	tocken : "w2dEd8J4k~.u"
  }
}

const mutations = { 
	logout : function(){
		state.user.tocken = ""
	}
}

export default new Vuex.Store({
  state,
  mutations
})