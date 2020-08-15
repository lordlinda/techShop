import React from 'react'

const FormInput=({title,type,placeholder,value,handleChange})=>{
	return (
		<div>
		<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
		htmlFor={`form-${title}`}>
		{title}
		</label>
		<input 
		className='appearnce-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded
		py-3 mb-3 leading-tight focus:outline-none focus:bg-white'
		id={`form-${title}`}
		type={type}
		placeholder={placeholder}
		onChange={handleChange}
		value={value}
		/>
		</div>
		)
}


export default FormInput