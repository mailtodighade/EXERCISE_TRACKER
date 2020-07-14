import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault(); //cancles the events if they are canclellable
    //the default action which is availabel for it will not happen
    //clicking on submit button will prevent it from
    //submitting the form
    const user = {
      username: this.state.username,
    };

    console.log(user);

    axios
      .post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: '',
    }); //after setting the username
    // the input box should have null string
    //so that the user should provide onther
    //username.....
  }

  render() {
    return (
      <div>
        <h3>CREATE A NEW USER</h3>
        <form onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label>Username: </label>
            <input
              required
              className='form-control'
              type='text'
              onChange={this.onChangeUsername}
              value={this.state.username}
            />
          </div>
          <div className='form-group'>
            <input
              type='submit'
              value='Create Users'
              className='btn btn-primary'
            ></input>
          </div>
        </form>
      </div>
    );
  }
}
