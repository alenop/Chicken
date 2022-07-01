const router = require('express').Router()
const chicken = require('../models/chicken.model')

router.get('/getAll', async (req, res) => {
  const chickens = await chicken.getAll();
  res.json(chickens);
})

router.get('/getAllByCategory/:category', async (req, res) => {
  const category = (req.params.category);
  const chickens = await chicken.getAllBy(category);
  res.json(chickens);
})

router.delete('/delete',async (req, res) => {
  await chicken.delete(req.body.name)
  res.json("done")
})

router.patch('/run',async (req, res) => {
  await chicken.run(req.body.name)
  res.json("done")
})

router.post('/create', async (req, res) => {
  const chickens = await chicken.create(req.body);
})

router.get('/chickens/:chickenId', async (req, res) => {
  const chickenId = Number(req.params.chickenId);
  const specificChicken = await chicken.getById(chickenId);
  res.json(specificChicken)
});

module.exports = router;