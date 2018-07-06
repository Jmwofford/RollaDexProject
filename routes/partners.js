//crudd

var express = require('express');
var router = express.Router();


const { PartnerModel } = require('../db/schema')


router.get('/', function (req, res, next) {
  PartnerModel.find()
    .then((partner) => {
      res.send(partner)
    })
});
/////get PartnerModel,return a partner

router.get('/:id', function (req, res, next) {
  Partner.findById(req.params.id)
    .then((partner) => {
      res.send(partner)
    })
});
/////Show page ..works on Postman

router.post('/', (req, res) => {
  const newPartner = new PartnerModel(req.body)
  newPartner.save()
    .then((partner) => {
      res.send(partner)
    })
})
/////create working..

router.put('/:id', async (req, res) => {
  try {
    const partnerId = req.params.id
    const updatedPartner = req.body
    const savedPartner = await PartnerModel.findByIdAndUpdate(partnerId, updatedPartner)
    res.json(savedPartner)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const partnerId = req.params.id
    await Partner.findByIdAndRemove(partnerId)
    res.json({
      msg: 'Successfully Deleted'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
///////////////////////////////////////////////////////////CRUD Partner//////////////

module.exports = router;
