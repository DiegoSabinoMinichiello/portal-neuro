import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const token = req.cookies.token;
  if (!token) return res.status(401).end();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, tipo } = decoded;

    let user = null;

    if (tipo === 'admin') {
      user = await prisma.admin.findUnique({
        where: { id },
        select: { id: true, nome: true, email: true, tipo: true }
      });
    } else if (tipo === 'consultor') {
      user = await prisma.consultor.findUnique({
        where: { id },
        select: { id: true, nome: true, email: true, tipo: true }
      });
    } else if (tipo === 'empresa') {
      user = await prisma.empresa.findUnique({
        where: { id },
        select: { id: true, nome: true, email: true, tipo: true }
      });
    }

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    res.status(200).json({ user });

  } catch (err) {
    console.error(err);
    res.status(401).end();
  }
}
