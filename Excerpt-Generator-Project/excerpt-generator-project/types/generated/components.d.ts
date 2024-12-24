import type { Schema, Attribute } from '@strapi/strapi';

export interface SeoSeo extends Schema.Component {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'seo';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String;
    metaDescription: Attribute.Text;
    keywords: Attribute.String;
  };
}

export interface ContentContent extends Schema.Component {
  collectionName: 'components_content_contents';
  info: {
    displayName: 'body';
    description: '';
  };
  attributes: {
    body: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'rich';
        }
      >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'seo.seo': SeoSeo;
      'content.content': ContentContent;
    }
  }
}
