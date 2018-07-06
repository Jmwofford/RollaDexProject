require('dotenv').config()
const mongoose = require('mongoose')
// mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)


const db = mongoose.connection


const { UserModel } = require('./schema')
const { PartnerModel } = require('./schema')
const { ContractModel } = require('./schema')


const partner = new PartnerModel({
    name: "Home Depot Dwight Roundlyps",
    description: "Agreement Outlining Job Requirements and Project Expectations",
    signature: "Dwight Cunningham",
    firstName:"Dwight",
    lastName:"Cunningham"
})

const contract = new ContractModel({
    docTitle: "HomeDepot Employee Thesis",
    description: "Written Requirements and Expectation based on Employees BlahBlah",
    dateSigned: "07/23/2018",
    startDate: "07/25/2018",
    endDate: "01/01/2021",
    collaborativePartner: "Home Depot",
    partners: [partner]
})
const user = new UserModel({
    userName: "Jmwofford723",
    description: "Junior Software Development Professional",
    signature: "Jordan Wofford",
    firstName:"Jordan",
    lastName:"Wofford",
    contracts: [contract]
})
const anotherUser = new UserModel({
    userName: "anothAUserr",
    description: "Another Title to test",
    signature: "another.user",
    firstName:"Nuthaa",
    lastName:"User",
    contracts: [contract]
})





const users = [user, anotherUser]

UserModel.remove({})
    .then(() => {
        console.log('removed all users')
    })
    .then(() => UserModel.insertMany(users))
        // return users.save()


    .then((data) => {
        console.log('new profile added', data)
        mongoose.connection.close()
    })
    .catch((err) => {
        console.log(err)
    })


