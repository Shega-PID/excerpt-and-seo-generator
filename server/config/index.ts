const { ValidationError } = require('@strapi/utils').errors;
export default {
  default: {
    contentTypes: [],
  },
  mySetting: process.env.MY_CUSTOM_PLUGIN_SETTING || 'defaultValue',
};
