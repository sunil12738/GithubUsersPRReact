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
			<div className="container">
				<div className="row">
					<div className="row-centered">
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-centered">
							<SearchTextBox />
							<SearchButton />
	 					</div>
					</div>
				</div>
			</div>
		);
	}
	});

	var SearchTextBox = React.createClass({
		render: function(){
			return(
				<span>
				<input type="text"
					placeholder="please enter user name"
					id="searchTextBox"
					className="col-xs-8 col-sm-7 col-md-6 col-lg-6 col-centered margin-top"></input>
				</span>
			);
		}
	});

	var SearchButton = React.createClass({

		propTypes: {
			userexists: -1,
			userfoundmessage: '...'
	  },
	  getInitialState: function() {
	    return {
				userexists: -1,
				userfoundmessage: '...'
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
						userexists: 1,
						userfoundmessage: 'User found. Fetching Pull Requests'
		      });
				}
				else{
					this.setState({
						userexists: 0,
						userfoundmessage: 'User not found'

		      });
				}
			});
  	},

		render: function(){
			var userfoundi;
			if(this.state.userexists==1){
				userfoundi = <UserFound userfound={this.state.userfoundmessage} />;
			}
			else if(this.state.userexists==0){
				userfoundi = <UserNotFound userfound={this.state.userfoundmessage} />;
			}
			else{
				// userfoundi = <UserFound />;
			}

			return(
				<div>
					<span>
						<input type="submit"
							value="submit" onClick={this.handleClick}
							id="searchButton"
							className="col-xs-2 col-sm-2 col-md-2 col-lg-2 btn-success col-centered"></input>
    			</span>
				<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				{userfoundi}
				</div>
				</div>
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
				temp:'<div class="margin-top text-left"><h4>List of the Pull Requests are </h4><br></div>'
			};
		},

		componentDidMount: function() {
				var username = document.getElementById('searchTextBox').value;
				var prurl = 'https://api.github.com/search/issues?q=author:'+username+'+type:pr';
				var background=0; // if 0 then no background else background
			this.serverRequest = $.get(prurl, function (result) {
				for(var i=0;i<result["total_count"];++i){
					this.state.repourl.push(result["items"][i]["repository_url"]);
					this.state.issuesurl.push(result["items"][i]["url"]);
					this.state.estate.push(result["items"][i]["state"]);
					this.state.createdat.push(result["items"][i]["created_at"]);
					this.state.closedat.push(result["items"][i]["created_at"]);
					var name = get_repo_name(this.state.repourl);
					var tempString="";
					if(background==0){
						tempString='<div class="container padding-bot text-left backgroundb">';
						background=1;
					}
					else{
						tempString='<div class="container padding-bot text-left">';
						background=0;
					}

						this.state.temp=this.state.temp+
							 tempString +
								'<div>' +

									'<div class="row">' +
										'<div class="col-xs-8 col-sm-9 col-md-10 col-lg-10"><h3>Repository Name: '+name+'</h3></div>' +
										'<div class="col-xs-4 col-sm-3 col-md-2 col-lg-2"></div>' +
									'</div>' +

									'<div class="row">' +
										'<div class="col-xs-8 col-sm-9 col-md-10 col-lg-10"> Issues URL: '+result["items"][i]["url"]+'</div>' +
										'<div class="col-xs-4 col-sm-3 col-md-2 col-lg-2">State: '+result["items"][i]["state"]+'</div>' +
									'</div>' +

									'<div class="row">' +
										'<div class="col-xs-8 col-sm-9 col-md-10 col-lg-10">Created At: '+result["items"][i]["created_at"]+'</div>' +
										'<div class="col-xs-4 col-sm-3 col-md-2 col-lg-2"></div>' +
									'</div>' +

								'<div class="row">' +
										'<div class="col-xs-8 col-sm-8 col-md-8 col-lg-10">Closed At: '+result["items"][i]["closed_at"]+'</div>' +
											'<div class="col-xs-4 col-sm-4 col-md-4 col-lg-2">'+
												'<a href="result["items"][i]["html_url"]" target=\"_blank\">'+
													'More Details' +
												'</a>'+
											'</div>' +
								'</div>' +

									'<div>' +
									'</div>' +

								'</div>' +
							'</div>';
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
    		{window.alert(this.props.userfound)}
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
				{window.alert(this.props.userfound)}
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
