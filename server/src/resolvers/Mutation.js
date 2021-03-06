const { forwardTo } = require('prisma-binding');

const Mutations = {
  async createPin(parent, args, context, info) {
    const pin = await context.db.mutation.createPin(
      { data: { ...args } },
      info
    );
    return pin;
  },
  async updatePin(parent, args, context, info) {
    const updates = { ...args };
    delete updates.id;
    return context.db.mutation.updatePin(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async deletePin(parent, args, context, info) {
    const where = { id: args.id };
    console.log(where);
    const pin = await context.db.query.pin({ where }, `{ id name }`);

    return context.db.mutation.deletePin({ where }, info);
  },
};

module.exports = Mutations;
