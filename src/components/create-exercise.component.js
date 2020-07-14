//this componet is basically creating a form which will allow the user to create a exersice and fed it into the database....
//by changing the state of the component

import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: [], //dropdown menu we can select the users
    };
  }

  //this is the react lifecycle method which react will automatically call during different phases
  //componentDidMount will automatically get called right before anything renders on this perticular page.
  //when this CreateExersice will get executed right before the execution this life cycle method will be get called automatically..

  componentDidMount() {
    axios.get('http://localhost:5000/users').then(response => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map(user => user.username),
          username: response.data[0].username,
        });
      }
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value, //target is the input textBox
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value, //target is the input textBox
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value, //target is the input textBox
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date, //will make a date picker and update the date on that picker..
    });
  }

  onSubmit(e) {
    e.preventDefault(); //cancles the events if they are canclellable
    //the default action which is availabel for it will not happen
    //clicking on submit button will prevent it from
    //submitting the form
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    console.log(exercise);

    axios
      .post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/'; //make the person back to the homepage
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Username: </label>
            <select
              className='form-control'
              required
              ref='userInput'
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='form-group'>
            <label>Description: </label>
            <input
              type='text'
              required
              className='form-control'
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className='form-group'>
            <label>Duration (in minutes): </label>
            <input
              type='text'
              className='form-control'
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className='form-group'>
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className='form-group'>
            <input
              type='submit'
              value='Create Exercise Log'
              className='btn btn-primary'
            />
          </div>
        </form>
      </div>
    );
  }
}
