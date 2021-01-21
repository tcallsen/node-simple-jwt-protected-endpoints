## Overview

Example NodeJS Express server that provides:

- REST endpoint that generates JWT access tokens signed with an X.509 certificate private key
- Example "protected" REST endpoints that require valid JWT bearer tokens
- Express middleware that verifies bearer tokens using the corresponding X.509 certificate public key
- JWT token payload validation to ensure access to the requested urls is granted

## Install

Install the dependencies with the following command:

`npm install`

## Configuration (Env File)

A `.env` file is used to specify SSL Certificate information. Here is an example with the two required keys:

```
# jwt signing certificate configuration
privateKeyPath=<local path to PEM certificate private key file>
publicKeyCertUrl=<url domain where public certificate is hosted, e.g. taylor.callsen.me>
```

## Launch Development Server

To run a build and launch the development server, execute:

`npm start`

## Routes

Once completed, the app should be avialable at the following routes:

#### GET http://localhost:3000/token

Returns a signed JTW token required for all other routes (no credentials necessary).

#### GET http://localhost:3000/token/verify

Verifies the supplied JWT token in the `Authorization` header (bearer token).

#### GET http://localhost:3000/image

Protected endpoint that returns a sample JPEG image file.

#### GET http://localhost:3000/image/metadata

Protected endpoint that returns sample JSON metadata about an image. 

This route is not granted by default, and will return a 401 even with the bearer token. The route must be enabled/uncommented in the `routes/token.js` to become accessible.

## Development Environment

This application was bootstrapped with `express-generator`, and uses `nodemon` to automatically update the Express server when code changes are detected. This example was developed with NodeJS version v14.15.3

## More Information

Here is a blog post I wrote that describes this project in more detail: [https://taylor.callsen.me/protecting-rest-endpoints-with-jwts-end-to-end-guide/](https://taylor.callsen.me/protecting-rest-endpoints-with-jwts-end-to-end-guide/)