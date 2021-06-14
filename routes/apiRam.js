const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/', async function (req, res, next) {
  let data;
  try {
    const response = await fetch('http://localhost:1337/rams');
    const data = await response.json();
    // const [rows] = await db.query('SELECT * FROM books ORDER BY id desc');
    // data = rows;
    // res.json(data);
    res.render('crud_ram/index', { data });
  } catch (err) {
    console.log('Errors on getting books!');
    res.render('crud_ram/index', { data: '' });
  }
});

router.get('/add', async function (req, res, next) {
  //   res.send('display add book page')
  res.render('crud_ram/add', {
    name: '',
    clock_rate: '',
    size: '',
    image_url: '',
    ram_ID: '',
  });
});

router.post('/add', async function (req, res, next) {
  // res.send('Add a new book.');
  const name = req.body.name;
  const clock_rate = req.body.clock_rate;
  const size = req.body.size;
  const image_url = req.body.image_url;
  const ram_ID = req.body.ram_ID;
  console.log(name, clock_rate, size, image_url, ram_ID);

  const form_data = {
    name,
    clock_rate,
    size, 
    image_url, 
    ram_ID,
  };

  try {
    // await db.query('INSERT INTO books SET ?', form_data);
    const response = await fetch('http://localhost:1337/rams', {
      method: 'post',
      body: JSON.stringify(form_data), 
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    res.redirect('/crud_ram');
  } catch (err) {
    console.log(err);
    res.render('crud_ram/add', {
      name: form_data.name,
      clock_rate: form_data.clock_rate,
      size: form_data.size,
      image_url: form_data.image_url,
      ram_ID: form_data.ram_ID
    });
  }
});




module.exports = router;