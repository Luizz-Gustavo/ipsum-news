# Ipsum News

![Ipsum News](./ipsumnews.gif)

Welcome to our playground for fast news, designed to provide concise and objective information about the most relevant events of the moment. Ideal for those who want to stay updated in a few minutes, where we combine speed and accuracy to deliver relevant content in a direct and impactful way for you.

### What this project does?

Initially this ficticious project is a simple news website that allows you to read short articles, with basic CRUD operations along with Role-based access control (RBAC) referring to the posts, categories and users.

### What technologies were used?

#### Frontend w/libs

- [React](https://react.dev/)
- [Flowbite React](https://flowbite-react.com/)
- [Ant Design](https://ant.design/)
- [Framer Motion](https://www.framer.com/motion/)
- [Swiper](https://swiperjs.com/)
- [SWR](https://swr.vercel.app/) | [Axios](https://axios-http.com/)

#### Backend | Database

- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)

#### DevOps

- [Docker](https://www.docker.com/) | [Docker-Compose](https://docs.docker.com/compose/install/)

## Pre-requisites

- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/get-started)
- [Docker-Compose](https://docs.docker.com/compose/install/)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Luizz-Gustavo/ipsum-news.git
    cd ipsum-news
    ```

2. **Configure the environment variables:**

    - In all the directories, create a `.env` file and edit following the `.env.example` file as needed for development and production environments.

#### Build and Start Services

To build and start the containers in the **development** environment, execute:
```bash
docker-compose -f docker-compose.dev.yml up --build
```

To build and start the containers for the **production** environment, execute:

```bash
docker-compose -f docker-compose.production.yml up --build
```

## Useful Commands

Here are some useful commands to manage the project:

- **Stop the services:**

    ```bash
    docker-compose down
    ```

- **Restart the services:**

    ```bash
    docker-compose restart
    ```

- **Check the status of the containers:**

    ```bash
    docker-compose ps
    ```

#### Next Steps:

1. With network running and the setup .env files created, proceed with the following commands:

2. Open the terminal in the root directory and enter in the server container

```bash
docker exec -it <server-container-name> sh
```

3. **After entering the server container, create migrations from your Prisma schema:**

```bash
npx prisma migrate dev --name <migration-name>
```

4. **Apply the migrations to the database:**

```bash
npx prisma migrate deploy
```

#### Seed the database with initial data

5. **Still in the server container terminal, run the following command to seed the database with initial data which is in the `prisma/seed.js` file:**

```bash
npm run seed
```
