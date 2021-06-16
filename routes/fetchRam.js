const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/', async function (req, res, next) {
  let data;
  try {
    const response = await fetch('https://g10-project2.herokuapp.com/rams');
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
    const response = await fetch('https://g10-project2.herokuapp.com/rams', {
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

// display edit book page
router.get('/edit/:id', async function (req, res, next) {
  // res.send('display edit book page');
  const id = req.params.id;
  try {
    // const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
    const response = await fetch(`https://g10-project2.herokuapp.com/rams/${id}`);
    const data = await response.json();
    res.render('crud_ram/edit', {
      id: data.id,
      name: data.name,
      clock_rate: data.clock_rate,
      size: data.size,
      image_url: data.image_url,
      ram_ID: data.ram_ID
    });
  } catch (err) {
    console.log(err);
  }
});

// update book data
router.post('/update', async function (req, res, next) {
  // res.send('update book data');
  const id = req.body.id;
  const name = req.body.name;
  const clock_rate = req.body.clock_rate;
  const size = req.body.size;
  const image_url = req.body.image_url;
  const ram_ID = req.body.ram_ID;
  console.log(name, clock_rate, size, image_url, ram_ID,id);

  const form_data = {
    name,
    clock_rate,
    size, 
    image_url, 
    ram_ID,
  };
  try {
    const response = await fetch(`https://g10-project2.herokuapp.com/rams/${id}`, {
      method: 'put',
      body: JSON.stringify(form_data), 
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    // await db.query('UPDATE books SET name = ?, author = ? WHERE id = ?', [
    //   name,
    //   author,
    //   id,
    // ]);
    // res.status(200).json({ message: 'Updating successful' });
    res.redirect('/crud_ram');
  } catch (err) {
    console.log(err);
  }
});

// delete book
router.delete('/delete/:id', async function (req, res, next) {
  let id = req.params.id;

  try {
    // await db.query('DELETE FROM books WHERE id = ?', [id]);
    const response = await fetch(`https://g10-project2.herokuapp.com/rams/${id}`, {
      method: 'delete',
    });
    const data = await response.json();
  } catch (err) {
    console.log(err);
  }
  res.redirect('/crud_ram');
});


module.exports = router;