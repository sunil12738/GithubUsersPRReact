	import React from 'react';
	import ReactDOM from 'react-dom';


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
			var username = document.getElementById('searchTextBox').value;
			var myInit = {
				method: "GET"
			};

			var userUrl = "https://api.github.com/users/"+username;

			fetch(userUrl,myInit).then((response) =>{
				return response.json();
			}).then((data) => {
				if(data.login==username){
				}
				else{
				}
			});
  	},

		render: function(){
			return(
				<span>
				<input type="submit" value="submit" onClick={this.handleClick} id="searchButton"></input>
    		</span>
			);
		}
	});

	var NoUserFound = React.createClass({
		render: function(){
			return(
				<div>
    		User not found
    		</div>
			);
		}
	});

	export default App;
