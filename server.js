import express from 'express';
import http from 'http';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';

import AppComponent from './components/app';
import IndexComponent from './components/index';

const routes = {
  path: '',
  component: AppComponent,
  childRoutes: [
    {
      path: '/',
      component: IndexComponent
    }
  ]
}

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('*', (req, res) => {
  // routes is our object of React routes defined above
  match({ routes, location: req.url }, (err, redirectLocation, props) => {
    if (err) {
      //went wrong, render 500
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      //match ReactRouter redirect – redirect from server
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
      //props == valid component to render for route
      const markup = renderToString(<RoutingContext {...props} />);
      //render 'index.ejs', but pass in the markup we want it to display
      res.render('index', { markup })
    } else {
      // no route match, so 404
      res.sendStatus(404);
    }
  });
});

const server = http.createServer(app);

server.listen(3333);
server.on('listening', () => {
  console.log('Listening on 3333');
});