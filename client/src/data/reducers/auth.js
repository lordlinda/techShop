import axios from 'axios'
import {toast} from 'react-toastify'

import setAuthToken from '../../components/helpers/setAuthToken.js'

//Types
const REGISTER_SUCCESS='REGISTER_SUCCESS'
const REGISTER_FAIL='REGISTER_FAIL'
const LOGIN_SUCCESS='LOGIN_SUCCESS'
const LOGIN_FAIL='LOGIN_FAIL'
const USER_LOADED='USER_LOADED'
const AUTH_ERROR='AUTH_ERROR'
const LOGOUT='LOGOUT'
const SET_LOADING='SET_LOADING'

//Inital state
const initialState={
	token:localStorage.getItem('token'),
	isAuthenticated:null,
	loading:true,
	user:null
}
//Reducers
export default function(state=initialState,action){
	const {type,payload}=action
	switch(type){
		case USER_LOADED:
		return {
			...state,
			user:payload,
			isAuthenticated:true,
			loading:false
		}
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
		//set token in localstorage
		localStorage.setItem('token',payload.token)
		return {
			...state,
			...payload,
			isAuthenticated:true,
			loading:false
		}
		case SET_LOADING:
		 return {
		 	...state,
		 	loading:true
		 }
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGOUT:
		case LOGIN_FAIL:
		//remove token in localstorage
		localStorage.removeItem('token')
		return {
			...state,
			token:null,
			isAuthenticated:false,
			loading:false
		}

		default:
		return state
	}
}

//Actions
export const loadUser=()=>async(dispatch)=>{
	if(localStorage.token){
		setAuthToken(localStorage.token)
	}
	await axios.get('http://localhost:5000/api/user')
				.then(res=>{
					dispatch({
						type:USER_LOADED,
						payload:res.data
					})
				}).catch(err=>{
                 // console.log(err.response)
                  dispatch({
                  	type:AUTH_ERROR
                  })
				})
}

export const register=({name,email,password})=>async (dispatch)=>{
	//Config header for axios
	const config={
		headers:{
		'Content-Type':'application/json'
	  }
	}
	//set body
	const body =JSON.stringify({name,email,password})
          dispatch({
               	type:SET_LOADING
               })
	await axios.post('http://localhost:5000/api/user/register',body,config)
			.then(res=>{
				//console.log(res.data)
				dispatch({
					type:REGISTER_SUCCESS,
					payload:res.data
				})
				dispatch(loadUser())

			}).catch(err=>{
               const errors= err.response.data.errors
               errors.forEach(error=>toast.error(error.msg))
               dispatch({
               	type:REGISTER_FAIL
               })
			})
}

export const login=({email,password})=>async (dispatch)=>{
	//Config header for axios
	const config={
		headers:{
		'Content-Type':'application/json'
	  }
	}
	//set body
	const body =JSON.stringify({email,password})
          dispatch({
               	type:SET_LOADING
               })
	await axios.post('http://localhost:5000/api/user/login',body,config)
			.then(res=>{
				//console.log(res.data)
				dispatch({
					type:LOGIN_SUCCESS,
					payload:res.data
				})
				dispatch(loadUser())

			}).catch(err=>{
               const errors= err.response.data.errors
               errors.forEach(error=>toast.error(error.msg))
               dispatch({
               	type:LOGIN_FAIL
               })
			})
}

export const logout=()=>dispatch=>{
	dispatch({
		type:LOGOUT
	})
}