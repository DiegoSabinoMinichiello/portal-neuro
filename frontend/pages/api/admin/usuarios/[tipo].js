import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { tipo } = req.query;

  if (!['admin', 'consultor', 'empresa'].includes(tipo)) {
    return res.status(400).json({ error: 'Tipo inválido' });
  }

  try {
    const usuarios = await prisma[tipo].findMany(); // retorna todos os campos
    return res.status(200).json(usuarios);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
}
