import { PrismaClient } from "@prisma/client";
import { RolesEnum } from "../src/domain/entities/Role";

const prisma = new PrismaClient();

async function main() {
  const hospital = await prisma.hospital.upsert({
    where: { name: "Hospital Universitário Antônio Pedro" },
    update: {},
    create: {
      name: "Hospital Universitário Antônio Pedro",
    },
  });

  await prisma.user.upsert({
    where: { cpf: "000.000.000-00" },
    update: {},
    create: {
      role: RolesEnum.ADMIN,
      cpf: "000.000.000-00",
      name: "Administrador",
      password: "$2b$10$SCR8CN9B20hftN6rAjyiBeJj4v/hGf17AJy9qMsmu3ZgjxnDxj1/C", //Senha 12345678
      hospitalId: hospital.id,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
