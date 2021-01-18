### Overview

Generates AWS S3 presigned URLs from a NodeJS Express REST endpoint. The endpoint requires a valid JWT token, and returns a 302 redirect to the S3 resource upon success.

The JWT tokens are signed and verified with PEM encoded X.509 SSL Certificates (same certificates used on HTTPS websites). Token validation occurs in an Express middleware.

## Install

Install the dependencies with the following command:

`npm install`

## Configuration (Env File)

A `.env` file is used to specify SSL Certificate and S3 information. An example `.env` file with the required keys is provided below.

```
# jwt signing certificates
privateKeyPath=<local path to PEM certificate private key file>
publicKeyPath=<local path to PEM certificate public key file>

# aws s3
s3AccessKey=<s3 access key>
s3SecretKey=<s3 secret key>
s3region=<s3 region, e.g. us-west-1>
s3Bucket=<s3 bucket name, e.g. callsen-gallery-dev>
```

## Launch Development Server

To run a build and launch the development server, execute:

`npm start`

## Routes

Once completed, the app should be avialable at the following routes:

#### GET http://localhost:3000/token

Returns a signed JTW token required for the other two routes (no credentials necessary).

#### GET http://localhost:3000/token/verify

Verifies the supplied JWT token in the `Authorization` header (bearer token).

#### GET http://localhost:3000/image/<s3-resource-key&gt;

Redirects to a presigned URL for the supplied S3 resource. Requires a valid JWT token in the `Authorization` header (bearer token).

## Development Environment

This application was bootstrapped with `express-generator`, and uses `nodemon` to automatically update the Express server when code changes are detected. This example was developed with Node version v14.15.3
