# Analytics API

TypeScript | Node.js | Express | CORS | Yandex Cloud Object Storage

A RESTful API that collects some analytics data and saves it to Yandex Cloud Object Storage

## Getting started

1. Find the `.env-example` file in the root directory.
2. Change the name to `.env`
3. To run the project locally without using Yandex Cloud Object Storage, you need to make some changes in the code:

- Open the `routes.ts` file located in the `src/routes` folder.
- Locate the code blocks that is commented out and marked with `// ------------ Local file system ------------`. Uncomment this code.
- Locate the code blocks marked with `// ------------ Yandex Object Storage ------------` and comment it out.

Then, run the following commands in your terminal:

```bash
npm install # to install all project dependencies
npm run watch # to start the development server
```

## **Data**

In the `assets` folder of this repository, you'll find a file named `.data.json`. This file will contain all the collected information.


## **You can use Postman to interact with database through API Endpoints**

Example of a GET request: `http://localhost:3001/allInfo`. You need to include a request body with an object like this: `{"password":"password from .env file"}`.

## API Endpoints

| Function             | Description                                     | Method | Endpoint              |
| -------------------- | ----------------------------------------------- | ------ | --------------------- |
| sFirstVisit          | Save First Visit                                | POST   | /sFirstVisit          |
| sNextVisit           | Save Next Visit                                 | POST   | /sNextVisit           |
| sLinkClick           | Save Link Click                                 | POST   | /sLinkClick           |
| allInfo              | Get All Info                                    | GET    | /allInfo              |
| linkClickAll         | Get Links With Amount Of Clicks                 | GET    | /linkClickAll         |
| linkClickAllUniqueID | Get Links With Amount Of Clicks By Unique Users | GET    | /linkClickAllUniqueID |
