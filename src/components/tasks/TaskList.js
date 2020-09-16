import React from 'react';
import { connect } from 'react-redux';
import { IconButton, Container } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { Fab, Grid } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { fetchTasks, toggleTaskStatus } from '../../actions';
import history from '../../history';
import TaskCard from '../shared/TaskCard';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	root: {
		flexGrow: 1,
	},
	fab: {
		margin: theme.spacing(2),
	},
	fixed: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(3),
	},
	taskWrapper: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	taskCard: {
		flex: '0 32%',
		marginBottom: '2%',
	},
});

class TaskList extends React.Component {
	componentDidMount() {
		this.props.fetchTasks();
	}

	renderCreate() {
		const { classes } = this.props;
		if (this.props.isSignedIn) {
			return (
				<div style={{ textAlign: 'right' }}>
					<Tooltip
						onClick={() => {
							history.push('/tasks/new');
						}}
						className={classes.fixed}
						title="Add"
						aria-label="add"
					>
						<Fab color="secondary">
							<AddIcon />
						</Fab>
					</Tooltip>
				</div>
			);
		}
	}

	renderAdmin(task) {
		if (task.userId === this.props.currentUserId) {
			return (
				<div className="right floated content">
					<IconButton
						color="primary"
						aria-label="edit task"
						component="span"
						onClick={() => this.handleEdit(task.id)}
					>
						<EditIcon />
					</IconButton>
					<IconButton
						color="secondary"
						aria-label="delete task"
						component="span"
						onClick={() => this.handleDelete(task.id)}
					>
						<DeleteIcon />
					</IconButton>
				</div>
			);
		}
	}

	handleEdit = (taskId) => {
		history.push(`/tasks/edit/${taskId}`);
	};

	handleDelete = (taskId) => {
		history.push(`/tasks/delete/${taskId}`);
	};

	handleToggle = (task) => {
		this.props.toggleTaskStatus(task);
	};

	renderList() {
		const { classes } = this.props;
		return this.props.tasks.map((task) => {
			return (
				<Grid item xs={3} key={task.id}>
					<TaskCard
						className={classes.taskCard}
						task={task}
						handleEdit={this.handleEdit}
						handleDelete={this.handleDelete}
						handleToggle={this.handleToggle}
					/>
				</Grid>
			);
		});
	}
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Container maxWidth="lg">
					<h2>Tasks</h2>
					<Grid container spacing={3}>
						{this.renderList()}
					</Grid>
					{this.renderCreate()}
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		tasks: Object.values(state.tasks),
		currentUserId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn,
	};
};

export default withStyles(styles)(
	connect(mapStateToProps, { fetchTasks, toggleTaskStatus })(TaskList),
);
