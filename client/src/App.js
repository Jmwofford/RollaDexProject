import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'
// import styled from 'styled-components'
import UserPage from './components/Users'
import PartnersPage from './components/Partners'
import ContractsPage from './components/Contracts'
import './App.css';


class App extends Component {
  state = {
    users: [],
    currentlyLoggedUser: {},
    showInfo: true,
    editUser: false

  }

  componentDidMount() {
    this.getAllUsers()
  }
 handleChange = (event) => {

        const newUser = { ...this.state.newUser }

        const inputName = event.target.name

        const userInput = event.target.value

        console.log('handleChangeMotion', { newUser })

        newUser[inputName] = userInput

        this.setState({ newUser })
    }

  toggleShowInfo = () => {
    console.log('toggling')
    const changedInfo = !this.state.showInfo
    this.setState({ showInfo: changedInfo })
  }

  getAllUsers = () => {
    axios.get('/api/users')
      .then((res) => {
        console.log("AllUsers", res.data)
        this.setState({
          users: res.data,
          currentlyLoggedUser: res.data[0]
        })
      })
  }

  updateUserInState = (newUser, index) => {
    const users = [...this.state.users]
    // clone obj
    users[index] = newUser
    //replace user at index with a newUser..
    this.setState({ users: users })
  }


  updateLoggedUserInState = (currentlyLoggedUser) => {
    this.setState({ currentlyLoggedUser: currentlyLoggedUser })
  }


  deleteUser = (userId) => {
    axios.delete(`/api/users/${userId}`)
      .then(res => {
        this.getAllUsers()

      })


  }
  editUser = (event) => {
    event.preventDefault()
    axios.post(`/api/users/${this.state.currentlyLoggedUser._id}`,{}) 
    .then((res) => {
        this.setState({ user: res.data })
        console.log("testInfo", res.data)
        this.props.updateLoggedUserInState(res.data)
    })
}


  toggleButton = () => {
    const canEdit = !this.state.editUser
    this.setState({ editUser: canEdit })
  }

  render() {
    //  infoToDisplay() = this.state.showInfo ? <div><button>To edit</button></div> : <div><input placeholder="Form" /></div>

    return (
      <Router>
        <div>
          <div >

            <h1 className="userTitle"> Welcome <strong>{this.state.currentlyLoggedUser.userName},</strong>   </h1>
            <div className="userDescription">{this.state.currentlyLoggedUser.description}</div>
            <hr />

            <div className="navParent">
              <div><Link className="navTag" to='/'>   All Users </Link></div>
              <div><Link className="navTag" to='/users'>  Current Profile </Link></div>
              <div><Link className="navTag" to={`/users/:userId/contracts`}>  Contracts </Link></div>
              {/* ${this.props.match.params.id} */}
              {/* ^^^fix this^^^^ */}



              {/* <div><Link className="navTag" to='/'>  - Partners -  </Link></div> */}


              <div><Link className="navTag" to='/users/:userId/contracts/:contractId/partner'>  Partners  </Link></div>
            </div>
            <hr />
          </div>


          <Switch>
            <Route exact path="/" render={() => (
              <div>
                <h1 className="newUserText">Users</h1>
                {this.state.users.map((singleUser, i) => {
                  let eachUser = `/users/${singleUser._id}`
                  return (

                    <div className="allUserBox">
                      <br /><br />
                      <Link key={i} to={eachUser}> {singleUser.userName}</Link><br /><br /><br />
                      <button onClick={() => this.deleteUser(singleUser._id)}>Delete User</button>

                      <button  onClick={() => this.toggleButton()}>ShowEditForm</button>
                      {
                        this.state.editUser 
                          ? (
                            <form onSubmit={this.editUser}>
                              <input onChange={this.handleChange} className="username" value={singleUser.userName} type="text" name="userName" placeholder="Create UserName" /><br /><br />
                              <input onChange={this.handleChange} className="firstnameInput" value={singleUser.firstName} type="text" name="firstName" placeholder=" First Name" /><br /><br />
                              <input onChange={this.handleChange} className="lastnameInput" value={singleUser.lastName} type="text" name="lastName" placeholder=" Last Name" /><br /><br />
                              <input onChange={this.handleChange} className="descriptionInput" value={singleUser.description} type="text" name="description" placeholder=" Company Description" /><br /><br />
                              <input onChange={this.handleChange} className="signatureInput" value={singleUser.signature} type="text" name="signature" placeholder="Auto-Fill signature" /><br /><br />
                              <button className="submitButton" type="submit">Submit User</button>
                        
                            </form>
                            )
                          : null
                          }
                    </div>
                  )
                })}
              </div>
            )} />




            <Route exact path="/" render={() => <UserPage

              updateLoggedUserInState={this.updateLoggedUserInState}
              updateUserInState={this.updateUserInState}
              {...this.props}



              currentlyLoggedUser={this.state.currentlyLoggedUser}
              users={this.state.users} />} />
            <Route exact path="/users/:id" render={() => <UserPage

              updateLoggedUserInState={this.updateLoggedUserInState}
              updateUserInState={this.updateUserInState}
              {...this.props}



              currentlyLoggedUser={this.state.currentlyLoggedUser}
              users={this.state.users} />} />


            <Route exact path="/users" render={() => <UserPage

              updateLoggedUserInState={this.updateLoggedUserInState}
              updateUserInState={this.updateUserInState}
              {...this.props}



              currentlyLoggedUser={this.state.currentlyLoggedUser}
              users={this.state.users} />} />

            <Route exact path="/users/:userId/contracts" render={() => <ContractsPage
              updateLoggedUserInState={this.updateLoggedUserInState}


              updateUserInState={this.updateUserInState}


              currentlyLoggedUser={this.state.currentlyLoggedUser}
              users={this.state.users} />} />


            <Route exact path="/users/:userId/contracts/:contractId/partner" render={() => <PartnersPage
              updateLoggedUserInState={this.updateLoggedUserInState}
              updateUserInState={this.updateUserInState}
              currentlyLoggedUser={this.state.currentlyLoggedUser}
              users={this.state.users} />} />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
