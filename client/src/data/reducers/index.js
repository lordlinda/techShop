//import root reducer to combine all reducers in app
import {combineReducers} from 'redux'
import auth from './auth.js'

export  default combineReducers({
	auth
})