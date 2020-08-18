const sequelize = require('../client');
const User = require('../../models/user.model');
const Question = require('../../models/question.model');
const Answer = require('../../models/answer.model');
const Reply = require('../../models/reply.model');
const Space = require('../../models/space.model');
const Topic = require('../../models/topic.model');
const Tag = require('../../models/tag.model');
const Vote = require('../../models/vote.model');
const Dislike = require('../../models/dislike.model');
const faker = require('faker');

async function seed() {
  await sequelize.sync({ force: true });
  const adminUser = await User.create({
    email: 'jon@winterfell.gov',
    firstName: 'Jon',
    lastName: 'Snow',
    password: 'supersecret',
    passwordConfirmation: 'supersecret',
  });

  await User.bulkCreate(
    Array.from({ length: 5 }).map(() => ({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: 'supersecret',
      passwordConfirmation: 'supersecret',
    })),
  );

  const users = await User.findAll();

  await Question.bulkCreate(
    users
      .map((user) =>
        Array.from({ length: randomBetween(5, 9) }).map(() => ({
          title: faker.company.catchPhrase(),
          body: faker.lorem.paragraph(),
          userId: user.id,
        })),
      )
      .flat(),
  );

  const questions = await Question.findAll();

  await Answer.bulkCreate(
    questions
      .map((question) =>
        Array.from({ length: randomBetween(4, 7) }).map(() => ({
          body: faker.lorem.paragraph(),
          questionId: question.id,
          userId: pickRandom(users).id,
        })),
      )
      .flat(),
  );

  const answers = await Answer.findAll();

  await Reply.bulkCreate(
    answers
      .map((answer) =>
        Array.from({ length: randomBetween(2, 5) }).map(() => ({
          body: faker.lorem.paragraph(),
          answerId: answer.id,
          userId: pickRandom(users).id,
        })),
      )
      .flat(),
  );

  const replies = await Reply.findAll();

  await Topic.bulkCreate(
    Array.from({ length: randomBetween(4, 7) }).map(() => ({
      name: faker.company.bsNoun(),
      tagline: faker.lorem.paragraph(),
      description: faker.lorem.paragraphs(5),
    })),
  );

  const topics = await Topic.findAll();

  await Tag.bulkCreate(
    Array.from({ length: randomBetween(14, 17) }).map(() => ({
      name: faker.company.bsNoun(),
    })),
  );

  const tags = await Tag.findAll();

  await Promise.all(
    questions.map((question) => {
      const questionTags = Array.from(
        new Set(Array.from({ length: randomBetween(0, 3) }).map(() => pickRandom(tags))),
      );
      return question.addTags(questionTags);
    }),
  );

  printAmountOfModel('users', users.length);
  printAmountOfModel('questions', questions.length);
  printAmountOfModel('answers', answers.length);
  printAmountOfModel('replies', replies.length);
  printAmountOfModel('topics', topics.length);
  printAmountOfModel('tags', tags.length);
}

seed().then(() => {
  sequelize.close();
});

function printAmountOfModel(name, amount) {
  console.log(`Created ${amount} ${name}`);
}

function randomBetween(start, end) {
  return Math.floor(Math.random() * (end - start)) + start;
}

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}