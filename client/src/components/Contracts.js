import React, { Component } from 'react';
import axios from 'axios'


class Contracts extends Component {
    state = {
        showInfo: true,
        users: [],
        newUser: {}
        // currentlyLoggedUser: {},
    }


    toggleShowInfo = () => {
        console.log('toggling')
        const changedInfo = !this.state.showInfo
        this.setState({ showInfo: changedInfo })
    }

    getAllContracts = () => {
        axios.get('/api/users/${singleUser._id}/contracts')
            .then((res) => {
                console.log("AllContracts", res.data)
                // this.setState({
                //     users: res.data,
                //     currentlyLoggedUser: res.data[0]

                // })
            })
    }
    componentDidMount() {
        this.getAllContracts()
    }

    createContract = (event) => {
        event.preventDefault()
        axios.post('/api/users/:userId/contracts', {
            user: this.state.newContract
        }).then((res) => {
            this.setState({ user: res.data })
            console.log("testInfo2", res.data)
            this.props.currentlyLoggedUser(res.data)
        })
    }
    handleChange = (event) => {

        const newContract = { ...this.state.newContract }

        const inputName = event.target.name

        const userInput = event.target.value

        console.log('handleChangeMotion', { newContract })

        newContract[inputName] = userInput

        this.setState({ newContract })
    }



    render() {
        console.log(this.props.currentlyLoggedUser)
        if (Object.keys(this.props.currentlyLoggedUser).length === 0) {
            return (
                "Currently Loading"
            )
        }
        const contractForm =
            <form onSubmit={this.createContract}>
                <input onChange={this.handleChange} className="username" type="text" name="docTitle" placeholder="Document Title" /><br /><br />
                <textarea onChange={this.handleChange} className="firstnameInput" type="text" name="description" placeholder=" Contract Terms and Description [Pull Tab To Extend TextArea -->]" /><br /><br />
                <input onChange={this.handleChange} className="lastnameInput" type="text" name="dateSigned" placeholder=" Date Signed" /><br /><br />
                <input onChange={this.handleChange} className="descriptionInput" type="text" name="startDate" placeholder=" Contract Start Date" /><br /><br />
                <input onChange={this.handleChange} className="signatureInput" type="text" name="endDate" placeholder="Contract End Date" /><br /><br />
                <input onChange={this.handleChange} className="signatureInput" type="text" name="partners" placeholder="Collaborative Partners" /><br /><br />
                <button className="submitButton" type="submit">Submit User</button>
            </form>


        //onChange..onSubmit...defaultParams

        const infoToDisplay = this.state.showInfo ?


            <div className="contractParent">

                <div className="contractChild">Contract 1</div>
                <div className="contractChild">Contract 2</div>
                <div className="contractChild">Contract 3</div>
                <div className="contractChild">Contract 4</div>
                <div className="contractChild">Contract 5</div>
                <div className="contractChild">Contract 6</div>
                <div>



                    <div className="newUserText"><strong>Contract Title : </strong>{this.props.currentlyLoggedUser.contracts[0].docTitle}</div>
                    <div className="newUserText"><strong>Contract Description :</strong> {this.props.currentlyLoggedUser.contracts[0].description}</div>
                    <div className="newUserText"><strong>Date Signed : </strong>{this.props.currentlyLoggedUser.contracts[0].dateSigned}</div>
                    <div className="newUserText"><strong>Contract Start Date : </strong>{this.props.currentlyLoggedUser.contracts[0].startDate}</div>
                    <div className="newUserText"><strong>Contract End Date : </strong>{this.props.currentlyLoggedUser.contracts[0].endDate}</div>
                    
                    
                 

                </div>
   <div className="momentJs"></div>
            </div>

            : <div><div>{contractForm}</div>



            </div>

        return (
            <div>
                <img
                    onClick={this.toggleShowInfo}
                    className="imageLogo"
                    src="https://i.pinimg.com/originals/64/14/dd/6414dd4ab99e73edea33eb7d568c896d.gif"
                    alt="" />


                <hr />
                <h1 className="newContractTextHead">Need To Add A Contract? Click Logo Above </h1>


                {infoToDisplay}



            </div >
        );
    }
}

export default Contracts;