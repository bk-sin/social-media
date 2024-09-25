# Social Media App

This is a **social media application** built using **Next.js**, **Prisma**, and other modern tools. The application provides features for user authentication, posting content, and interacting with posts, among other social media functionalities.

## Features

- **User Authentication**: Login and registration using `username` and `password` with validation powered by `zod`.
- **Responsive UI**: Built with **Tailwind CSS** and **Radix UI** components.
- **Database Management**: Uses **PostgreSQL** with **Prisma ORM** for managing users and content.
- **Image Handling**: Integrated with **ImageKit** for optimized image uploads.
- **Secure Password Management**: Passwords are hashed using **bcrypt**.
- **Form Handling**: Utilizes **react-hook-form** for form validation and management.

## Tech Stack

- **Next.js**: Framework for building the app.
- **Prisma**: ORM for interacting with PostgreSQL.
- **PostgreSQL**: Database used for managing users and social media data.
- **React**: For building the frontend.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Radix UI**: Accessible UI components.
- **Zod**: Schema validation for login and registration.

## Setup

### Prerequisites

- Node.js v18 or later
- PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/social-media.git
   cd social-media
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   - Create a `.env` file and add the following:

     ```bash
     # JWT Secret Key (Usado para firmar y verificar JWT tokens)
     JWT_SECRET="your_jwt_secret_here"

     # ImageKit API (Para gestión de imágenes)
     NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY="your_imagekit_private_key_here"
     NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY="your_imagekit_public_key_here"
     NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT="your_imagekit_url_endpoint_here"

     # PostgreSQL Database Credentials (Asegúrate de configurar esto correctamente)
     POSTGRES_VERCEL_DATABASE="your_database_name_here"
     POSTGRES_VERCEL_HOST="your_postgres_host_here"
     POSTGRES_VERCEL_PASSWORD="your_postgres_password_here"
     POSTGRES_VERCEL_PRISMA_URL="your_prisma_database_url_here"
     POSTGRES_VERCEL_URL="your_postgres_url_here"
     POSTGRES_VERCEL_URL_NON_POOLING="your_non_pooling_postgres_url_here"
     POSTGRES_VERCEL_URL_NO_SSL="your_postgres_no_ssl_url_here"
     POSTGRES_VERCEL_USER="your_postgres_user_here"
     ```

4. Initialize the database with Prisma:

   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev`: Runs the development server.
- `npm run build`: Builds the production version of the app.
- `npm run start`: Starts the production server.
- `npm run prisma:generate`: Generates Prisma client.
- `npm run prisma:migrate`: Runs database migrations.
- `npm run prisma:studio`: Opens Prisma Studio for database management.
- `npm run format`: Formats code using **Prettier**.
- `npm run check`: Checks code formatting using **Prettier**.
- `npm run lint`: Runs **ESLint** to check for code quality.

## Folder Structure

```bash
.
├── prisma                  # Prisma schema and migration files
├── public                  # Static assets
├── src
│   ├── components          # React components
│   ├── pages               # Next.js pages
│   ├── prisma              # Prisma client initialization
│   ├── styles              # Global styles and Tailwind CSS
│   ├── utils               # Utility functions
│   └── config              # Configuration for authentication, validation, etc.
└── package.json
```

## License

This project is licensed under the [MIT License](LICENSE).
