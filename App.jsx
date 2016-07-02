	import React from 'react';

	{/*
	Below are two methods for the same:
	*/}

	var App = React.createClass({
	render: function(){
		return (
			<div>
				<SearchModule />
			</div>
		);
	}
	});

	var SearchModule = React.createClass({
	render: function(){
		return(
			<div>
			<SearchTextBox />
			<SearchButton />
	 		</div>
		);
	}
	});

	var SearchTextBox = React.createClass({
		render: function(){
			return(
				<span>
				<input type="text" placeholder="type user" id="searchTextBox"></input>
				</span>
			);
		}
	});

	var SearchButton = React.createClass({
		handleClick: function() {
			var x = document.getElementById('searchTextBox').value;
			console.log(x);
  	},
		render: function(){
			return(
				<span>
				<input type="submit" value="submit" onClick={this.handleClick} id="searchButton"></input>
    		</span>
			);
		}
	});



	export default App;
