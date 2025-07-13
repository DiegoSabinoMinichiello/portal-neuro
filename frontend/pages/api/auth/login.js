import prisma from '../../../lib/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email, senha, tipo } = req.body;

  try {
    let user;

    if (tipo === 'admin') {
      user = await prisma.admin.findUnique({ where: { email } });
    } else if (tipo === 'consultor') {
      user = await prisma.consultor.findUnique({ where: { email } });
    } else if (tipo === 'empresa') {
      user = await prisma.empresa.findUnique({ where: { email } });
    } else {
      return res.status(400).json({ error: 'Tipo de usuário inválido' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        tipo: tipo,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.setHeader('Set-Cookie', [
      `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`,
    ]);

    return res.status(200).json({ ok: true, tipo });

  } catch (err) {
    console.error('Erro no login:', err);
    return res.status(500).json({ error: 'Erro no login' });
  }
}
