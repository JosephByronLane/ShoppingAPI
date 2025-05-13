Hi, this is literally the very first API I ever wrote, even before knowing what a backend *really* was. I've improved alot since then, but am keeping this up for nostalgia's sake.

# Shopping API 

## So, what can it do?

This API handles the core functionalities you'd expect from a shopping service:

*   **User Management**: Your usual CRUD for managing users for the shopping platform.
*   **Product Listings**: Browse products, view details, and manage the product catalog.
*   **Special Promotions**: A special section dedicated to products on promotion
*   **Purchases/Orders**: Handle the shopping cart and order processing.
*   **Authentication**: Secure endpoints using JWT.
*   **Rate limiting**: Rate limiting of the API requests on short-term and long-term.

## What I used 

*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Language**: TypeScript
*   **Database**: MySQL with TypeORM (as the ORM)
*   **Authentication**: JSON Web Tokens 
*   **Validation**: Joi 
*   **Process Management**: PM2 for running in production

## Getting Started 

To run this on your machine theres a few things you need to do:

1.  **Prerequisites**:
    *   Node.js (latest LTS version recommended)
    *   npm (usually comes with Node.js)
    *   Some SQL database.

2.  **Clone the repo**:
    ```bash
    git clone <your-repository-url>
    ```

3.  **Install dependencies**:
    ```bash
    npm install
    ```

4.  **Set up environment variables**:
    *   You'll likely need to create a `.env` file in the root directory.
    *   Due to my inexperience when I wrote this, I already have a `.env` bundled with the repository you can use! 
    *   Common variables you'll need to define would be database connection details (host, port, user, password, database name), JWT secret, etc. (Peek into `src/db.ts` and where `process.env` is used)

5.  **Database Setup**:
    *   Make sure your MySQL server is running.
    *   You can find a database schema script in the `SQL/` directory (`DatabaseSchemaSQL_Script.sql`). You'll need to run this against your MySQL instance to set up the tables.
    *   There are also seed scripts (`users-seed.ts`, `add-products.ts`, `admin-seed.ts` in `src/`) which you uncomment from `index.ts` to populate the database with some initial data.

6.  **Run the app**:
    *   For development (with auto-reloading):
        ```bash
        npm run devpm2
        ```
    *   To build and run for production (using PM2):
        ```bash
        npm run start
        ```

## API Endpoints Overview 🌐

The API provides several groups of endpoints:

*   `/users` - For user registration and management.
*   `/login` - For authentication.
*   `/products` - For accessing and managing products.
*   `/promotional-products` - For products on sale.
*   `/compras` (Purchases/Orders) - For managing customer orders.



