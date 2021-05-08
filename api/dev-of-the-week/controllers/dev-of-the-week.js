"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const parseEntity = entity => ({
    name: entity.name,
    bio: entity.bio,
    profileImg: entity.profileImg,
    profileLink: {
      website: entity.website || undefined,
      twitter: entity.twitter || undefined,
      github: entity.github || undefined,
      youtube: entity.youtube || undefined,
      linkedin: entity.linkedin || undefined,
      instagram: entity.instagram || undefined,
    },
  });

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services['dev-of-the-week'].search(ctx.query);
    } else {
      entities = await strapi.services['dev-of-the-week'].find(ctx.query);
    }

    const sanitizedEntities = entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models['dev-of-the-week'] })
    );

    const parsedEntities = sanitizedEntities.map((entity) => parseEntity(entity));

    return parsedEntities;
  },

  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services['dev-of-the-week'].findOne({ id });
    const sanitizedEntity = sanitizeEntity(entity, { model: strapi.models['dev-of-the-week'] });

    return parseEntity(sanitizedEntity);
  },

};
