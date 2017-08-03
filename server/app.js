'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes.api);
app.use('/auth', routes.auth);
app.use('/api/contacts', routes.contact);
app.use('/api/notifications', routes.notification);
app.use('/api/payment', routes.payment);
app.use('/api/interest', routes.interests);
app.use('/api/projects', routes.project);
app.use('/api/twilio', middleware.auth.verify, routes.twilio);
app.use('/api/user', middleware.auth.verify, routes.user);

module.exports = app;
