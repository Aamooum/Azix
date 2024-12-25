# Azix

Azix is a full-stack Next.js application created using Next.js, NextAuth, MongoDB, and Tailwind CSS. This project aims to provide an e-commerce platform with a modern and responsive design.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project Structure

- **Next.js**: The React framework for building modern web applications.
- **NextAuth**: Authentication for Next.js applications.
- **MongoDB**: A NoSQL database for storing data.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/azix.git
```

2. Change to the project directory:

```bash
cd azix
```

3. Install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```env
MONGO_DB_CONNECTION_STRING=your_mongo_db_connection_string
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
NEXTAUTH_SECRET=your_nextauth_secret
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_next_public_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_SECRET_WEBHOOK_KEY=your_stripe_secret_webhook_key
API_KEY=your_api_key
NEXT_PUBLIC_BASE_URL=your_next_public_base_url
```

## Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.