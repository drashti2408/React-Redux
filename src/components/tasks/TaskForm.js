import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, Button, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	root: {
		flexGrow: 1,
	},
	formWrapper: {
		maxWidth: 400,
		padding: 20,
		margin: '0 auto',
	},
});
class TaskForm extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div>
					<div>{error}</div>
				</div>
			);
		}
	}
	renderTextField = ({ input, label, meta, ...custom }) => {
		return (
			<TextField
				// errorText={meta.touched && meta.error}
				variant="outlined"
				label={label}
				fullWidth
				{...input}
				{...custom}
			/>
		);
	};

	onSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	};

	render() {
		const { handleSubmit, classes } = this.props;
		return (
			<Paper spacing={4} className={classes.formWrapper}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Field
								name="title"
								component={this.renderTextField}
								label="Enter Title"
							/>
						</Grid>
						<Grid item xs={12}>
							<Field
								name="description"
								id="description"
								component={this.renderTextField}
								label="Enter Description"
							/>
						</Grid>
						<Grid item xs={12}>
							<Button variant="contained" color="primary" type="submit">
								Submit
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		);
	}
}

const validate = (formValues) => {
	const errors = {};

	if (!formValues.title) {
		errors.title = 'You must enter a title';
	}
	if (!formValues.description) {
		errors.description = 'You must enter a description';
	}
	return errors;
};

export default withStyles(styles)(reduxForm({ form: 'taskForm', validate })(TaskForm));
