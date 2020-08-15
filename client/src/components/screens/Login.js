import React,{useState} from 'react'
import {toast} from 'react-toastify'
import {connect} from 'react-redux'
import {Redirect } from 'react-router-dom'
import Container from '../Container.js'
import FormInput from '../input/FormInput.js'
import Button from '../buttons/button.js'
import {login} from '../../data/reducers/auth.js'
import './loading.css'

const Login=({login,isAuth,isLoading,user})=>{
	const [data,setData]=useState({
		email:'',
		password:'',
	})

	const {email,password}=data

	const handleChange=(name)=>e=>{
		setData({...data,[name]:e.target.value})
	}
	const onSubmit=async(e)=>{
		e.preventDefault();
		login({email,password})
	}
	//console.log(isLoading,user)
	if(isAuth && user){
		const {name,role}=user
		toast.success(`welcome ${name}`)
		if(role === 0) return <Redirect to='/dashboard/user'/>
		if(role === 1) return <Redirect to='/dashboard/admin'/>
	}
	return (
		<Container>
		<form className='bg-white rounded-lg overflow-hidden shadow-2xl p-5 my-16 md:w-1/2 lg:w-1/3 mx-auto flex flex-col' onSubmit={onSubmit}>
		<h2 className='font-bold text-3xl text-center mb-5'>Login</h2>
		
		<FormInput
		title='Email'
		placeholder='congar@example.com'
		value={email}
		handleChange={handleChange('email')}
		type='email'
		/>
		<FormInput
		title='Password'
		placeholder='*********'
		value={password}
		handleChange={handleChange('password')}
		type='password'
		/>
		
		{isLoading &&<div id='loading' className='self-center mb-3' /> }
		<Button
		type='submit'
		title='SignIn'
		moreStyle='bg-primary text-white w-full mb-3'
		/>
		<Button 
		isButton={false}
		title='did you need a new account ?'
		href='/register'
		moreStyle='text-gray-600'
		/>
		</form>
		</Container>
		)
}
const mapStateToProps=(state)=>({
	isAuth:state.auth.isAuthenticated,
	isLoading:state.auth.loading,
	user:state.auth.user
})

export default connect(mapStateToProps,{login})(Login)