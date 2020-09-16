import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const CustomModal = (props) => {
	const classes = useStyles();

	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(true);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
		>
			<div onClick={props.onDismiss} style={modalStyle} className={classes.paper}>
				<div
					onClick={(e) => e.stopPropagation()}
					className="ui standard modal visible active"
				>
					<div className="header">{props.title}</div>
					<div className="content">{props.content}</div>
					<div className="actions">{props.actions}</div>
				</div>
			</div>
		</Modal>
	);
};

export default CustomModal;
