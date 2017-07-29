'use strict';
const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers').Notification;

router.route('/')
  .get(NotificationController.getAll)
  .post(NotificationController.create)
;

router.route('/:id')
  .get(NotificationController.getUnread)
  .put(NotificationController.update)
;

module.exports = router;
