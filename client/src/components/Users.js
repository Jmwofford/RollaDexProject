import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const BoxMagic = styled.div`
  display: inline-block;
  background: white;
  width: 200px;
  height: 200px;
  transition: transform 300ms ease-in-out;
 
  &:hover {
    transform: translate(200px, 150px) rotate(20deg)
  }
`

class Users extends Component {
    state = {
        showInfo: true,
        newUser: {},
        user: [],
        editUser: false

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
                    user: res.data,
                    // currentlyLoggedUser: res.data[0]

                })
            })
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


    createUser = (event) => {
        event.preventDefault()
        axios.post('/api/users', {
            user: this.state.newUser
        }).then((res) => {
            this.setState({ user: res.data })
            console.log("testInfo", res.data)
            this.props.updateLoggedUserInState(res.data)
        })
    }

    render() {
        const UserForm = <form
            onSubmit={this.createUser}>
            <input onChange={this.handleChange} className="username" type="text" name="userName" placeholder="Create UserName" /><br /><br />
            <input onChange={this.handleChange} className="firstnameInput" type="text" name="firstName" placeholder=" First Name" /><br /><br />
            <input onChange={this.handleChange} className="lastnameInput" type="text" name="lastName" placeholder=" Last Name" /><br /><br />
            <input onChange={this.handleChange} className="descriptionInput" type="text" name="description" placeholder=" Company Description" /><br /><br />
            <input onChange={this.handleChange} className="signatureInput" type="text" name="signature" placeholder="Auto-Fill signature" /><br /><br />
            <button className="submitButton" type="submit">Submit User</button>


            <div>
                




            </div>
        </form>

        const infoToDisplay = this.state.showInfo ?
            <div>
                <h1 className="newUserTextHead">New User? Click Logo Above </h1>
                <hr />
                {/* <div className="newUserText">Not .. {this.state.currentlyLoggedUser.userName}?</div> */}
                <div className="newUserText"><strong>Username : </strong>{this.props.currentlyLoggedUser.userName}</div> <br/>
                <div className="newUserText"><strong>First Name : </strong>{this.props.currentlyLoggedUser.firstName}</div><br/>
                <div className="newUserText"><strong>Last Name : </strong>{this.props.currentlyLoggedUser.lastName}</div><br/>
                <div className="newUserText"><strong>Description : </strong>{this.props.currentlyLoggedUser.description}</div><br/>
                
                
               
   





                <div className="signbox2">
                    <div id="signature" className="newUserText"><strong></strong>{this.props.currentlyLoggedUser.signature}</div>

                </div>

                <div className="floatDivParent">
                    <div className="floatingDivs">View Contracts
                    <div>


                        </div>
                    </div>
                    <div className="floatingDivs2">View Partner
                    <div>


                        </div>
                    </div>
                    <div className="floatingDivs3">View All Users
                    <div>


                        </div>
                    </div>
                    <div>



                    </div>


                </div>

                <div className="newUserTexth1"></div>
            </div >
            : <div> {UserForm} </div>


        return (
            <div>


                <div className="navParent">
                    <div><Link className="navTag" to='/users/5b380bfc8207ff7f1193360c'>Other Link {this.props.currentlyLoggedUser.userName} </Link></div>
                    {/* <div><Link className="navTag" to={`/users/${this.props.match.params.userId}/contracts`}>  Contracts -</Link></div>
              <div><Link className="navTag" to='/users/:userId/contracts/:contractId/partner'>  - Partners -  </Link></div> */}
                </div>



                {/* <Link to='/users/${this.state.userId}/contracts' > */}
                <img className="imageLogo"
                    onClick={this.toggleShowInfo}
                    src="http://25.media.tumblr.com/98ab9c87574fcf82303d79be8881a464/tumblr_mohf0hly2r1qgazxho1_400.gif"
                    alt="" />
                {infoToDisplay}
            </div>
        );
    }
}

export default Users;