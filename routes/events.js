const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { validateJWT } = require('../middleware/validateJWT');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/events');
const { fieldsValidator } = require('../middleware/fieldsValidator');
const { isDate } = require('../helpers/isDate');

router.use(validateJWT);

router.get('/', getEvents);
router.post(
  '/',
  [
    check('title', 'Title is compulsory').not().isEmpty(),
    check('start', 'Start date is compulsory').custom(isDate),
    check('end', 'End date is compulsory').custom(isDate),
    fieldsValidator
  ],
  createEvent
);
router.put(
  '/:id',
  [
    check('title', 'Title is compulsory').not().isEmpty(),
    check('start', 'Start date is compulsory').custom(isDate),
    check('end', 'End date is compulsory').custom(isDate),
    fieldsValidator
  ],
  updateEvent
);
router.delete('/:id', deleteEvent);

module.exports = router;
