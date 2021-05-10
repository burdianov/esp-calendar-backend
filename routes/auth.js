const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {
  registerUser,
  loginUser,
  refreshToken
} = require('../controllers/auth');
const { fieldsValidator } = require('../middleware/fieldsValidator');
const { validateJWT } = require('../middleware/validateJWT');

router.post(
  '/register',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'Formato de email incorrecto').isEmail(),
    check(
      'password',
      'El password debe de ser de 6 caracteres o mas'
    ).isLength({ min: 6 }),
    fieldsValidator
  ],
  registerUser
);

router.post(
  '/',
  [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'Formato de email incorrecto').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    fieldsValidator
  ],
  loginUser
);

router.get('/refresh-token', validateJWT, refreshToken);

module.exports = router;
