import React from 'react';
import { withRouter } from 'react-router';
import { Col, Row } from 'reactstrap';

import '../TaskCreate/TaskCreate.css';

const DeveloperCreate = props => {
	const {values, validation, selectedBoard, onAddDev, onDevNameChange, onDevEmailChange} = props;
	return (
		<form className="developer-form" onSubmit={e => onAddDev(e, {
			id: +new Date(),
			boardId: selectedBoard.id,
			name: values.devName,
			email: values.devEmail,
		})}>
			<Row>
				<Col md="12">
					<h3>Invite<span>Developer</span></h3>
				</Col>
				<Col md="12">
					<div className="validation">
						<input
							type="text"
							value={values.devName}
							className={values.devName.length >= 3 ? 'validation-success' : ''}
							placeholder="Enter Name Of Developer"
							onChange={({target}) => onDevNameChange(target.value)} />
						<p
							className={validation.devName || validation.devName === null ? 'error-field' : 'error-field not-valid'}>
							more than 3 symbols
						</p>
					</div>
				</Col>
				<Col md="12">
					<div className="validation">
						<input
							type="text"
							value={values.devEmail}
							className={values.devEmail.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/) ? 'validation-success' : ''}
							placeholder="Enter Developer Email"
							onChange={({target}) => onDevEmailChange(target.value)} />
						<p
							className={validation.devEmail || validation.devEmail === null ? 'error-field' : 'error-field not-valid'}>
							enter correct email
						</p>
					</div>
				</Col>
				<Col md="6">
					<button
						className={validation.devName === true &&
						validation.devEmail === true ?
							'validation-success btn' : 'btn'}>
						Invite<span>Developer</span>
					</button>
				</Col>
				<Col md="6">
					<button
						className="btn"
						onClick={() => props.history.push(`/board/${selectedBoard.id}`)}>
						Cancel
					</button>
				</Col>
			</Row>
		</form>);
};

export default withRouter(DeveloperCreate);