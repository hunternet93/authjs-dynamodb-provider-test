# Auth.js DynamoDB adapter + SendGrid issue

This is the default create-next-app template with a basic Auth.js config. The SendGrid provider and DynamoDB adapter are used.

### Using local DynamoDB
A local DynamoDB instance has been configured using Docker Compose. It may be started with:

```bash
docker compose up -d
```

Then the included `./recreate-local-dynamodb-tables.sh` script can be used to (re)create the `next-auth` table.

### Configuration
The following env vars are required in `.env.local`:

```bash
AUTH_SECRET="" # `npx auth`
DYNAMODB_ENDPOINT="http://localhost:8000/" # Local DynamoDB instance started with docker compose
DYNAMODB_REGION="localhost"
DYNAMODB_ID="localinstance"
DYNAMODB_SECRET="localinstance"
AUTH_SENDGRID_KEY="" # A SendGrid API key. (A different email adapter would likely also have similar results.)
AUTH_SENDGRID_FROM="" # From address for SendGrid
```

### Usage

1. Set up the demo app as described in the README.md
2. Start with `npm run dev` and open `http://localhost:3000`
3. A login form will appear. Enter a valid email address in the input and click the button.
4. SendGrid should send a login email to the address. Once received, click the link.
5. The process will appear to work, but you will not be logged in (`await auth()` returns `null`).
6. Try steps 3-5 again with the same email.
7. You'll get an error page, with this exception in console:

```
[auth][error] CallbackRouteError: Read more at https://errors.authjs.dev#callbackrouteerror
[auth][cause]: Error: Missing or invalid provider account
    at handleLoginOrRegister (webpack-internal:///(rsc)/./node_modules/@auth/core/lib/actions/callback/handle-login.js:24:15)
    at Module.callback (webpack-internal:///(rsc)/./node_modules/@auth/core/lib/actions/callback/index.js:181:142)
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async AuthInternal (webpack-internal:///(rsc)/./node_modules/@auth/core/lib/index.js:43:24)
    at async Auth (webpack-internal:///(rsc)/./node_modules/@auth/core/index.js:130:34)
    [remaining lines omitted]
```