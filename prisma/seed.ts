import { PrismaClient } from "@prisma/client";
import { RolesEnum } from "../src/domain/entities/Role";

const prisma = new PrismaClient();

async function main() {
  const hospital = await prisma.hospital.upsert({
    where: { name: "Hospital Universitário Antonio Pedro" },
    update: {},
    create: {
      name: "Hospital Universitário Antonio Pedro",
    },
  });

  await prisma.user.upsert({
    where: { cpf: "195.407.567-74" },
    update: {},
    create: {
      role_tag: RolesEnum.ADMIN,
      cpf: "195.407.567-74",
      name: "Administrador",
      password: "$2b$10$SCR8CN9B20hftN6rAjyiBeJj4v/hGf17AJy9qMsmu3ZgjxnDxj1/C", //Senha 12345678
      hospital_id: hospital.id,
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
