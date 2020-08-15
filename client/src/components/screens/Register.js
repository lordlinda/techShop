import React,{useState} from 'react'
import {toast} from 'react-toastify'
import {connect} from 'react-redux'
import {Redirect } from 'react-router-dom'
import Container from '../Container.js'
import FormInput from '../input/FormInput.js'
import Button from '../buttons/button.js'
import {register} from '../../data/reducers/auth.js'
import './loading.css'

const Register=({register,isAuth,isLoading,user})=>{
	const [data,setData]=useState({
		name:'',
		email:'',
		password:'',
		confirmPassword:''
	})

	const {name,email,password,confirmPassword}=data

	const handleChange=(name)=>e=>{
		setData({...data,[name]:e.target.value})
	}
	const onSubmit=async(e)=>{
		e.preventDefault();
		//console.log('submit')
		if(password!==confirmPassword){
			toast.error('Passwords dont match')
		}else{
			//console.log(props)
			//register({name,email,password})
			register({name,email,password})
		}
	}
	console.log(isLoading,user)
	if(isAuth && user){
		const {name,role}=user
		toast.success(`welcome ${name}`)
		if(role === 0) return <Redirect to='/dashboard/user'/>
		if(role === 1) return <Redirect to='/dashboard/admin'/>
	}
	return (
		<Container>
		<form className='bg-white rounded-lg overflow-hidden shadow-2xl p-5 my-16 md:w-1/2 lg:w-1/3 mx-auto flex flex-col' onSubmit={onSubmit}>
		<h2 className='font-bold text-3xl text-center mb-5'>Register</h2>
		<FormInput
		title='Name'
		placeholder='Congar'
		value={name}
		handleChange={handleChange('name')}
		type='text'
		/>
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
		<FormInput
		title='Confirm Password'
		placeholder='***********'
		value={confirmPassword}
		handleChange={handleChange('confirmPassword')}
		type='password'
		/>
		{isLoading &&<div id='loading' className='self-center mb-3' /> }
		<Button
		type='submit'
		title='SignUp'
		moreStyle='bg-primary text-white w-full mb-3'
		/>
		<Button 
		isButton={false}
		title='already have an account ?'
		href='/login'
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

export default connect(mapStateToProps,{register})(Register)