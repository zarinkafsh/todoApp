This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## How To Run Project

First, run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Dockerize

Create Docker Image:

```bash
docker build -t nextjs-app .
```

Run Container:

```bash
docker run -p 3000:3000 -d nextjs-app
```