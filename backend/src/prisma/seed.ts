import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.userEntity.upsert({
    where: { userId: 1 },
    update: {},
    create: {
      userId: 1,
      userName: 'Иванов',
      userMail: 'ivanov@gmail.com',
      userAvatar: 'avatar.jpg',
      passwordHash: 'asdfasdfasdf',
      userGender: 'мужской',
      userRole: 'client',
      description:
        'some descriptionsome descriptionsome descriptionsome description',
      location: 'Пионерская',
      clientBody: {
        create: {
          timeOfTraining: '10-30 мин',
          caloryLosingPlanTotal: 1000,
          caloryLosingPlanDaily: 1500,
          readinessForTraining: true,
        },
      },
      backgraundPicture: 'backgraundPicture.jpg',
      levelOfExperience: 'новичок',
      typesOfTraning: ['бокс'],
      orders: {
        create: [
          {
            typeOfOrder: 'абонемент',
            trainingId: 2,
            price: 100,
            qtt: 1000,
            typeOfPayment: 'visa',
          },
        ],
      },
      friends: [5, 4],
    },
  });
  await prisma.userEntity.upsert({
    where: { userId: 2 },
    update: {},
    create: {
      userId: 2,
      userName: 'Иванов1',
      userMail: 'ivanov1@gmail.com',
      userAvatar: 'avatar1.jpg',
      passwordHash: 'asdfasdfasdf',
      userGender: 'мужской',
      userRole: 'trainer',
      description:
        'some descriptionsome descriptionsome descriptionsome description',
      location: 'Петроградская',
      trainerBody: {
        create: {
          sertificate: '10-30 мин',
          merit: '1000',
          readinessForPrivate: true,
        },
      },
      backgraundPicture: 'backgraundPicture1.jpg',
      levelOfExperience: 'профессионал',
      typesOfTraning: ['кроссфит'],
    },
  });
  await prisma.userEntity.upsert({
    where: { userId: 3 },
    update: {},
    create: {
      userId: 3,
      userName: 'Stepanova',
      userMail: 'Stepanova@gmail.com',
      userAvatar: 'avatar11.jpg',
      passwordHash: 'asdfa1sdfasdf',
      userGender: 'женский',
      userRole: 'trainer',
      description:
        'some descriptionsome descriptionsome descriptionsome description',
      location: 'Петроградская',
      trainerBody: {
        create: {
          sertificate: 'sertificate.pdf',
          merit: 'descriptionsome',
          readinessForPrivate: false,
        },
      },
      backgraundPicture: 'backgraunure1.jpg',
      levelOfExperience: 'профессионал',
      typesOfTraning: ['стрейчинг', 'бокс'],
    },
  });
  await prisma.userEntity.upsert({
    where: { userId: 4 },
    update: {},
    create: {
      userId: 4,
      userName: 'Рабинович',
      userMail: 'рябинович@gmail.com',
      userAvatar: 'avatar545.jpg',
      passwordHash: 'asdfasdfasdf',
      userGender: 'мужской',
      userRole: 'client',
      description:
        'some йцукйцукйцуdescriptionsome descriptionsome descriptionsome description',
      location: 'Пионерская',
      clientBody: {
        create: {
          timeOfTraining: '80-100 мин',
          caloryLosingPlanTotal: 1000,
          caloryLosingPlanDaily: 1500,
          readinessForTraining: true,
        },
      },
      backgraundPicture: 'backgraundPi333cture.jpg',
      levelOfExperience: 'профессионал',
      typesOfTraning: ['бокс'],
    },
  });
  await prisma.userEntity.upsert({
    where: { userId: 5 },
    update: {},
    create: {
      userId: 5,
      userName: 'Чингис Хан',
      userMail: 'ура@gmail.com',
      userAvatar: '1avatar545.jpg',
      passwordHash: '1asdfasdfasdf',
      userGender: 'мужской',
      userRole: 'client',
      description:
        'фвыаsome йцукйцукйцуdescriptionsome descriptionsome descriptionsome description',
      location: 'Спортивная',
      clientBody: {
        create: {
          timeOfTraining: '80-100 мин',
          caloryLosingPlanTotal: 1000,
          caloryLosingPlanDaily: 1500,
          readinessForTraining: true,
        },
      },
      backgraundPicture: '11backgraundPi333cture.jpg',
      levelOfExperience: 'любитель',
      typesOfTraning: ['бокс', 'стрейчинг', 'аэробика'],
    },
  });
  await prisma.trainingEntity.upsert({
    where: { trainingId: 1 },
    update: {},
    create: {
      trainingId: 1,
      title: 'йога_1.070.23',
      backgroundPicture: 'backgroundPicture.jpg',
      levelOfUser: 'профессионал',
      typeOfTraining: 'йога',
      duration: '80-100 мин',
      price: 100,
      caloriesQtt: 1000,
      description: 'приходите не пожалеете',
      trainingGender: 'для всех',
      video: 'xxx.mov',
      rating: 2,
      trainer: 3,
      isPromo: true,
      feedbacks: {
        create: [
          {
            userId: 1,
            rating: 2,
            text: 'полный фуфел',
          },
          {
            userId: 2,
            rating: 3,
            text: 'офигеть',
          },
        ],
      },
    },
  });
  await prisma.trainingEntity.upsert({
    where: { trainingId: 7 },
    update: {},
    create: {
      trainingId: 7,
      title: 'бокс_23.070.23',
      backgroundPicture: 'backgroundPicture.jpg',
      levelOfUser: 'профессионал',
      typeOfTraining: 'бокс',
      duration: '80-100 мин',
      price: 1000,
      caloriesQtt: 1000,
      description: 'приходите не пожалеете опять',
      trainingGender: 'для всех',
      video: 'xxx.mov',
      rating: 0,
      trainer: 3,
      isPromo: true,
    },
  });
  console.info('🤘️ Database was filled');
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
