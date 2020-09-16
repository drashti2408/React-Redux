import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTask, deleteTask } from '../../actions';
import history from '../../history';
import Modal from '../shared/Modal';

class TaskDelete extends React.Component {
	componentDidMount() {
		this.props.fetchTask(this.props.match.params.id);
	}
	onSubmit = () => {
		this.props.deleteTask(this.props.match.params.id);
	};
	renderContent() {
		if (!this.props.task) {
			return 'Are you sure you want to delete this task?';
		}
		return `Are you sure you want to delete the task with title: ${this.props.task.title}`;
	}
	renderActions() {
		return (
			<React.Fragment>
				<button className="ui button negative" onClick={this.onSubmit}>
					Delete
				</button>
				<Link to="/" className="ui button">
					Cancel
				</Link>
			</React.Fragment>
		);
	}
	render() {
		return (
			<Modal
				title="Delete task"
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={() => history.push('/')}
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { task: state.tasks[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchTask, deleteTask })(TaskDelete);
