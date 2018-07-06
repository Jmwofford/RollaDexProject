//crud
var express = require('express');
var router = express.Router();

const { UserModel } = require('../db/schema')

router.get('/', function (req, res, next) {
  UserModel.find()
    .then((user) => {
      res.send(user)
    })
});
/////get UserModel,return a user

router.get('/:id', function (req, res, next) {
  UserModel.findById(req.params.id)
    .then((user) => {
      res.send(user)
    })
});
/////Show page ..works on Postman

router.post('/', (req, res) => {
  const newUser = new UserModel(req.body.user)
  console.log('req.Body return', req.body.user)

  console.log(newUser)
  newUser.save()
    .then((user) => {
      res.send(user)
    })
})
/////create working..

router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id
    const updatedUser = req.body
    const savedUser = await UserModel.findByIdAndUpdate(userId, updatedUser)
    res.json(savedUser)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id
    await UserModel.findByIdAndRemove(userId)
    res.json({
      msg: 'Successfully Deleted'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})
///////////////////////////////////////////////////////////CRUD User//////////////

module.exports = router;
