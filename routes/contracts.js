var express = require('express');
var router = express.Router();

const { ContractModel } = require('../db/schema')

router.get('/', function (req, res, next) {
    ContractModel.find(req.params.userId)
      .then((contract) => {
        res.send(contract)
      })
  });
  /////get ContractModel,return a contract
  
  router.get('/:id', function (req, res, next) {
    ContractModel.findById(req.params.id)
      .then((contract) => {
        res.send(contract)
      })
  });
  /////Show page ..works on Postman
  
  router.post('/', (req, res) => {
    const newContract = new ContractModel(req.body)
    newContract.save()
      .then((contract) => {
        res.send(contract)
      })
  })
  /////create working..
  
  router.put('/:id', async (req, res) => {
    try {
      const contractId = req.params.id
      const updatedContract = req.body
      const savedContract = await ContractModel.findByIdAndUpdate(contractId, updatedContract)
      res.json(savedContract)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  })
  
  router.delete('/:id', async (req, res) => {
    try {
      const contractId = req.params.id
      await ContractModel.findByIdAndRemove(contractId)
      res.json({
        msg: 'Successfully Deleted'
      })
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  })
  ///////////////////////////////////////////////////////////CRUD Contracts//////////////
  module.exports = router;
