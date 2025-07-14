import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  // Cria Admin se não existir
  const adminExistente = await prisma.admin.findUnique({
    where: { email: 'admin@exemplo.com' },
  });

  if (!adminExistente) {
    await prisma.admin.create({
      data: {
        nome: 'Admin Inicial',
        email: 'admin@exemplo.com',
        senha: hashedPassword,
        tipo: 'admin',
        tel: '(49)99999-9999',
        desc: 'Usuário administrador',
      },
    });
  }

  // Cria Consultor se não existir
  const consultorExistente = await prisma.consultor.findUnique({
    where: { email: 'consultor@exemplo.com' },
  });

  if (!consultorExistente) {
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
  }

  // Cria Empresa se não existir
  const empresaExistente = await prisma.empresa.findUnique({
    where: { email: 'empresa@exemplo.com' },
  });

  if (!empresaExistente) {
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
  }

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
