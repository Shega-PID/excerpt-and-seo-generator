const { ValidationError } = require('@strapi/utils').errors;
export default {
  default: {
    contentTypes: [],
  },
  validator(config) {
    config.contentTypes.forEach((entry) => {
      console.log(">> log entries",entry);
      
      if (!entry.title) {
        throw new ValidationError('Missing title prop.');
      }
      if (!entry.description) {
        throw new ValidationError('Missing description prop.');
      }
    }
  )},
};
