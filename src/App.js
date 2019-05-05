import React, { Component } from 'react';
import './App.css';
import Form from './Form';
import Problem from './Problem';

class App extends Component {
  state = {
    showForm: false,
    edit: true,
    problemsArr: [
      // {
      //   problem_number: 1,
      //   subcategory: 'Network',
      //   short_description:
      //     'hfdjsahfjkdsahfkjdahfkjdhfadfbfnmbvcm,xzkjfdhjkladhfjdalsf',
      //   work_notes:
      //     'the notes are really important for the person to get more information about the problem'
      // },
    ],
    form_data: {
      subcategory: {
        value: ''
      },
      short_description: {
        value: ''
      },
      work_notes: {
        value: ''
      }
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const form_dataCpy = { ...this.state.form_data };

    const readyFormData = this.createJSON(form_dataCpy);

    console.log(readyFormData);
    fetch('https://dev65109.service-now.com/api/now/table/problem', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('admin' + ':' + 'MountainFuji123')
      },
      body: readyFormData
    })
      .then(res => res.json())
      .then(response =>
        this.setState(prevState => ({
          problemsArr: [
            ...prevState.problemsArr,
            {
              problem_number: response.result.number,
              subcategory: response.result.subcategory,
              problem_id: response.result.sys_id
            }
          ]
        }))
      );
  };

  createJSON = obj => {
    const flattened = Object.keys(obj).reduce(
      (acc, val) => ({ ...acc, [val]: obj[val].value }),
      {}
    );

    const stringified = JSON.stringify(flattened);

    return stringified;
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

  editFormHandler = id => {
    const test = this.state.problemsArr.find(x => x.problem_id === id);

    this.setState({
      form_data: {
        subcategory: {
          value: test.subcategory
        },
        short_description: {
          value: test.short_description
        },
        work_notes: {
          value: test.work_notes
        }
      }
    });
    console.log(test);
  };

  render() {
    console.log(this.state.problemsArr);
    const problems = (
      <ul>
        {this.state.problemsArr.map((problem, index) => {
          return (
            <Problem
              number={problem.problem_number}
              subcategory={problem.subcategory}
              shortDescription={problem.short_description}
              notes={problem.work_notes}
              key={index}
              editForm={() => this.editFormHandler(problem.problem_id)}
            />
          );
        })}
      </ul>
    );
    return (
      <div className="wrapper">
        <form className="form" name="form" onSubmit={this.handleSubmit}>
          <label htmlFor="subcategory">Subcategory</label>
          <input
            type="text"
            name="subcategory"
            value={this.state.form_data.subcategory.value}
            onChange={this.handleChange}
            placeholder="Subcategory"
          />
          <label htmlFor="short_description">Short description</label>
          <textarea
            type="text"
            name="short_description"
            value={this.state.form_data.short_description.value}
            onChange={this.handleChange}
            placeholder="Short description"
          />
          {this.state.edit && (
            <>
              <label htmlFor="work_notes">Work Notes</label>
              <textarea
                type="text"
                name="work_notes"
                value={this.state.form_data.work_notes.value}
                onChange={this.handleChange}
                placeholder="Work notes"
              />
            </>
          )}
          <input className="form__submit" type="submit" value="Submit" />
        </form>
        {problems}
      </div>
    );
  }
}

export default App;
