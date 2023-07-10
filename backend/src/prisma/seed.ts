import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.userEntity.upsert({
    where: { userId: 10 },
    update: {},
    create: {
      userId: 10,
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
      typesOfTraining: ['бокс'],
      orders: {
        create: [
          {
            typeOfOrder: 'абонемент',
            trainingId: 12,
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
    where: { userId: 12 },
    update: {},
    create: {
      userId: 12,
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
      typesOfTraining: ['кроссфит'],
    },
  });
  await prisma.userEntity.upsert({
    where: { userId: 13 },
    update: {},
    create: {
      userId: 13,
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
      typesOfTraining: ['стрейчинг', 'бокс'],
    },
  });
  await prisma.userEntity.upsert({
    where: { userId: 14 },
    update: {},
    create: {
      userId: 14,
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
      typesOfTraining: ['бокс'],
    },
  });
  await prisma.userEntity.upsert({
    where: { userId: 15 },
    update: {},
    create: {
      userId: 15,
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
      typesOfTraining: ['бокс', 'стрейчинг', 'аэробика'],
    },
  });
  await prisma.trainingEntity.upsert({
    where: { trainingId: 11 },
    update: {},
    create: {
      trainingId: 11,
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
      trainerId: 3,
      isPromo: true,
      feedbacks: {
        create: [
          {
            userId: 12,
            rating: 2,
            text: 'полный фуфел',
          },
          {
            userId: 13,
            rating: 3,
            text: 'офигеть',
          },
        ],
      },
    },
  });
  await prisma.trainingEntity.upsert({
    where: { trainingId: 17 },
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
      trainerId: 3,
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
