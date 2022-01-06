import React, { useEffect, useState } from 'react';


const App = () => {

	const [loading, setLoading] = useState(true)

	const [users, setUsers] = useState<any>([])

	useEffect(() => {
		var usuariosList = JSON.parse(localStorage.getItem("usuarios")!)
		if(usuariosList){
			setUsers(usuariosList)
		}
		window.addEventListener('storage', () => {
			setUsers(JSON.parse(localStorage.getItem("usuarios")!) || [])
		})
	}, [])


	const add = () => {
		const cloneUsers = users
		cloneUsers.push({
			name: 'samir'
		})
		localStorage.setItem("usuarios", JSON.stringify(cloneUsers));
		setLoading(!loading)
	}



	return (
		<div>
			<button onClick={add}>asd</button>
			<div>
				{
					users.map((data: any, key: number) =>
						<p key={key}>{data.name}</p>
					)
				}
			</div>
		</div>

	);
}

export default App;
