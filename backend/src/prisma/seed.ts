import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.postEntity.upsert({
    where: { userId: 1 },
    update: {},
    create: {
      userName: 'Иванов',
      userMail: 'ivanov@gmail.com',
      userAvatar: 'avatar.jpg',
      passwordHash: 'asdfasdfasdf',
      userGender: 'man',
      userRole: 'user',
      description:
        'some descriptionsome descriptionsome descriptionsome description',
      location: '',
      backgraundPicture: '',
      userBody: '',
      trainerBody: '',
      levelOfExperience: '',
      typesOfTraning: '',
      feedbacks: '',
      orders: '',
      personalOrders: '',
    },
  });
}

fillDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();

    process.exit(1);
  });
