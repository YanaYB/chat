# Chat Backend

Backend web server based on Node.js + Fastify + Mongodb to interact with AI (OpenAI / OpenRouter).

---

## How to run

1. **Clone the repo**

```
git clone git@github.com:YanaYB/chat.git
```

2. **Install dependencies**

```
npm install
```

3. **Configure .env (or copy from example and paste OpenAI key)**

```
OPENAI_API_KEY=sk-proj-********
OPENAI_MODEL=openai/gpt-4o-mini
DATABASE_URL=mongodb://localhost:27017
DB_NAME=chat
PORT=3000
MAX_CONTEXT_MESSAGES=10
```

4. **Run MongoDB (for example with docker)**

```
docker run -d --name my-mongo-database -p 27017:27017 mongo
```

5. **Start with Node.js**

```
npm start
```

## Used
**NodeJS + npm:**
- fastify
- fastify-plugin
- dotenv
- mongodb
- openai

For curl examples, check [`./CURL-X.md`](./CURL-X.md)


