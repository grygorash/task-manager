import React from 'react';

const DeveloperCreate = props => {
	const {values, validation, selectedBoard, onAddDev, onDevNameChange, onDevEmailChange} = props;
	return (
		<form className="developer-form" onSubmit={e => onAddDev(e, {
			id: +new Date(),
			boardId: selectedBoard.id,
			name: values.devNameValue,
			email: values.devEmailValue,
		})}>
			<h3>Invite<span>Developer</span></h3>
			<div className="validation">
				<input type="text"
				       value={values.devNameValue}
				       className={values.devNameValue.length >= 3 ? 'validation-success' : ''}
				       placeholder="Enter Name Of Developer"
				       onChange={({target}) => onDevNameChange(target.value)} />
				<p
					className={validation.devNameValue || validation.devNameValue === null ? 'error-field' : 'error-field not-valid'}>
					more than 3 symbols
				</p>
			</div>
			<div className="validation">
				<input type="text"
				       value={values.devEmailValue}
				       className={values.devEmailValue.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) ? 'validation-success' : ''}
				       placeholder="Enter Developer Email"
				       onChange={({target}) => onDevEmailChange(target.value)} />
				<p
					className={validation.devEmailValue || validation.devEmailValue === null ? 'error-field' : 'error-field not-valid'}>
					enter correct email
				</p>
			</div>

			<button
				className={validation.devNameValue === true &&
				validation.devEmailValue === true ?
					'validation-success btn' : 'btn'}>
				Invite<span>Developer</span>
			</button>
		</form>);
};

export default DeveloperCreate;