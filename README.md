[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Build](https://github.com/Pantheon-Labs/Jiter-Node/actions/workflows/build.yml/badge.svg)](https://github.com/Pantheon-Labs/Jiter-Node/actions/workflows/build.yml)
[![Code Quality](https://github.com/Pantheon-Labs/Jiter-Node/actions/workflows/quality.yaml/badge.svg)](https://github.com/Pantheon-Labs/Jiter-Node/actions/workflows/quality.yaml)
[![Tests](https://github.com/Pantheon-Labs/Jiter-Node/actions/workflows/tests.yaml/badge.svg)](https://github.com/Pantheon-Labs/Jiter-Node/actions/workflows/tests.yaml)
[![CodeQL](https://github.com/Pantheon-Labs/Jiter-Node/actions/workflows/codeql.yml/badge.svg)](https://github.com/Pantheon-Labs/Jiter-Node/actions/workflows/codeql.yml)
[![codecov](https://codecov.io/gh/Pantheon-Labs/Jiter-Node/branch/main/graph/badge.svg?token=ATLT7VEAAE)](https://codecov.io/gh/Pantheon-Labs/Jiter-Node)
[![npm version](https://badge.fury.io/js/@jiter%2Fnode.svg)](https://badge.fury.io/js/@jiter%2Fnode)

# `@jiter/node`

The official Node SDK for Jiter

<!-- #### 🔎 Looking for API Docs? Check out [`docs.jiter.dev`](https://docs.jiter.dev) -->

## Getting Started

### 1️⃣ Install the Package

```shell
npm i @jiter/node

# or

yarn @jiter/node

```

---

### 2️⃣ Initialize Jiter

```typescript
import Jiter, { JiterConfig } from '@jiter/node';

const config: JiterConfig = { apiKey: 'YOUR_API_KEY' };
Jiter.init(config);
```

🔐 _Do not to include your API key in code; use a package like [`dotenv`](https://www.npmjs.com/package/dotenv) to securely load your token via `process.env`_

<details>
<summary>JavaScript example</summary>

```javascript
const Jiter = require('@jiter/node');

Jiter.init({ apiKey: 'YOUR_API_KEY' });
```

</details>

---

### 3️⃣ Make Your First Event

```typescript
const fifteenMinutesFromNow = new Date(Date.now() + 1000 * 60 * 15);

try {
  const createdEvent = await Jiter.Events.createEvent({
    destination: `${YOUR_API_URL}/webhooks/jiter`,
    payload: 'Hello there!',
    scheduledTime: fifteenMinutesFromNow.toISOString(),
  });

  console.log(createdEvent);
} catch (error) {
  console.error(error);
}
```
