import React from 'react'
import {Link} from 'react-router-dom'
/*we will have to type Link and button
if isButton it will be normal button else it will Link
*/

/*
props
isButton default true
action => onClick for button
href =>destination for Link
moreStyle for add more style to default
 */
const Button=({isButton=true,title='',action,href,moreStyle, type='button'})=>{
	const style =`font-bold rounded-md px-3 py-2 text-base cursor-pointer animate focus:outline-none ${moreStyle}`
	return (
		<div>
		{isButton ?
			(<button className={style} type={type} onClick={action}>{title}</button>):
				(<Link to={href} className={style}>{title}</Link>)
		}
		</div>

		)
}

export default Button