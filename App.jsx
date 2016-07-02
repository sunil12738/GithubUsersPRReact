import React from 'react';

{/*
Below are two methods for the same:
*/}

var App = React.createClass({
	render: function(){
		return (
			<div>
				Hello World
        <UserGist />
			</div>
		);
	}
});

var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.get("https://api.github.com/users/octocat/gists", function (result) {
      var lastGist = result[0];
			console.log(lastGist);
      this.setState({
        username: lastGist.owner.login,
        lastGistUrl: lastGist.html_url
      });
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <div>
        {this.state.username}'s last gist is
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

export default App;
