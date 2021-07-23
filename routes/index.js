const express = require('express');
const usuariosController = require('../controller/usuariosController');

const router = express.Router();

router.get('/', (req, res) => {
  const { session } = req;
  const estouLogadoCorretamente = !!session.userId;
  res.render('index', { title: 'Express', session, estouLogadoCorretamente });
});

router.post('/', (req, res) => {
  const {
    nome, email, senha, confirma,
  } = req.body;
  const { id: userId } = usuariosController.cadastrar({
    nome,
    email,
    senha,
    confirma,
  });
  const { session } = req;
  session.userId = userId;

  const estouLogadoCorretamente = !!session.userId;
  res.render('index', {
    title: "USER'S INFO",
    usuario: {
      userId,
      nome,
      email,
      session,
      sessionId: session.id,
      estouLogadoCorretamente,
    },
  });
});

router.use('/logout', (req, res) => {
  const { session } = req;
  delete session.userId;

  res.redirect('/');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const { session } = req;

  /**
   * The estouLogadoCorretamente and the verify of it is convaluted.
   */

  let estouLogadoCorretamente = false;

  if (usuariosController.logar({ email, senha })) {
    estouLogadoCorretamente = true; // A empty line after that one would be great.
    res.render('index', {
      title: 'logado',
      session,
      sessionId: session.id, // You could have destructured the sessionId renaming the variable name
      estouLogadoCorretamente,
    });
  }
  // res.render("Logado com sucesso"); // You should never leave comments like that on your code.
});

module.exports = router;
