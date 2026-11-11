# @tradelco/strapi-provider-mailchimp

## Resources

- [LICENSE](LICENSE)

## Links

- [Strapi website](https://strapi.io/)
- [Strapi documentation](https://docs.strapi.io)
- [Strapi community on Discord](https://discord.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)

## Installation

```bash
# using yarn
yarn add @tradelco/strapi-provider-mailchimp

# using npm
npm install @tradelco/strapi-provider-mailchimp --save
```

Published to GitHub Packages. Add to `.npmrc` (token with `read:packages`):

```
@tradelco:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

## Configuration

| Variable                | Type                    | Description                                                                                                             | Required | Default   |
| ----------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------- | --------- |
| provider                | string                  | The name of the provider you use                                                                                        | yes      |           |
| providerOptions         | object                  | Provider options                                                                                                        | yes      |           |
| providerOptions.apiKey  | object                  | Mailchimp Transactional API key. Please refer to [@mailchimp/mailchimp_transactional](https://www.npmjs.com/package/@mailchimp/mailchimp_transactional) | yes      |           |
| settings                | object                  | Settings                                                                                                                | no       | {}        |
| settings.defaultFrom    | string                  | Default sender mail address                                                                                             | no       | undefined |

> :warning: The Shipper Email (or defaultfrom) may also need to be changed in the `Email Templates` tab on the admin panel for emails to send properly

### Example

**Path -** `config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  email: {
    config: {
      provider: '@tradelco/strapi-provider-mailchimp',
      providerOptions: {
        apiKey: env('MAILCHIMP_API_KEY'),
      },
      settings: {
        defaultFrom: 'myemail@mydomain.com',
      },
    },
  },
  // ...
});
```
