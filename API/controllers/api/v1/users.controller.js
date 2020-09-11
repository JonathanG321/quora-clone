const Sequelize = require('sequelize');
const User = require('../../../models/user.model');
const Topic = require('../../../models/topic.model');
const Space = require('../../../models/space.model');
const Question = require('../../../models/question.model');
const Answer = require('../../../models/answer.model');
const Reply = require('../../../models/reply.model');
const Vote = require('../../../models/vote.model');
const { RecordNotFoundError } = require('../../api.controller');

module.exports = {
  async create(request, response, next) {
    try {
      const { firstName, lastName, password = '', passwordConfirmation, email = '' } = request.body;
      const newUser = {
        firstName,
        lastName,
        password,
        passwordConfirmation,
        email: email.toLowerCase(),
      };
      const user = await User.create(newUser);
      request.session.userId = user.id;
      response.json({ id: user.id });
    } catch (e) {
      next(e);
    }
  },
  async update(request, response, next) {
    try {
      const { id } = request.params;
      const { firstName, lastName } = request.body;
      const newUser = {
        firstName,
        lastName,
      };
      const user = await User.update(newUser, { where: id });
      response.json({ user });
    } catch (e) {
      next(e);
    }
  },
  async show(request, response, next) {
    try {
      const { id } = request.params;
      const user = await User.findOne({ where: { id } });
      if (!user) {
        throw new RecordNotFoundError(User, id);
      }
      response.json({ user });
    } catch (e) {
      next(e);
    }
  },
  async currentUser(request, response, next) {
    try {
      const currentUser = await User.findOne({
        where: { id: response.locals.currentUser.id },
        include: [
          {
            model: Topic,
            required: false,
            include: {
              model: Space,
              required: false,
              include: {
                model: Question,
                required: false,
                include: [
                  { model: User, required: false },
                  {
                    model: Answer,
                    required: false,
                    include: [
                      { model: Vote, required: false },
                      { model: Reply, required: false, include: { model: User } },
                      { model: User },
                    ],
                  },
                ],
              },
            },
          },
          {
            model: Space,
            required: false,
            include: {
              model: Question,
              required: false,
              include: [
                { model: User, required: false },
                {
                  model: Answer,
                  required: false,
                  include: [
                    { model: Vote, required: false },
                    { model: Reply, required: false, include: { model: User } },
                    { model: User, required: false },
                  ],
                },
              ],
            },
          },
        ],
      });
      response.json(currentUser);
    } catch (e) {
      next(e);
    }
  },
};

// include: [
//   {
//     model: Topic,
//     required: false,
//     include: {
//       model: Space,
//       required: false,
//       include: {
//         model: Question,
//         required: false,
//         include: [
//           { model: User, required: false },
//           {
//             model: Answer,
//             required: false,
//             include: [
//               { model: Reply, required: false, include: { model: User, required: false } },
//               { model: User, required: false },
//             ],
//           },
//         ],
//       },
//     },
//   },
//   {
//     model: Space,
//     required: false,
//     include: {
//       model: Question,
//       required: false,
//       include: [
//         { model: User, required: false },
//         {
//           model: Answer,
//           required: false,
//           include: [
//             { model: Reply, required: false, include: { model: User, required: false } },
//             { model: User, required: false },
//           ],
//         },
//       ],
//     },
//   },
// ]
