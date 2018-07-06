const mongoose = require('mongoose')
const Schema = mongoose.Schema



const PartnerSchema = new Schema({
    name: String,
    description: String,
    signature: String,
    firstName: String,
    lastName: String,
})
const ContractSchema = new Schema({
    docTitle: String,
    description: String,
    dateSigned: Date,
    startDate: Date,
    endDate: Date,
    collaborativePartner: String,
    partners: [PartnerSchema]
})
const UserSchema = new Schema({
    userName: String,
    description: String,
    signature: String,
    firstName: String,
    lastName: String,
   contracts:[ContractSchema]
})








const UserModel = mongoose.model('User',UserSchema)
const PartnerModel = mongoose.model('Partner',PartnerSchema)
const ContractModel = mongoose.model('Contract',ContractSchema)


module.exports = {UserModel,PartnerModel,ContractModel}