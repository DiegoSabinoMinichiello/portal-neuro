import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, senha, nome, tipo, cnpj } = req.body;

  if (!email || !senha || !nome || !tipo) {
    return res.status(400).json({ error: 'Campos obrigatórios estão faltando.' });
  }

  if (tipo === 'empresa' && !cnpj) {
    return res.status(400).json({ error: 'CNPJ é obrigatório para empresa.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);

    if (tipo === 'admin') {
      const admin = await prisma.admin.create({
        data: { email, senha: hashedPassword, nome, tipo },
      });
      return res.status(201).json({ success: true, id: admin.id });
    }

    if (tipo === 'consultor') {
      const consultor = await prisma.consultor.create({
        data: { email, senha: hashedPassword, nome, tipo },
      });
      return res.status(201).json({ success: true, id: consultor.id });
    }

    if (tipo === 'empresa') {
      const empresa = await prisma.empresa.create({
        data: { email, senha: hashedPassword, nome, tipo, cnpj },
      });
      return res.status(201).json({ success: true, id: empresa.id });
    }

    return res.status(400).json({ error: 'Tipo inválido' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registrar' });
  }
}
