import React from 'react';
import { fetchTask, editTask } from '../../actions';
import { connect } from 'react-redux';
import TaskForm from './TaskForm';
import _ from 'lodash';
import { Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	root: {
		flexGrow: 1,
	},
});

class TaskEdit extends React.Component {
	componentDidMount() {
		this.props.fetchTask(this.props.match.params.id);
	}

	onSubmit = (formValues) => {
		this.props.editTask(this.props.match.params.id, formValues);
	};

	render() {
		if (!this.props.task) {
			return <div>Loading!</div>;
		}
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Container maxWidth="lg">
					<h3 style={{ textAlign: 'center' }}>Edit Task </h3>
					<TaskForm
						initialValues={_.pick(this.props.task, 'title', 'description')}
						onSubmit={this.onSubmit}
					></TaskForm>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { task: state.tasks[ownProps.match.params.id] };
};

export default withStyles(styles)(connect(mapStateToProps, { fetchTask, editTask })(TaskEdit));
