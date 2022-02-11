const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection'),
      cors = require('cors');

const app = express();
app.use(cors())
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    user: 'bsale_test',
    password: 'bsale_test',
    database: 'bsale_test'
  }, 'pool'));

  app.get('/products', (req, res) => {
    req.getConnection((err, conn) => {
      if(err){res.json(err)}
      conn.query('SELECT * FROM product', (err, products) => {
       if (err) {
        res.json(err);
       }
       res.json(products)
    ;
      });
    })});

    app.get('/categories', (req, res) => {
        req.getConnection((err, conn) => {
          if(err) {res.json(err)}
          conn.query('SELECT * FROM category', (err, category) => {
           if (err) {
            res.json(err);
           }
           res.json(category)
          });
        })});
      
    app.get('/query/:search', (req, res) => {
          req.getConnection((err, conn) => {
            if(err){res.json(err)}
            conn.query(`SELECT * FROM product WHERE name LIKE '%${req.params.search}%'`, (err, product) => {
             if (err) {
              res.json(err);
             }
             res.json(product)
            });
          })});
    app.listen(app.get('port'), () => {
        console.log(`server on port ${app.get('port')}`);
      });