import express, { Request, Response, NextFunction } from 'express';
const fs = require('fs');

import dotenv from 'dotenv';
import AWS from 'aws-sdk'; // Import the AWS SDK
dotenv.config();

export const passwordCheck = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.password === process.env.PASSWORD) {
    console.log('Access granted');
    next(); // Call the next middleware function
  } else {
    console.log('Access denied, wrong password');
    res.status(401);
    res.json('Access denied, wrong password');
  }
};

type FirstVisitData = {
  country: string;
  ip: string;
  firstVisit: string;
  id: string;
};

// Create a new S3 object to interact with the Yandex Object Storage
const s3 = new AWS.S3({
  endpoint: 'https://storage.yandexcloud.net',
  accessKeyId: process.env.YC_ACCESS_KEY_ID,
  secretAccessKey: process.env.YC_SECRET_ACCESS_KEY,
});

// Create a new object with the parameters to interact with the Yandex Object Storage
const params = {
  Bucket: 'analyticapi',
  Key: 'data.json',
};

/**
 * Save first visit information
 *
 * @param {Request} req - The request object containing the first visit information to save
 * @param {Response} res - The response with empty object
 */
const sFirstVisit = async (req: Request, res: Response) => {
  try {
    // Create a new object to store the first visit information
    const firstVisitData: FirstVisitData = {
      country: req.body.country,
      ip: req.body.ip,
      firstVisit: req.body.firstVisit,
      id: req.body.id,
    };

    // ------------ Local file system ------------
    // // Read the data from the data.json file and parse it
    // let jsonData = JSON.parse(fs.readFileSync(`${__dirname}/../../assets/data.json`));
    // ------------

    // ------------ Yandex Object Storage ------------
    // Read the data from the data.json file and parse it from the Yandex Object Storage
    const data = await s3.getObject(params).promise();

    // Parse the data from the Yandex Object Storage and check if it is empty to create an empty object
    let jsonData = JSON.parse(data.Body?.toString() || '{}');
    // ------------

    // Check if this id with data already exists, if not add it
    if (jsonData.hasOwnProperty(firstVisitData.id)) {
    } else {
      jsonData[firstVisitData.id] = firstVisitData;
    }

    // Stringify the updated data
    let updatedData = JSON.stringify(jsonData, null, 2);

    // ------------ Local file system ------------
    // // Write the updated data back to the file
    // fs.writeFileSync(`${__dirname}/../../assets/data.json`, updatedData);
    // ------------

    // ------------ Yandex Object Storage ------------
    // Create a new object with the parameters to interact with the Yandex Object Storage
    const putParams = {
      ...params,
      Body: updatedData,
    };
    // Write the updated data back to the Yandex Object Storage
    await s3.putObject(putParams).promise();
    // ------------

    res.json();
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};

type NextVisitData = {
  nextVisit: string;
  id: string;
};

/**
 * Save next visit information
 *
 * @param {Request} req - The request object containing the next visit information to save
 * @param {Response} res - The response with empty object
 */
const sNextVisit = async (req: Request, res: Response) => {
  try {
    // Create a new object to store the next visit information
    const nextVisitData: NextVisitData = {
      nextVisit: req.body.nextVisit,
      id: req.body.id,
    };

    // ------------ Local file system ------------
    // // Read the data from the data.json file and parse it
    // let jsonData = JSON.parse(fs.readFileSync(`${__dirname}/../../assets/data.json`));
    // ------------

    // ------------ Yandex Object Storage ------------
    // Read the data from the data.json file and parse it from the Yandex Object Storage
    const data = await s3.getObject(params).promise();
    // Parse the data from the Yandex Object Storage and check if it is empty to create an empty object
    let jsonData = JSON.parse(data.Body?.toString() || '{}');
    // ------------

    // Check if this user id already exists to add the next visit date or create a new user id with the next visit date
    if (jsonData.hasOwnProperty(nextVisitData.id)) {
      // Check if the next visit date already exists and add it in array with visit date or create a new array with the visit date
      if (jsonData[nextVisitData.id].nextVisit) {
        jsonData[nextVisitData.id].nextVisit.push(nextVisitData.nextVisit);
      } else {
        jsonData[nextVisitData.id].nextVisit = [nextVisitData.nextVisit];
      }
    } else {
      jsonData[nextVisitData.id] = { id: nextVisitData.id, nextVisit: [nextVisitData.nextVisit] };
    }

    // Stringify the updated data
    let updatedData = JSON.stringify(jsonData, null, 2);

    // ------------ Local file system ------------
    // // Write the updated data back to the file
    // fs.writeFileSync(`${__dirname}/../../assets/data.json`, updatedData);
    // ------------

    // ------------ Yandex Object Storage ------------
    // Create a new object with the parameters to interact with the Yandex Object Storage
    const putParams = {
      ...params,
      Body: updatedData,
    };
    // Write the updated data back to the Yandex Object Storage
    await s3.putObject(putParams).promise();
    // ------------

    res.json();
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};

type ClickData = {
  link: string;
  date: string;
  id: string;
};

/**
 * Save click information
 *
 * @param {Request} req - The request object containing the click information to save
 * @param {Response} res - The response with empty object
 */
const sLinkClick = async (req: Request, res: Response) => {
  try {
    // Create a new object to store the click information
    const clickData: ClickData = {
      link: req.body.link,
      id: req.body.id,
      date: req.body.date,
    };

    // ------------ Local file system ------------
    // // Read the data from the data.json file and parse it
    // let jsonData = JSON.parse(fs.readFileSync(`${__dirname}/../../assets/data.json`));
    // ------------

    // ------------ Yandex Object Storage ------------
    // Read the data from the data.json file and parse it from the Yandex Object Storage
    const data = await s3.getObject(params).promise();
    // Parse the data from the Yandex Object Storage and check if it is empty to create an empty object
    let jsonData = JSON.parse(data.Body?.toString() || '{}');
    // ------------

    // Check if this user id already exists to add the click information to it
    if (jsonData.hasOwnProperty(clickData.id)) {

      // Check if the click information already exists and add it in array with click objects or create a new array with the click object
      if (jsonData[clickData.id].click) {
        jsonData[clickData.id].click.push({ link: clickData.link, date: clickData.date });
      } else {
        jsonData[clickData.id].click = [{ link: clickData.link, date: clickData.date }];
      }
    }

    // Save the link click information to the links object
    // Check if the link already exists and add it in array with click objects or create a new array with the click object
    if (!jsonData.hasOwnProperty('links')) {
      jsonData.links = {};
    }

    // Check if the user id exists in the data.json file, if yes add the link click information to the links object with full information else add the link click information with undefined country and first visit
    if (jsonData[clickData.id]) {
      if (jsonData.links[clickData.link]) {
        jsonData.links[clickData.link].push({ id: clickData.id, date: clickData.date, country: jsonData[clickData.id].country, firstVisit: jsonData[clickData.id].firstVisit });
      } else {
        jsonData.links[clickData.link] = [{ id: clickData.id, date: clickData.date, country: jsonData[clickData.id].country, firstVisit: jsonData[clickData.id].firstVisit }];
      }
    } else {
      if (jsonData.links[clickData.link]) {
        jsonData.links[clickData.link].push({ id: clickData.id, date: clickData.date, country: undefined, firstVisit: undefined });
      } else {
        jsonData.links[clickData.link] = [{ id: clickData.id, date: clickData.date, country: undefined, firstVisit: undefined }];
      }
    }

    // Stringify the updated data
    let updatedData = JSON.stringify(jsonData, null, 2);

    // ------------ Local file system ------------
    // // Write the updated data back to the file
    // fs.writeFileSync(`${__dirname}/../../assets/data.json`, updatedData);
    // ------------

    // ------------ Yandex Object Storage ------------
    // Create a new object with the parameters to interact with the Yandex Object Storage
    const putParams = {
      ...params,
      Body: updatedData,
    };
    // Write the updated data back to the Yandex Object Storage
    await s3.putObject(putParams).promise();
    // ------------

    res.json();
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};

/**
 * Get all info from the data.json file
 *
 * @param {Request} _req - The request object (password)
 * @param {Response} res - The response object used to send all the information
 */
const allInfo = async (req: Request, res: Response) => {
  try {
    // Check password for access

    // ------------ Local file system ------------
    // // Read the data from the data.json file and parse it
    // let jsonData = JSON.parse(fs.readFileSync(`${__dirname}/../../assets/data.json`));
    // ------------
    // TODO if (process.env.PASSWORD===req.body.password){}
    // ------------ Yandex Object Storage ------------
    // Read the data from the data.json file and parse it from the Yandex Object Storage
    const data = await s3.getObject(params).promise();
    let jsonData = JSON.parse(data.Body?.toString() || '{}');
    // ------------
    res.json(jsonData);
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};

/**
 * Get info about the links with amount of clicks
 *
 * @param {Request} _req - The request object (password)
 * @param {Response} res - The response object used to send the clicks information
 */
const linkClickAll = async (req: Request, res: Response) => {
  try {
    // ------------ Local file system ------------
    // // Read the data from the data.json file and parse it
    // let jsonData = JSON.parse(fs.readFileSync(`${__dirname}/../../assets/data.json`));
    // ------------

    // ------------ Yandex Object Storage ------------
    // Read the data from the data.json file and parse it from the Yandex Object Storage
    const data = await s3.getObject(params).promise();
    let jsonData = JSON.parse(data.Body?.toString() || '{}');
    // ------------

    // Create array of objects with link and amount of clicks
    let linkClicks = Object.keys(jsonData.links).map((link) => {
      return {
        link: link,
        clicks: jsonData.links[link].length,
      };
    });

    res.json(linkClicks);
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};

/**
 * Get info about the links with amount of clicks by unique users
 *
 * @param {Request} _req - The request object (password)
 * @param {Response} res - The response object used to send the clicks information
 */
const linkClickAllUniqueID = async (req: Request, res: Response) => {
  try {
    // ------------ Local file system ------------
    // // Read the data from the data.json file and parse it
    // let jsonData = JSON.parse(fs.readFileSync(`${__dirname}/../../assets/data.json`));
    // ------------

    // ------------ Yandex Object Storage ------------
    // Read the data from the data.json file and parse it from the Yandex Object Storage
    const data = await s3.getObject(params).promise();
    let jsonData = JSON.parse(data.Body?.toString() || '{}');
    // ------------

    // Create array of objects with link and amount of clicks by unique users
    let linkClicks = Object.keys(jsonData.links).map((link) => {
      // Use a Set to store unique user IDs. uniqueUsers - object with the key representing the user ID
      let uniqueUsers = new Set(jsonData.links[link].map((click: { id: string }) => click.id));

      return {
        link: link,
        clicks: uniqueUsers.size,
      };
    });

    res.json(linkClicks);
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};

// Express routes here

/**
 * Routes for data endpoints
 *
 * @param {express.Application} app - The express application object
 */
const analyticRoutes = (app: express.Application) => {
  // Route to save first visit information
  app.post('/sFirstVisit',passwordCheck, sFirstVisit);

  // Route to save next visit information
  app.post('/sNextVisit',passwordCheck, sNextVisit);

  // Route to save link click information
  app.post('/sLinkClick',passwordCheck, sLinkClick);

  // Route to get all info from data.json
  app.get('/allInfo', passwordCheck, allInfo);

  // Route to get info about the links with amount of clicks
  app.get('/linkClickAll', passwordCheck, linkClickAll);

  // Route to get info about the links with amount of clicks by unique users
  app.get('/linkClickAllUniqueID', passwordCheck, linkClickAllUniqueID);
};

export default analyticRoutes;
