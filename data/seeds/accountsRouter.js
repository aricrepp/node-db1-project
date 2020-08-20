const express = require('express');
const db = require('../dbConfig');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const accounts = await db.select('*').from('accounts');
    res.status(201).json(accounts);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const [id] = await db
      .insert({
        name: req.body.name,
        budget: req.body.budget,
      })
      .into('accounts');

    const postAccounts = await db('accounts').where('id', id).first();

    res.status(201).json(postAccounts);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    await db('accounts')
      .update({
        name: req.body.name,
        budget: req.body.budget,
      })
      .where('id', req.params.id);

    //use id to make another select statement to respond with
    const updateAccounts = await db('accounts')
      .where('id', req.params.id)
      .first();
    res.status(201).json(updateAccounts);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await db('accounts').where('id', req.params.id).del();

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
