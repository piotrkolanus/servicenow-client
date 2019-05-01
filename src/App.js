import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    showForm: false,
    editWithWorkNotes: false, //do conditionally renerowania textarea work notes w functional compo
    problemsArr: [],
    form_data: {
      // assignment_group: {
      //   value: ''
      // },
      // short_description: {
      //   value: 'null'
      // }
    }
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name);
    this.setState({
      form_data: {
        ...this.state.form_data,
        [name]: {
          ...this.state.form_data[name],
          value
        }
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form_dataCpy = { ...this.state.form_data };

    console.log(Object.values(this.state.form_data).map(x => x.value));
  };

  render() {
    return (
      <div className="wrapper">
        {/* <h2>Enter problem data</h2> */}
        <form className="form" name="form" onSubmit={this.handleSubmit}>
          <label htmlFor="assignment_group">Assignment Group</label>
          <input
            type="text"
            name="assignment_group"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Assignment Group"
          />
          <label htmlFor="short_description">Short description</label>
          <textarea
            type="text"
            name="short_description"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Short description"
          />
          <input className="form__submit" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
