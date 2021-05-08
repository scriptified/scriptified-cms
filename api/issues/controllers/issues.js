"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.issues.findOne({ id });
    // We extract more data for the following entities 
    const detailedEntities = await strapi.services.issues.findOne({ id }, [
      "articles",
      "articles.authors",
      "articles.tags",
      "tools",
      "tools.tags",
      "tools.authors",
      "talks",
      "talks.tags",
      "talks.authors",
    ]);

    const sanitizedEntity = sanitizeEntity(entity, {
      model: strapi.models.issues,
    });

    // Replace the articles, talks and tools from the
    // detailed entities
    return {
      ...sanitizedEntity,
      articles: detailedEntities.articles,
      talks: detailedEntities.talks,
      tools: detailedEntities.tools,
    };
  },
};
