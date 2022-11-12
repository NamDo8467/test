import React from "react"
import { useHistory } from "react-router-dom"
import userIcon from "../images/userIcon.png"
import axios from "axios"
function Logout(props) {
	let history = useHistory()
	// const URL = "https://whispering-plains-27657.herokuapp.com/logout"
	const URL = "http://localhost:5500/logout"
	const logout = async e => {
		e.preventDefault()
		const result = await axios.get(URL, {
			withCredentials: true
		})

		document.cookie = "jwtAuth=; max-age=0; path=/"

		history.push("/")
	}

	return (
		<div className='logout'>
			<div className='logout-user-info'>
				<img className='logout-user-icon' src={userIcon} alt='user icon' />
				<p>{localStorage.getItem("name")}</p>
			</div>
			<div className='logout-link'>
				<a href='/' onClick={e => logout(e)}>
					Sign out of Netflix
				</a>
			</div>
		</div>
	)
}

export default Logout
