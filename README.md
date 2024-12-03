# Strapi plugin Excerpt and Seo Generator

## Description
This Strapi plugin allows you to generate excerpt and seo using Groq AI to Strapi. The plugin utilizes Groq REST API to fetch the necessary data, making generating excerpt and seo process efficient and reliable.

## Key Features
* **Generate Excerpt**: Generates Excerpt using Groq AI.
* **Generate Seo**: Generates Seo using Groq AI.

## Required Parameters
To run this project, you need to set up Groq api key environment variable in your `.env` file:

GOOGLE_GENERATE_AI_API_KEY=your_value_here

To generate api key go to https://ai.google.dev/aistudio

## Optional Parameters
To customize the prompt, you can add this environment variable in your `.env` file:

GENERATE_SEO_PROMPT=your_value_here
GENERATE_EXCERPT_PROMPT=your_value_here


## Excerpt Parameters
**title**: The title of the item.
**content**: The content of the item.
**excerpt**: The attribute that accepts generated result.

## Excerpt Parameters Types
**title**: short or long text.
**content**: CKEditor a package for content.
**excerpt**: short or long text.


## Seo Parameters
**metaTitle**: The attribute that accepts generated meta title.
**metaDescription**: The attribute that accepts generated meta description.


## Seo Parameters Types
**metaTitle**: short or long text.
**metaDescription**: short or long text.

Note: Seo must be repeatable component.


## About Shega
Shega is an information and technology company that offers in-depth insights into Ethiopia’s economy by delivering an integrated media, data, and intelligence solution designed to drive informed decision-making and promote innovation.
More at [Visit our website](https://shega.co) 



###  Give a shout-out to Shega
- ⭐ Star our GitHub repo
- 🐞 Create requests, submit bugs, suggest new features
- ☄️  Share to your friends and collegues
- 🔥 Follow us on [Twitter]([https://twitter.com/MelakeWub](https://twitter.com/shegahq)) and [LinkedIn](https://www.linkedin.com/company/shegahq)
