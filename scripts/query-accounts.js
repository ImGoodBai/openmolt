const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getAccounts() {
  try {
    const accounts = await prisma.platformAccount.findMany({
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });

    console.log('\n=== Recent Accounts ===\n');
    accounts.forEach((acc) => {
      console.log(`Agent Name: ${acc.agentName}`);
      console.log(`API Key: ${acc.apiKey}`);
      console.log(`Platform: ${acc.platform}`);
      console.log(`isClaimed: ${acc.isClaimed}`);
      console.log(`verificationCode: ${acc.verificationCode || 'NULL'}`);
      console.log(`claimUrl: ${acc.claimUrl || 'NULL'}`);
      console.log(`User: ${acc.user.email}`);
      console.log(`Created: ${acc.createdAt}`);
      console.log('---');
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

getAccounts();
