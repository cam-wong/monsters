import React from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list';
import { SearchBox } from './components/search-box/search-box';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			// State becomes "props" when it trickles down the tree structure of the html
			// We include a key and specify it in the .map so that react can recognise that an element has changed
			// so it only needs to re-render that element which improves the performance
			monsters: [],
			searchField: '',
		};
	}

	componentDidMount() {
		// Promises are normally used for API calls because we don't know if the request is going to be successful
		// we can .catch the reject i.e. failed API call and handle it appropriately or use .then to do something
		// after the successful APi call
		// .then wraps the value inside a resolved promise object and we can only call .then on a resolved promise
		// therefore, we can chain .then statements
		fetch('https://jsonplaceholder.typicode.com/users') //fetch returns a resolved promise or rejects the API call
			.then(response => response.json())
			.then(users => this.setState({ monsters: users }));
	}

	handleChange = e => {
		// we can use an arrow function outside the render method
		// the "this." keyword binds a method to its context. if we didn't use an arrow func then it would throw an error
		// this is because the "this." in front of setState has the wrong context and is no referring to the Component class we extend
		// however when we use an arrow func the "this." context is set when we first the constructor() is run meaning
		// meaning we will be in the Component context
		this.setState({ searchField: e.target.value });
	};

	render() {
		const { monsters, searchField } = this.state; //destructuring an js object
		const filteredMonsters = monsters.filter(monster =>
			monster.name.toLowerCase().includes(searchField.toLowerCase()),
		);

		return (
			// This is actually jsx and not html. jsx is mimicing html
			<div className='App'>
				<h1>Monster Rolodex</h1>
				{/* //setState actually shouldn't go here because it creates a loop because setState behind the
				// scenes calls render() and in the render it calls setState and so on */}
				<SearchBox
					placeholder='search monsters'
					handleChange={this.handleChange}
				/>
				{/* Whatever we pass in the CardList jsx object it can be accessed using props in the jsx object's file */}
				{/* For example, in the card-list.js file we can use props.monsters to access the list of monsters */}
				{/* the key= is special in react it tells ReactDOM to render only that element with a key that has changed */}
				<CardList monsters={filteredMonsters} />
			</div>
		);
	}
}

export default App;
