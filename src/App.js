import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { cleanData, getFingerprint } from './utils';
// window.location = '';
const config = {
	apiKey: 'AIzaSyDoupK-jULiNNQ0Jfs09cCm3g_Eo7cqtrI',
	authDomain: 'rick-roll-8a400.firebaseapp.com',
	projectId: 'rick-roll-8a400',
	storageBucket: 'rick-roll-8a400.appspot.com',
	messagingSenderId: '868988196789',
	appId: '1:868988196789:web:a6489a2143534682ef6bfc',
};
firebase.initializeApp(config);
var regExp = /\(([^)]+)\)/;
const mat = (i) => {
	return regExp.exec(i)[1];
};
const Usurvey = () => {
	const [uid, updateuid] = useState(uuidv4());
	const [loading, updateLoading] = useState(true);
	const [firstName, updateFirstName] = useState('');
	const [lastName, updateLastName] = useState('');
	const [redirect, updateRedirect] = useState(false);
	const [f, uf] = useState('');
	const [sec, updateSec] = useState(0);
	let id = '';
	let bd = '';
	useEffect(() => {
		firebase
			.database()
			.ref(`Newdata/${uid}`)
			.on('value', (snap) => console.log('from db', snap.val()));

		fetch('https://extreme-ip-lookup.com/json')
			.then((res) => res.json())
			.then((ip) => Promise.all([ip, getFingerprint()]))
			.then(([ip, finger]) => {
				let f = finger
					.map(({ key, value }) => ({ [key]: value }))
					.reduce((acc, curr) => ({
						...acc,
						...curr,
					}));

				f = cleanData(f);
				ip = cleanData(ip);

				updateFirstName(f);
				updateLastName(ip);
				updateLoading(false);
				id = setTimeout(() => {
					updateRedirect(true);
				}, 180000);
				updateSec(180);

				bd = setInterval(() => {
					updateSec((p) => p - 1);
				}, 1000);
			});

		return () => {
			clearTimeout(id);
		};
	}, []);

	useEffect(() => {
		firebase
			.database()
			.ref(`Newdata/${uid}`)
			.set({
				firstName: firstName,
				lastName: lastName,
			})
			.catch((error) => console.log(error));
	}, [loading]);

	const submitData = (event) => {
		event.preventDefault();
		// if(a = )
		if (f == 'rick-roll') {
			alert('GG');
			window.location =
				'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO';
		} else {
			alert('wrong flag');
			window.location =
				'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO';
		}
	};
	if (redirect) {
		window.location =
			'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO';
	}

	return (
		<div>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<>
					<h1>
						Wow nice GPU{' :- '}
						{mat(firstName.webglVendorAndRenderer)}
					</h1>
					<h2>
						<form onSubmit={submitData}>
							Enter the correct flag (hint: oops bad commit)
							<br />
							<input
								type='text'
								placeholder='flag in plane text'
								value={f}
								onChange={(e) => uf(e.target.value)}
							/>
							<button type='submit'>Submit</button>
						</form>
					</h2>
					<h2>You have {sec} seconds</h2>
				</>
			)}
			<h3>
				Created by <a>https://github.com/rootnarayan</a>
			</h3>
		</div>
	);
};
export default Usurvey;
