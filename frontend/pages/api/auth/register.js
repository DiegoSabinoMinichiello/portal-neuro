import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, senha, nome, tipo, tel = '', desc = '', cnpj = null } = req.body;

  if (!email || !senha || !nome || !tipo) {
    return res.status(400).json({ error: 'Dados obrigatórios faltando.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(senha, 10); // <--- HASH AQUI
    let novoUsuario;

    if (tipo === 'admin') {
      novoUsuario = await prisma.admin.create({
        data: { email, senha: hashedPassword, nome, tel, desc, tipo },
      });
    } else if (tipo === 'consultor') {
      novoUsuario = await prisma.consultor.create({
        data: { email, senha: hashedPassword, nome, tel, desc, tipo },
      });
    } else if (tipo === 'empresa') {
      novoUsuario = await prisma.empresa.create({
        data: { email, senha: hashedPassword, nome, tel, desc, tipo, cnpj },
      });
    } else {
      return res.status(400).json({ error: 'Tipo de usuário inválido.' });
    }

    return res.status(201).json(novoUsuario);
  } catch (err) {
    console.error('Erro ao registrar usuário:', err);

    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'Email já cadastrado.' });
    }

    return res.status(500).json({ error: 'Erro no servidor ao registrar.' });
  }
}
