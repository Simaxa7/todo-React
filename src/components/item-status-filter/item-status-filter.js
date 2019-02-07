import React, {Component} from 'react';

import './item-status-filter'

const filterButtons = [
	{ name: 'all', label: 'All'},
	{ name: 'active', label: 'Active'},
	{ name: 'done', label: 'Done'}
];

class ItemStatusFilter extends Component {
	render () {

		const {filter, onFilterChange} = this.props;

		const buttons = filterButtons.map(({name, label}) => {
			const isActive = filter === name;
			const clazz = isActive ? 'btn-info' : 'btn-outline-secondary'
			return (
				<button type='button'
								className={`btn ${clazz}`}
								key={name}
								onClick={() => onFilterChange(name)}>
					{label}
				</button>
			)
		})

		return (
			<div className='btn-group'>
				{buttons}
			</div>
  	)
	}
}

export default ItemStatusFilter;