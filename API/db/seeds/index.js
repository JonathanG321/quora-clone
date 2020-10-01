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
    isAdmin: true,
    password: 'supersecret',
    passwordConfirmation: 'supersecret',
  });

  await User.bulkCreate(
    Array.from({ length: 5 }).map(() => ({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      image: faker.image.avatar(),
      password: 'supersecret',
      passwordConfirmation: 'supersecret',
    })),
  );

  const users = await User.findAll();

  await Topic.bulkCreate(
    Array.from({ length: randomBetween(10, 17) }).map(() => ({
      name: faker.company.bsNoun(),
      image: faker.image.nightlife(undefined, undefined, true),
    })),
  );

  const topics = await Topic.findAll();

  await Space.bulkCreate(
    topics
      .map((topic) =>
        Array.from({ length: randomBetween(6, 9) }).map(() => ({
          name: faker.company.bsNoun(),
          image: faker.image.avatar(),
          banner: faker.image.nature(undefined, undefined, true),
          tagline: faker.lorem.sentence(),
          description: faker.lorem.paragraphs(5),
          topicId: topic.id,
        })),
      )
      .flat(),
  );

  const spaces = await Space.findAll();

  await Question.bulkCreate(
    users
      .map((user) =>
        Array.from({ length: randomBetween(15, 20) }).map(() => ({
          title: faker.company.catchPhrase(),
          body: faker.lorem.paragraph(),
          userId: user.id,
          spaceId: pickRandom(spaces).id,
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
        Array.from({ length: randomBetween(0, 30) }).map(() => ({
          body: faker.lorem.paragraph(),
          answerId: answer.id,
          userId: pickRandom(users).id,
        })),
      )
      .flat(),
  );

  const replies = await Reply.findAll();

  try {
    await Array.from({ length: randomBetween(14, 17) })
      .map(() => ({
        name: faker.company.bsNoun(),
      }))
      .reduce(async (acc, tag) => {
        try {
          await acc;
          return Tag.create(tag);
        } catch (e) {
          console.error(e);
          return Tag.create(tag);
        }
      }, Promise.resolve());
  } catch (e) {
    console.error(e);
  }

  const tags = await Tag.findAll();

  await Vote.bulkCreate(
    Array.from({ length: randomBetween(2000, 2250) }).map(() => ({
      isUpVote: Math.random() > 0.25,
      userId: pickRandom(users).id,
      answerId: pickRandom(answers).id,
    })),
  );

  const votes = await Vote.findAll();

  await Dislike.bulkCreate(
    Array.from({ length: randomBetween(60, 105) }).map(() => ({
      userId: pickRandom(users).id,
      questionId: pickRandom(questions).id,
    })),
  );

  const dislikes = await Dislike.findAll();

  await Promise.all(
    questions.map((question) => {
      const questionTags = Array.from(
        new Set(Array.from({ length: randomBetween(5, 8) }).map(() => pickRandom(tags))),
      );
      return question.addTags(questionTags);
    }),
  );

  await Promise.all(
    users.map((user) => {
      const userTopics = Array.from(
        new Set(Array.from({ length: randomBetween(4, 6) }).map(() => pickRandom(topics))),
      );
      return user.addTopics(userTopics);
    }),
  );

  await Promise.all(
    users.map((user) => {
      const userSpaces = Array.from(
        new Set(Array.from({ length: randomBetween(10, 15) }).map(() => pickRandom(spaces))),
      );
      return user.addSpaces(userSpaces);
    }),
  );

  printAmountOfModel('users', users.length);
  printAmountOfModel('questions', questions.length);
  printAmountOfModel('answers', answers.length);
  printAmountOfModel('replies', replies.length);
  printAmountOfModel('topics', topics.length);
  printAmountOfModel('spaces', spaces.length);
  printAmountOfModel('tags', tags.length);
  printAmountOfModel('votes', votes.length);
  printAmountOfModel('dislikes', dislikes.length);
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
