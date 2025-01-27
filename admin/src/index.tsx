import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import GenerateButton from './components/GenerateButton';
import Magic from '@strapi/icons/Magic.js';
const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);


    app.injectContentManagerComponent('editView', 'right-links', {
      name: pluginId,
      Component: GenerateButton,
    });
    app.addMenuLink({
      to: `/plugins/${pluginId}`, // Path for the plugin page
      icon: Magic, // Icon component
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Excerpt SEO",
      },
      Component: ()=>import('../src/pages/App'), // Page to load
      permissions: [], // Add necessary permissions if required
    });
  },

  bootstrap(app: any) { },

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
