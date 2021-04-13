import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	flag: 0,
	state:{
		kind: '',		//用户类型,'0'是企业用户，‘1’是个人用户
		id: 0,			//登录成功后返回的ID	
		enterpriseInfo:{
			enterpriseContact: [],		//企业联系人列表
			enterpriseId: 0,		//企业ID
			enterpriseLogo: '',			//企业头像
			enterpriseName: '',			//企业名称
			enterprisePhoNum: '',		//企业绑定手机号
			enterpriseUsername: '',		//企业账号
			parkId: 0,		//绑定园区的ID
			isBindPark:false,		//默认未绑定园区
			parkStatus:2		,//0:待审核，1：入园，2：未入园
			parkName: ''
		},
		userInfo:{
			contactName: '',			//个人名称
			phoneNum: '',		//个人绑定手机号
			enterpriseId: 0,		//所在企业ID
			enterpriseLogo: '',			//企业头像
			contactHead:'',
			enterpriseName:'',		//企业名称
			enterpriseUsername: '',		//企业账号
			parkId: 0,		//绑定园区的ID
			isBindPark:false		//默认未绑定园区
		}
	},
	mutations:{
		//登录
		setId(state, val){
			state.id = val
		},
		setKind(state, val){
			state.kind = val
		},
		setEnterpriseInfo(state, info){
			state.enterpriseInfo = info
		},
		setUserInfo(state, info){
			state.userInfo = info
		}
	},
	actions:{
		
	}
})

export default store