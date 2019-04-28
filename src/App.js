import React, { Component } from 'react';
// import './App.css';

class App extends Component {
  state = {
    value: ''
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    alert('Description value: ' + this.state.value);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Description
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App;
