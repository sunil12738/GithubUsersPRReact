	import React from 'react';
	import ReactDOM from 'react-dom';

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
				<input type="text" placeholder="type user" id="searchTextBox" ref="hiii"></input>
				</span>
			);
		}
	});

	var SearchButton = React.createClass({

		propTypes: {
			userexists: false,
			userfoundmessage: ''
	  },
	  getInitialState: function() {
	    return {
				userexists: false,
				userfoundmessage: 'user not found'
	    };
	  },

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
					this.setState({
						userexists: true,
						userfoundmessage: 'user found'
		      });
				}
				else{
					this.setState({
						userexists: false,
						userfoundmessage: 'user not found'

		      });
				}
			});
  	},

		render: function(){
			var userfound;
			if(this.state.userexists){
				userfound: <UserFound />
			}
			else{
				userfound: <UserFound />
			}

			return(
				<span>
				<input type="submit" value="submit" onClick={this.handleClick} id="searchButton"></input>
				<UserFound userfound={this.state.userfoundmessage} />
    		</span>
			);
		}
	});

	var UserFound = React.createClass({
		render: function(){
			return(
				<div>
    		<input type="text" value={this.props.userfound}></input>
    		</div>
			);
		}
	});

	export default App;
