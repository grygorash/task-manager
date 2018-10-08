import React from 'react';

const DeveloperCreate = props => {
	const {devNameValue, devEmailValue, selectedBoard, onAddDev, onDevNameChange, onDevEmailChange} = props;
	return (
		<form className="developer-form" onSubmit={e => onAddDev(e, {
			id: +new Date(),
			boardId: selectedBoard.id,
			name: devNameValue,
			email: devEmailValue,
		})}>
			<h3>Invite<span>Developer</span></h3>
			<input type="text"
			       value={devNameValue}
			       placeholder="Enter Name Of Developer"
			       onChange={({target}) => onDevNameChange(target.value)} />
			<input type="text"
			       value={devEmailValue}
			       placeholder="Enter Developer Email"
			       onChange={({target}) => onDevEmailChange(target.value)} />
			<button className="btn">Invite<span>Developer</span></button>
		</form>	);
};

export default DeveloperCreate;