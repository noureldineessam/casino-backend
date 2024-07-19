

# 🎉 Casino Management System with a Funky Twist 🎉

Welcome to the **Casino Management System**! 🎸 This cool project combines the power of modern TypeScript with the grooviness of Prisma and Express. Whether you’re rolling slots or managing user histories, this system has got you covered.

## 🌟 **Features** 🌟

- **Get Funky with Users**: Retrieve, create, update, and delete users.
- **Cashout Coolness**: Cashout from user balances with style.
- **Roll the Dice**: Engage in a wild roll and win rewards!
- **Track the Beat**: View user history with smooth transactions.
- **Login/Logout Moves**: Seamlessly handle user logins and logouts.

## 🚀 **Getting Started** 🚀

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (or your favorite database)
- Prisma CLI (`npm install -g prisma`)

### Installation


1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Set Up the Database**

   Create a `.env` file in the root directory and add your database URL:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/mydb"
   ```

3. **Run Prisma Migrations**

   ```bash
   npx prisma migrate dev
   ```

4. **Start the Server**

   ```bash
   npm run dev
   ```

   or alternatively run on a server
   

    ```bash
   npm start
   ```
    

   Your server will be live on `http://localhost:4000`.

## 🎸 **Endpoints** 🎸

Here’s how you can groove with your API:

### **Users**


- **Get User by ID**

  ```http
  GET /users/:id
  ```

- **Create a New User**

  ```http
  POST /users
  ```

- **Delete a User**

  ```http
  DELETE /users/:id
  ```

### **Login/Logout**

- **Login User**

  ```http
  PUT /users/login
  ```

- **Logout User**

  ```http
  PUT /users/logout
  ```

### **Cashout**

- **Cashout User**

  ```http
  PUT /users/cashout
  ```

### **History**

- **Get User History**

  ```http
  GET /users/history/:id
  ```

### **Roll the Machine**

- **Roll**

  ```http
  POST /game/roll
  ```

## 🎨 **Code Overview** 🎨

- **UserService**: Manages users, handling everything from creation to updates and cashouts.
- **GameService**: Handles the funky rolling and reward system.
- **HistoryService**: Keeps track of user transactions.
- **Repositories**: Interact with your database to perform CRUD operations.


## 🎨 **Testing** 🎨

  ```bash
  npm run test
  ```
