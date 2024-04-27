# Analytics API

TypeScript | Node.js | Express | CORS | Yandex Cloud Object Storage

A RESTful API has been developed to collect some analytics data.


## Instructions

### 1. **Install the dependencies**

```bash
  npm install
```
### 2. **Data**

In repo in assets folder, you will see a `.data.json-example` file. Rename the file to `.data.json`

### 3. You can **use the following script**:

```bash
  npm run watch
```

- watch: to start the server

### 4. **You can use Postman to interact with database through API Endpoints**

Example of GET request: http://localhost:3000/products


## API Endpoints

| Function | Description | Method | Endpoint |
| - | - | - | - |
| sFirstVisit | Save First Visit | POST | /sFirstVisit |
| sNextVisit | Save Next Visit | POST | /sNextVisit |
| sLinkClick | Save Link Click | POST | /sLinkClick |
| allInfo | Get All Info | GET | /allInfo |
| linkClickAll | Get Links With Amount Of Clicks | GET | /linkClickAll |
| linkClickAllUniqueID | Get Links With Amount Of Clicks By Unique Users | GET | /linkClickAllUniqueID|