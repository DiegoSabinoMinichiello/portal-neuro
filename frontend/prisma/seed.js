import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  // Cria admin
  await prisma.admin.create({
    data: {
      nome: 'Admin Inicial',
      email: 'admin@exemplo.com',
      senha: hashedPassword,
      tipo: 'admin',
      tel: '(49)99999-9999',
      desc: 'Usuario administrador',
    },
  });

  // Cria consultor
  await prisma.consultor.create({
    data: {
      nome: 'Consultor Inicial',
      email: 'consultor@exemplo.com',
      senha: hashedPassword,
      tipo: 'consultor',
      tel: '(49)99999-9999',
      desc: 'Ofereço consultoria de Marketing',
    },
  });

  // Cria empresa
  await prisma.empresa.create({
    data: {
      nome: 'Empresa Inicial',
      email: 'empresa@exemplo.com',
      senha: hashedPassword,
      tipo: 'empresa',
      tel: '(49)99999-9999',
      desc: 'Busco consultoria de Marketing',
      cnpj: '12.345.678/0001-90',
    },
  });

  console.log('Seed concluído!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
