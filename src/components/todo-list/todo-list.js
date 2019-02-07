import React from 'react';

import TodoListItem from '../todo-list-item';
import './todo-list.css'//..подключаем стили

const TodoList = ( {
										todos,
									  onDeleted, 
									  onToggleImportant, 
									  onToggleDone} ) => {

	const elements = todos.map((item) => {
		const { id, ...itemProps} = item;//...itemProps заберет оставшиеся параметры за исключением id чтоб не передавать лишнее в TodoListItem

		return (
			<li key = {id}
				className = 'list-group-item'>
				<TodoListItem 
					{...itemProps}
					onDeleted={ () => onDeleted(id) } 
					onToggleImportant = { () => onToggleImportant(id) }
					onToggleDone= { () => onToggleDone(id) }
					/>
			</li>
		)
	})

	return (
		<ul className='list-group todo-list'>
			{ elements }
		</ul>
	);
};

export default TodoList;
