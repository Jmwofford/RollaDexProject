import React, { Component } from 'react';

class updateUser extends Component {




    handleChange = (event) => {

        const newUser = { ...this.state.newUser }

        const inputName = event.target.name

        const userInput = event.target.value

        console.log('handleChangeMotion', { newUser })

        newUser[inputName] = userInput

        this.setState({ newUser })
    }


    updateUser = (event) => {
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
        return (
            <div>
                



                    <form
            onSubmit={this.updateUser}>
            <input onChange={this.handleChange} className="username" type="text" name="userName" placeholder="Create UserName" /><br /><br />
            <input onChange={this.handleChange} className="firstnameInput" type="text" name="firstName" placeholder=" First Name" /><br /><br />
            <input onChange={this.handleChange} className="lastnameInput" type="text" name="lastName" placeholder=" Last Name" /><br /><br />
            <input onChange={this.handleChange} className="descriptionInput" type="text" name="description" placeholder=" Company Description" /><br /><br />
            <input onChange={this.handleChange} className="signatureInput" type="text" name="signature" placeholder="Auto-Fill signature" /><br /><br />
            <button className="submitButton" type="submit">Submit User</button>


            <div>




            </div>
        </form>











            </div>
        );
    }
}

export default updateUser;