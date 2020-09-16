import React from 'react';
import { connect } from 'react-redux';
import { createTask } from '../../actions';
import TaskForm from './TaskForm';
import { withStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const styles = (theme) => ({
	root: {
		flexGrow: 1,
	},
});

class TaskCreate extends React.Component {
	onSubmit = (formValues) => {
		this.props.createTask(formValues);
	};
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Container maxWidth="lg">
					<h3 style={{ textAlign: 'center' }}>Create a Task</h3>
					<TaskForm onSubmit={this.onSubmit}></TaskForm>
				</Container>
			</div>
		);
	}
}

export default withStyles(styles)(connect(null, { createTask })(TaskCreate));
