import prisma from '../../../../lib/prisma';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ erro: 'Não autorizado' });

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);
    if (usuario.tipo !== 'admin') return res.status(403).json({ erro: 'Acesso negado' });

    const [admins, consultores, empresas] = await Promise.all([
      prisma.admin.findMany({ select: { id: true, nome: true, email: true } }),
      prisma.consultor.findMany({ select: { id: true, nome: true, email: true } }),
      prisma.empresa.findMany({ select: { id: true, nome: true, email: true } }),
    ]);

    const usuarios = [
      ...admins.map((u) => ({ ...u, tipo: 'admin' })),
      ...consultores.map((u) => ({ ...u, tipo: 'consultor' })),
      ...empresas.map((u) => ({ ...u, tipo: 'empresa' })),
    ];

    res.status(200).json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao carregar usuários' });
  }
}
