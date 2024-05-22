import bcrypt from 'bcrypt';
const hashPassword = async(req, res, next) => {
  const { senha } = req.body;
  const hashedsenha = await bcrypt.hash(senha, 10);
  req.body.senha = hashedsenha;
  next();
};

export default hashPassword