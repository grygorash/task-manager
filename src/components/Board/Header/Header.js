import React, { Fragment } from 'react';
import { Col, Row } from 'reactstrap';
import { withRouter } from 'react-router';
import moment from 'moment';

const Header = props => {
		const {selectedBoard, developers, onFilterChange, activeBoardTasks} = props;
		return (
			<Fragment>
				<Col
					md="6"
					className="board-info">
					<Row>
						<Col md="6">
							<p>Title:
								<span> {selectedBoard.boardTitle}</span>
							</p>
							<p>Start Date:
								<span> {moment(selectedBoard.startDate).format('MMM Do YYYY')}</span>
							</p>
							<p>End Date:
								<span> {selectedBoard.endDate ? moment(selectedBoard.endDate).format('MMM Do YYYY') : '-'}</span>
							</p>
						</Col>
						<Col md="6" style={activeBoardTasks.length && selectedBoard.status === 'open' ? {display: 'block'} : {display: 'none'}}>
							<label className="priority-filter">
								Filter Tasks By Priority
								<select value={selectedBoard.filterByPriority} onChange={({target}) => onFilterChange(target.value, selectedBoard.filterByDeveloper)}>
									<option value="none">None</option>
									<option value="low">Low</option>
									<option value="medium">Medium</option>
									<option value="high">High</option>
								</select>
							</label>
							<label className="developer-filter">
								Filter Tasks By Developer
								<select value={selectedBoard.filterByDeveloper} onChange={({target}) => onFilterChange(selectedBoard.filterByPriority, target.value)}>
									<option value="none">None</option>
									{developers.map((developer, i)=> <option key={i} value={developer.name}>{developer.name}</option>)}
								</select>
							</label>
						</Col>
					</Row>
				</Col>
				<Col
					md="6"
					className="create">
					<button
						className={selectedBoard.status === 'closed' ? 'd-none' : 'btn'}
						style={developers.length ? {marginRight: '20px'} : null}
						onClick={() => props.history.push(`/board/${selectedBoard.id}/create-developer`)}>
						Invite <span>Developer</span>
					</button>
					{developers.length ? (
						<button
							className={selectedBoard.status === 'closed' ? 'd-none' : 'btn'}
							onClick={() => props.history.push(`/board/${selectedBoard.id}/create-task`)}>
							Create <span>Task</span>
						</button>
					) : null}
				</Col>
			</Fragment>
		);
	}
;

export default withRouter(Header);