const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    user: 'bsale_test',
    password: 'bsale_test',
    database: 'bsale_test'
  }, 'single'));

  app.get('/products', (req, res) => {
    req.getConnection((err, conn) => {
      conn.query('SELECT * FROM product', (err, products) => {
       if (err) {
        res.json(err);
       }
       res.json(products)
      });
    })});

    app.get('/categories', (req, res) => {
        req.getConnection((err, conn) => {
          conn.query('SELECT * FROM category', (err, category) => {
           if (err) {
            res.json(err);
           }
           res.json(category)
          });
        })}); 
    app.listen(app.get('port'), () => {
        console.log(`server on port ${app.get('port')}`);
      });