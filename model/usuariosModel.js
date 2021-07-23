const fs = require('fs');
const { v4 } = require('uuid');
const usuarios = require('../database/usuarios.json');

exports.novoUsuario = ({ nome, email, hashed }) => {
  const id = v4();
  const usuario = {
    id,
    nome,
    email,
    hashed,
  };

  usuarios.push(usuario);

  fs.writeFileSync('./database/usuarios.json', JSON.stringify(usuarios));

  return usuario;
};

/**
 * This could be an arrow function
 *
 * exports.findByEmail = ({ email }) => usuarios.find((item) => item.email === email);
 */

exports.findByEmail = ({ email }) => {
  const usuario = usuarios.find((item) => item.email === email);

  return usuario;
};
