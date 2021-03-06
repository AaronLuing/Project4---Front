import Axios from 'axios'
import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import jsonwebtoken from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      redirect: null,
      loggedIn: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }
  handleSubmit = (event) => {
    event.preventDefault()
    Axios.post('http://localhost:8000/user/login', {
    // Axios.post('https://afternoon-savannah-51133.herokuapp.com/user/login', {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    })
    .then(res => {
        console.log(res.data)
        sessionStorage.setItem('username', res.data.data.username)
        // sessionStorage.setItem('username', this.state.username)
        sessionStorage.setItem('id', res.data.data.id)
        // sessionStorage.setItem('id', this.state.id)
        sessionStorage.setItem('email', res.data.data.email)
        // sessionStorage.setItem('email', this.state.email)
        console.log(sessionStorage)
      })
    .catch(err => {
      console.log(err)
    })
    .then(() => {
      if(sessionStorage.username.length > 0){
        this.setState({
          redirect: true,
          loggedIn: true
        })
        sessionStorage.setItem('loggedIn', 'true')
      } else {
        console.log('user login failed')
      }
    })
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/overview" />
    } else {
      <Redirect to="/" />
    }
    return (
      <div id='loginform'>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              name='username'
              id='username'
              onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='text'
              name='email'
              id='email'
              onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              id='password'
              onChange={this.handleChange}/>
          </Form.Group>
          <Button
            variant='dark'
            type='submit'>Log In</Button>
        </Form>
        {/* <form onSubmit={this.handleSubmit}>
          <label htmlFor='username'>Username</label>
          <input 
            type='text'
            name='username'
            id='username'
            onChange={this.handleChange}/><br />
          <label htmlFor='email'>Email</label>
          <input 
            type='text'
            name='email'
            id='email'
            onChange={this.handleChange}/><br />
          <label htmlFor='password'>Password</label>
          <input 
            type='text'
            name='password'
            id='password'
            onChange={this.handleChange}/><br />
          <input
            type='submit'
            value='Submit' />
        </form> */}
      </div>
    )
  }
}
