const bcryptjs = require('bcryptjs');
const usuariosModel = require('../model/usuariosModel');

exports.cadastrar = ({
  nome, email, senha, confirma,
}) => {
  if (senha !== confirma) {
    throw new Error('As senhas não conferem');
  }

  if (usuariosModel.findByEmail({ email })) {
    throw new Error('Usuario ja cadastrado');
  }

  const hashed = bcryptjs.hashSync(senha);
  return usuariosModel.novoUsuario({ nome, email, hashed });
};

exports.logar = ({ email, senha }) => {
  const usuarioSalvo = usuariosModel.findByEmail({ email });

  if (!usuarioSalvo) {
    throw new Error('Usuario nao cadastrado');
  }

  if (!bcryptjs.compareSync(senha, usuarioSalvo.hashed)) {
    throw new Error('Senha invalida');
  }

  return usuarioSalvo;
};
