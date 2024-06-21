# Eth Evacuations Donation Tracker

## Local development

Current site fetches data from the moralis api proxied through a netlify cloud function.

If you want to run this locally you'll need the netlify cli installed and a netlify auth token as well as a moralis api key. You also need a wallet connect project id for rainbowkit.

Create an env file called `.env.local` based on the example and start the dev server like so

```
$ source .env.local && netlify dev
```
