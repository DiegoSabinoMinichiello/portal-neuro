import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const token = req.cookies.token;
  if (!token) return res.status(401).end();
  const user = jwt.verify(token, process.env.JWT_SECRET);

  const { id } = req.query;

  if (req.method === 'PUT') {
    const updated = await prisma.instituicao.update({
      where: { id: parseInt(id), usuarioId: user.id },
      data: req.body,
    });
    res.json(updated);
  }

  if (req.method === 'DELETE') {
    await prisma.instituicao.delete({
      where: { id: parseInt(id), usuarioId: user.id },
    });
    res.json({ ok: true });
  }
}
