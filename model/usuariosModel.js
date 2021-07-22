const fs = require("fs");
const usuarios = require("../database/usuarios.json");
const usuariosController = require("../controller/usuariosController");
const { v4 } = require("uuid");

exports.novoUsuario = ({ nome, email, hashed }) => {
  const id = v4();
  const usuario = {
    id,
    nome,
    email,
    hashed,
  };

  usuarios.push(usuario);

  fs.writeFileSync("./database/usuarios.json", JSON.stringify(usuarios));

  return usuario;
};

exports.findByEmail = ({ email }) => {
  let usuario = usuarios.find((usuario) => usuario.email === email);

  return usuario;
};
