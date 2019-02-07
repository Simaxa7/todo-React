import React, {Component} from 'react';

import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';


class App extends Component {

	maxId = 1;

	state = {
		todoData: [
			this.createTodoItem('Learn React'),
			this.createTodoItem('Create filter'),
			this.createTodoItem('Create button important'),
			this.createTodoItem('Create button del item'),
			this.createTodoItem('Create form add item'),
			this.createTodoItem('Create todo list'),
		],
		term: '',
		filter:'all' // actiму all done
	}

	createTodoItem(label) {
		return {
			label,
			important: false,
			done: false,
			id: this.maxId++,
		}
	}

	deleteItem = (id) => {
		this.setState(({ todoData }) => {
				const idx = todoData.findIndex( (el) => el.id === id );
				const newArr = [
					...todoData.slice(0, idx),
					...todoData.slice(idx + 1)
					];
				return 	{todoData: newArr}
		});
	}

	addItem = (text) => {
		const newItem = this.createTodoItem(text);
		this.setState(({ todoData }) => {
			const newArr = [...todoData, newItem];
			return {
				todoData: newArr
			}
		})
	}

	toggleProperty(arr, id, propName) {
		const idx = arr.findIndex( (el) => el.id === id );
		const oldItem = arr[idx];
		const newItemDone = {...oldItem, 
			[propName]: !oldItem[propName]};

		return [
			...arr.slice(0, idx),
			newItemDone,
			...arr.slice(idx + 1)
		];
	}

	onToggleDone = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'done')
			}
		});
	}

	onToggleImportant = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'important')
			}
		});
	}

	onSearchChange = (term) =>{
		this.setState({ term });
	}

	onFilterChange = (filter) => {
		this.setState({ filter });
	}

  search(items, term) {
  	if(term.length === 0) {
  		return items;
  	}

  	return items.filter((item) => {
  		return item.label
  					.toLowerCase()
  					.indexOf(term.toLowerCase()) > -1;
  	})
  }

  filter(items, filter) {
  	switch (filter) {
  		case 'all':
  			return items;
  		case 'active':
  			return items.filter((item) => !item.done);
  		case 'done':
  			return items.filter( item => item.done);
  		default:
  			return items;
  	
  	}
  }

	render (){
		const { deleteItem, onToggleImportant, onToggleDone} = this;
		const { todoData, term, filter } = this.state;

		const visibleItems = this.filter(this.search(todoData, term), filter)
		const doneCount = this.state.todoData.filter( (el) => el.done ).length;
		const todoCount = todoData.length - doneCount;

			return (
				<div className="todo-app">
					<AppHeader toDo={doneCount} done={todoCount}/>

					<div className="search-panel d-flex">
						<SearchPanel 
							onSearchChange={this.onSearchChange}/>
						
						<ItemStatusFilter 
							filter={filter}
							onFilterChange={this.onFilterChange}/>
					</div>

					<TodoList 
						todos={visibleItems}
						onDeleted = {deleteItem}
						onToggleImportant = {onToggleImportant}
						onToggleDone= {onToggleDone} />

					<ItemAddForm 
						onItemAdded={this.addItem}/>

				</div>
			);
	}
};

export default App;