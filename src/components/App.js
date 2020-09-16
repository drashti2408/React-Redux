import React from 'react';
import TaskCreate from './tasks/TaskCreate';
import TaskDelete from './tasks/TaskDelete';
import TaskEdit from './tasks/TaskEdit';
import TaskShow from './tasks/TaskShow';
import TaskList from './tasks/TaskList';
import { Router, Route } from 'react-router-dom';
import Header from '../components/shared/Header';
import history from '../history';

const App = () => {
	return (
		<div>
			<Router history={history}>
				<div
					style={{
						backgroundColor: '#eee',
						minHeight: '100vh',
					}}
				>
					<Header></Header>
					<Route path="/" exact component={TaskList}></Route>
					<Route path="/tasks/new" exact component={TaskCreate}></Route>
					<Route path="/tasks/edit/:id" exact component={TaskEdit}></Route>
					<Route path="/tasks/delete/:id" exact component={TaskDelete}></Route>
					<Route path="/tasks/show" exact component={TaskShow}></Route>
				</div>
			</Router>
		</div>
	);
};

export default App;
