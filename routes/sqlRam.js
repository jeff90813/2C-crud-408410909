const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.get('/', async function (req, res, next) {
  let data;
  try {
    const [rows] = await db.query('SELECT * FROM ram ORDER BY id ');
    data = rows;
    //res.json(data);
    res.render('crud_ram', { data });
  } catch (err) {
    console.log('Errors on getting ram!');
    res.render('crud_ram', { data: '' });
  }
});

// display add book page
router.get('/add', async function (req, res, next) {
  res.render('crud_ram/add', {
    name: '', 
    clock_rate: '',
    size: '',
    image_url: '',
    ram_ID: '', 
  });
//  res.send('display add book page')
});

// add a new book
router.post('/add', async function (req, res, next) {
//  res.send('Add a new book.')
  const name = req.body.name;
  const clock_rate = req.body.clock_rate;
  const size = req.body.size;
  const image_url = req.body.image_url;
  const ram_ID = req.body.ram_ID;
//  console.log(name, author);
  const from_data = {
    name,
    clock_rate,
    size,
    image_url,
    ram_ID
  };
  try {
    await db.query('INSERT INTO ram SET ?', from_data);
    res.redirect('/crud_ram');
  } catch (err) {
    console.log(err);
    res.render('crud_ram/add', {
      name: from_data.name,
      clock_rate: from_data.clock_rate,
      size: from_data.size,
      image_url: from_data.image_url,
      ram_ID: from_data.ram_ID 
    });
  }
});

// display edit book page
router.get('/edit/:id', async function (req, res, next) {
  //res.send('display edit book page');
  let id = req.params.id;
  try {
    [rows] = await db.query('SELECT * FROM ram WHERE id = ?', [id]);
    res.render('crud_ram/edit', {
      id: rows[0].id,
      name: rows[0].name,
      clock_rate: rows[0].clock_rate,
      size: rows[0].size,
      image_url: rows[0].image_url,
      ram_ID: rows[0].ram_ID
    })
  }catch (err) {
    console.log(err);
  }
});

// update book data
router.post('/update', async function (req, res, next) {
  //res.send('update book data');
  const name = req.body.name;
  const clock_rate = req.body.clock_rate;
  const size = req.body.size;
  const image_url = req.body.image_url;
  const ram_ID = req.body.ram_ID;
  const id = req.body.id;

  try {
    await db.query('UPDATE ram SET name = ?, clock_rate = ?, size = ?, image_url = ?, ram_ID = ? WHERE id = ? ', [
      name,
      clock_rate,
      size, 
      image_url,
      ram_ID,
      id,
    ]);
    //res.status(200).json({ message: 'Updating successful'});
    res.redirect('/crud_ram');
  } catch(err){
    console.log(err);
  }
});

// delete book
router.get('/delete/:id', async function (req, res, next) {
  let id = req.params.id;

  try {
    await db.query('DELETE FROM ram WHERE id = ?', [id]);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/crud_ram');
});

module.exports = router;
