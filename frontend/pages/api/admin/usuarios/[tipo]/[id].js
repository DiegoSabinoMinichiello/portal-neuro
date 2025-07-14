import prisma from '../../../../../lib/prisma';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { tipo, id } = req.query;

  const token = req.cookies.token;
  if (!token) return res.status(401).json({ erro: 'Não autorizado' });

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);
    if (usuario.tipo !== 'admin') return res.status(403).json({ erro: 'Acesso negado' });

    if (!['admin', 'consultor', 'empresa'].includes(tipo)) {
      return res.status(400).json({ erro: 'Tipo de usuário inválido' });
    }

    const model = prisma[tipo];

    if (req.method === 'DELETE') {
      await model.delete({ where: { id: Number(id) } });
      return res.status(200).json({ ok: true });
    }

    if (req.method === 'PUT') {
      const { nome, email, senha } = req.body;

      const data = { nome, email };
      if (senha) {
        const bcrypt = await import('bcrypt');
        const hashed = await bcrypt.hash(senha, 10);
        data.senha = hashed;
      }

      const atualizado = await model.update({
        where: { id: Number(id) },
        data,
      });

      return res.status(200).json(atualizado);
    }

    res.status(405).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao processar requisição' });
  }
}
