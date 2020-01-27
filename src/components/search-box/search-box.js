import React from 'react';

import './search-box.css';

// The is a function component and the main purpose is to render some html
export const SearchBox = ({ placeholder, handleChange }) => (
	<input
		className='search'
		type='search'
		placeholder={placeholder}
		onChange={
			handleChange
			// this.setState(
			// 	//setState actually shouldn't go here because it creates a loop because setState behind the
			// 	// scenes calls render() and in the render it calls setState and so on
			// 	{ searchField: e.target.value },
			// 	() => console.log(this.state), //the second argument in setState is a callback and runs after the setState finishes
			// ); //setState is async so it doesn't return the new value into
			// //searchField yet so that is why it is 1 char behind in the console if we simply have this line of code
			// // console.log(this.state);
		}
	/>
);
