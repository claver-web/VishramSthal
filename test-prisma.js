const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    const authUserId = "user_2test123";
    const dbUser = await prisma.user.upsert({
      where: { clerkId: authUserId },
      update: {},
      create: {
        clerkId: authUserId,
        email: `user_${authUserId}@example.com`,
        name: 'Guest',
      }
    });
    console.log("Upserted user:", dbUser);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}
run();
