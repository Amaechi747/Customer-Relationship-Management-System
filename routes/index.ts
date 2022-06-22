// var express = require('express');
// var router = express.Router();

import express from 'express';
import { findAllData,findById } from '../models/models';
import {fetchData} from '../utils/utils';


const router = express.Router()


/* GET home page. */
router.get('/', async function(req, res, next){
  // const data = await findAllData();
  res.render('index', { title: 'Home' });
});

//@Register User
//@route POST /register
//@access Public


// router.get('/:id', async function(req, res, next) {
//   const id = Number(req.params.id);
//   const data = await findById(id);
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;
export default router;

