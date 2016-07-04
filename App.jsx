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
				<input type="text" placeholder="type user" id="searchTextBox"></input>
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
			var userfoundi;
			if(this.state.userexists){
				userfoundi = <UserFound userfound={this.state.userfoundmessage} />;
			}
			else{
				userfoundi = <UserNotFound userfound={this.state.userfoundmessage} />;
			}

			return(
				<span>
				<input type="submit" value="submit" onClick={this.handleClick} id="searchButton"></input>
				{userfoundi}
    		</span>
			);
		}
	});

	var UserFound = React.createClass({
		propTypes: {
			username:'',
			reponame:React.PropTypes.array,
			repourl:React.PropTypes.array,
			issuesurl:React.PropTypes.array,
			estate:React.PropTypes.array,
			createdat:React.PropTypes.array,
			closedat:React.PropTypes.array,
			temp:''
		},
		getInitialState: function() {
			return {
				username:'',
				reponame:(this.props.links || []),
				repourl:(this.props.links || []),
				issuesurl:(this.props.links || []),
				estate:(this.props.links || []),
				createdat:(this.props.links || []),
				closedat:(this.props.links || []),
				temp:''
			};
		},

		componentDidMount: function() {
				var username = document.getElementById('searchTextBox').value;
				var prurl = 'https://api.github.com/search/issues?q=author:'+username+'+type:pr';
			this.serverRequest = $.get(prurl, function (result) {
				for(var i=0;i<result["total_count"];++i){
					this.state.repourl.push(result["items"][i]["repository_url"]);
					this.state.issuesurl.push(result["items"][i]["url"]);
					this.state.estate.push(result["items"][i]["state"]);
					this.state.createdat.push(result["items"][i]["created_at"]);
					this.state.closedat.push(result["items"][i]["created_at"]);
					this.state.temp=this.state.temp+'<div><div><span class="col-lg-8 ">'+result["items"][i]["repository_url"]+'</span><span>'+result["items"][i]["state"]+'</span></div><div>'+result["items"][i]["url"]+'</div><div>'+result["items"][i]["created_at"]+'</div><div><span>'+result["items"][i]["created_at"]+'</span><span><a target=\"_blank\" href='+result["items"][i]["html_url"]+'>More Details</a></span></div></div>';
				}
				this.setState({
	        repourl: this.state.repourl,
					issuesurl: this.state.issuesurl,
					estate: this.state.estate,
					createdat: this.state.createdat,
					closedat: this.state.closedat,
					temp: this.state.temp
	      });
			}.bind(this));
		},

		componentWillUnmount: function() {
			this.serverRequest.abort();
		},

		render: function(){
			return(
				<div>
    		{this.props.userfound}
				<Temp temp={this.state.temp} />
    		</div>
			);
		}
	});

	var Temp = React.createClass({
		render: function(){
			return(
				<div>
				<div className="content1" dangerouslySetInnerHTML={{__html: this.props.temp}}></div>
				</div>
			);
		}
	});

	var UserNotFound = React.createClass({
		render: function(){
			return(
				<div>
				{this.props.userfound}
				</div>
			);
		}
	});

	var RepoUrl = React.createClass({
		render: function(){
			return(
				<div>
					<table>
						{this.props.repourl.map(function(url1){return <tr><td>{url1}</td></tr>;})}
						{this.props.issuesurl.map(function(url1){return <tr><td>{url1}</td></tr>;})}
						{this.props.estate.map(function(url1){return <tr><td>{url1}</td></tr>;})}
						{this.props.createdat.map(function(url1){return <tr><td>{url1}</td></tr>;})}
						{this.props.closedat.map(function(url1){return <tr><td>{url1}</td></tr>;})}
					</table>
				</div>
			);
		}
	});

	export default App;
