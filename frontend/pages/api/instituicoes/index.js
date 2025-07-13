import prisma from '../../../lib/prisma';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const token = req.cookies.token;
  if (!token) return res.status(401).end();

  const user = jwt.verify(token, process.env.JWT_SECRET);

  if (req.method === 'GET') {
    const instituicoes = await prisma.instituicao.findMany({
      where: { usuarioId: user.id },
    });
    res.json(instituicoes);
  }

  if (req.method === 'POST') {
    const nova = await prisma.instituicao.create({
      data: { ...req.body, usuarioId: user.id },
    });
    res.json(nova);
  }
}
