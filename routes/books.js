const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.get('/', async function (req, res, next) {
  let data;
  try {
    const [rows] = await db.query('SELECT * FROM books ORDER BY id desc');
    data = rows;
    // res.json(data);
    res.render('books', { data });
  } catch (err) {
    console.log('Errors on getting books!');
    res.render('books', { data: '' });
  }
});

// display add book page
router.get('/add', async function (req, res, next) {
  //   res.send('display add book page')
  res.render('books/add', {
    name: '',
    author: '',
  });
});

// add a new book
router.post('/add', async function (req, res, next) {
  // res.send('Add a new book.');
  const name = req.body.name;
  const author = req.body.author;
  console.log(name, author);

  const form_data = {
    name: name,
    author: author,
  };

  try {
    await db.query('INSERT INTO books SET ?', form_data);
    res.redirect('/books');
  } catch (err) {
    console.log(err);
    res.render('books/add', {
      name: form_data.name,
      author: form_data.author,
    });
  }
});

// display edit book page
router.get('/edit/:id', async function (req, res, next) {
  // res.send('display edit book page');
  const id = req.params.id;
  try {
    const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
    res.render('books/edit', {
      id: rows[0].id,
      name: rows[0].name,
      author: rows[0].author,
    });
  } catch (err) {
    console.log(err);
  }
});

// update book data
router.post('/update', async function (req, res, next) {
  // res.send('update book data');
  const name = req.body.name;
  const author = req.body.author;
  const id = req.body.id;

  try {
    await db.query('UPDATE books SET name = ?, author = ? WHERE id = ?', [
      name,
      author,
      id,
    ]);
    // res.status(200).json({ message: 'Updating successful' });
    res.redirect('/books');
  } catch (err) {
    console.log(err);
  }
});

// delete book
router.delete('/delete/:id', async function (req, res, next) {
  let id = req.params.id;

  try {
    await db.query('DELETE FROM books WHERE id = ?', [id]);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/books');
});

module.exports = router;
