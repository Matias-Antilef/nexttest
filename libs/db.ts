import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma


// Cuando va a crear este modulo va a ejecutar prismaClientSingleton
// y le va a devolver el new prisma client, pero primero confirma si en
// en la app ya existe un prisma si ya existe lo toma, si no, crea uno