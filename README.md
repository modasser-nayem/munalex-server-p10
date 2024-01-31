# Munalex-Server

<a name="readme-top"></a>

### Live API Link: [https://munalex-server.vercel.app/](https://munalex-server.vercel.app/)

<br/>
<!-- ABOUT THE PROJECT -->

## API Documentation

I used postman to do api documentation. Click the link below to view the api documentation.

#### Postman link: [https://documenter.getpostman.com/view/22696421/2s9Yytg168](https://documenter.getpostman.com/view/22696421/2s9Yytg168)

## API Endpoints

- api version: `/api/v1/` add the prefix api url like `https://munalex-server.vercel.app/api/v1/`. After use all api end point.

### User

- **POST**: `/auth/register` - User Registration
- **POST**: `/auth/login` - User Login
- **GET**: `/auth/me` - User profile

### Product

- **POST**: `/products` - Create a product
- **PUT**: `/products/{product_id}` - Update product
- **DELETE**: `/products/{product_id}` - Delete product
- **GET**: `/products` - Get All Product
- **GET**: `/products/{product_id}` - Get single product
- **GET**: `/products/filtering-data` - Get dynamic filtering data based on products

### Sales

- **POST**: `/sales/{product_id}` - Sale a product
- **GET**: `/sales/history` - Get sales history
- **GET**: `/sales/history` - Get all sales

## Getting Started

### 1. Clone the repository:

```
git clone https://github.com/Porgramming-Hero-web-course/l2b2-full-stack-a5-server-side-modasser-nayem

cd l2b2-full-stack-a5-server-side-modasser-naye
```

### 2. Install Dependencies:

```
npm install
```

### 3. Set Environment Variables:

Create a `.env` file in the root directory and define the required environment variables. include necessary variables `DB_URL`, `PORT`, `NODE_ENV`, `BCRYPT_SALT_ROUNDS`, `JWT_ACCESS_SECRET`, `JWT_ACCESS_EXPIRES_IN`.

```
PORT=5000

DB_URL=mongodb://localhost:27017/your-database

NODE_ENV // development or production

BCRYPT_SALT_ROUNDS // bcrypt salt round any number

JWT_ACCESS_SECRET // any string

JWT_ACCESS_EXPIRES_IN // string format like "1d", "1h".
```

### 4. Run the Application:

- For development:

```
npm run dev
```

- For production:

```
npm start
```

### 5. Build the Application:

```
npm run build
```

## Scripts

- `npm run dev`: Start the application in development mode using `ts-node-dev`.
- `npm start`: Start the application in production mode using the compiled `server.js` file.
- `npm run build`: Compile TypeScript files using `tsc`.
- `npm run lint`: Run ESLint to lint TypeScript files.
- `npm run lint:fix`: Run ESLint with the `--fix` option to automatically fix linting issues.
- `npm run format`: Run Prettier to format code.
- `npm run format:fix`: Run Prettier with the `--write` option to automatically fix formatting issues.

## Built With

- Typescript
- Express.js
- Mongodb
- Node.js

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- mongoose
- bcrypt
- jsonwebtoken
- zod
- cors
- dotenv
- eslint
- prettier

<!-- CONTACT -->

## Contact

Ali Modasser Nayem - [Linkedin](https://www.linkedin.com/in/alimodassernayem/) - mdalimodassernayem@gimail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>
