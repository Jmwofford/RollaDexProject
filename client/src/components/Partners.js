import React, { Component } from 'react';
import axios from 'axios'


class Partners extends Component {
    state = {
        showInfo: false,
        // partners: [],
        currentlyLoggedUser: {}
    }

    toggleShowInfo = () => {
        console.log('toggling')
        const changedInfo = !this.state.showInfo
        this.setState({ showInfo: changedInfo })
    }


    getAllPartners = () => {
        axios.get('/api/users/:userId/contracts/:contractId/partner')
            .then((res) => {
                // const partnerId = this.props.match.params.userId

                console.log("AllPartners", res.data)
                this.setState({
                    partners: res.data,
                    //   currentlyLoggedUser:res.data[0]
                })
            })
    }

    componentDidMount() {
        this.getAllPartners()
    }
    
    render() {


        const partnerForm = <form onSubmit={this.handleSubmit} >
            <input className="username" type="text" name="userName" placeholder="Company Name" /><br /><br />
            <input className="firstnameInput" type="text" name="firstName" placeholder=" First Name" /><br /><br />
            <input className="lastnameInput" type="text" name="lastName" placeholder=" Last Name" /><br /><br />
            <input className="descriptionInput" type="text" name="description" placeholder=" Company Description" /><br /><br />
            <input className="signatureInput" type="text" name="signature" placeholder="Auto-Fill signature" /><br /><br />
            <button className="submitButton" type="submit">Submit User</button> </form>

        const infoToDisplay = this.state.showInfo ? <div>


            <div className="newUserText">Partner Name : {this.props.currentlyLoggedUser.contracts[0].partners[0].name}</div>
            <div className="newUserText">Business Description : {this.props.currentlyLoggedUser.contracts[0].partners[0].description}</div>

            <div className="signbox">
                <div id="signature" className="newUserText">{this.props.currentlyLoggedUser.contracts[0].partners[0].signature}</div>
                <div id="signature" className="newUserText">{this.props.currentlyLoggedUser.contracts[0].partners[0].firstName}</div>
                <div id="signature" className="newUserText">{this.props.currentlyLoggedUser.contracts[0].partners[0].lastName}</div>
            </div>




        </div >
            : <div>{partnerForm}</div>

        //also Add Contracts

        return (
            <div>

                <img
                    onClick={this.toggleShowInfo}
                    className="imageLogo"
                    src="http://25.media.tumblr.com/98ab9c87574fcf82303d79be8881a464/tumblr_mohf0hly2r1qgazxho1_400.gif"
                    alt="" />
                <h1 className="newPartnerTextHead">Need To Add A Partner? Click Logo Above </h1>
                <hr />
                {infoToDisplay}
            </div>
        );
    }
}

export default Partners;