import express, { Request, Response } from 'express';
const fs = require('fs');
import path from 'path';



const filePath = path.join("/tmp", "data.json");

type FirstVisitData = {
  country: string;
  ip: string;
  firstVisit: string;
  id: string;
};

/**
 * Save first visit information
 *
 * @param {Request} req - The request object containing the first visit information to save
 * @param {Response} res - The response with empty object
 */
const sFirstVisit = async (req: Request, res: Response) => {
  //console.log('req.body', req.body);
  try {
    // Create a new object to store the first visit information
    const firstVisitData: FirstVisitData = {
      country: req.body.country,
      ip: req.body.ip,
      firstVisit: req.body.firstVisit,
      id: req.body.id,
    };

    // Read the data from the data.json file and parse it
    let jsonData = JSON.parse(fs.readFileSync(filePath));
    //console.log('jsonData', jsonData);

    // Check if this id with data already exists, if not add it
    if (jsonData.hasOwnProperty(firstVisitData.id)) {
      //console.log('Already exists');
    } else {
      jsonData[firstVisitData.id] = firstVisitData;
      //console.log('Not exists');
    }

    // Stringify the updated data
    let updatedData = JSON.stringify(jsonData, null, 2);
    //console.log('updatedData', updatedData);

    // Write the updated data back to the file
    fs.writeFileSync(filePath, updatedData);

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
  //console.log('req.body', req.body);
  try {
    // Create a new object to store the next visit information
    const nextVisitData: NextVisitData = {
      nextVisit: req.body.nextVisit,
      id: req.body.id,
    };

    // Read the data from the data.json file and parse it
    let jsonData = JSON.parse(fs.readFileSync(`${__dirname}/../../tmp/data.json`));
    //console.log('jsonData', jsonData);

    // Check if this user id already exists to add the next visit date or create a new user id with the next visit date
    if (jsonData.hasOwnProperty(nextVisitData.id)) {
      //console.log('User exists, add next visit date');
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
    //console.log('updatedData', updatedData);

    // Write the updated data back to the file
    fs.writeFileSync(`${__dirname}/../../tmp/data.json`, updatedData);

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
  console.log('req.body', req.body);
  try {
    // Create a new object to store the click information
    const clickData: ClickData = {
      link: req.body.link,
      id: req.body.id,
      date: req.body.date,
    };

    // Read the data from the data.json file and parse it
    let jsonData = JSON.parse(fs.readFileSync(`${__dirname}/../../tmp/data.json`));
    //console.log('jsonData', jsonData);

    // Check if this user id already exists to add the click information to it
    if (jsonData.hasOwnProperty(clickData.id)) {
      console.log('User exists, add click information');

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
    if (jsonData.links[clickData.link]) {
      jsonData.links[clickData.link].push({ id: clickData.id, date: clickData.date, country: jsonData[clickData.id].country, firstVisit: jsonData[clickData.id].firstVisit });
    } else {
      jsonData.links[clickData.link] = [{ id: clickData.id, date: clickData.date, country: jsonData[clickData.id].country, firstVisit: jsonData[clickData.id].firstVisit }];
    }

    // Stringify the updated data
    let updatedData = JSON.stringify(jsonData, null, 2);
    //console.log('updatedData', updatedData);

    // Write the updated data back to the file
    fs.writeFileSync(`${__dirname}/../../tmp/data.json`, updatedData);

    res.json();
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};

/**
 * Get all info from the data.json file
 *
 * @param {Request} _req - The request object (unused)
 * @param {Response} res - The response object used to send all the information
 */
const allInfo = async (_req: Request, res: Response) => {
  try {
    // Read the data from the data.json file and parse it
    let jsonData = JSON.parse(fs.readFileSync(`${__dirname}/../../tmp/data.json`));
    res.json(jsonData);
  } catch (err) {
    res.status(400);
    res.json((err as Error).message);
  }
};

/**
 * Get info about the links with amount of clicks
 *
 * @param {Request} _req - The request object (unused)
 * @param {Response} res - The response object used to send the clicks information
 */
const linkClickAll = async (_req: Request, res: Response) => {
  try {
    // Read the data from the data.json file and parse it

    let jsonData = JSON.parse(fs.readFileSync(`${__dirname}/../../tmp/data.json`));

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
 * @param {Request} _req - The request object (unused)
 * @param {Response} res - The response object used to send the clicks information
 */
const linkClickAllUniqueID = async (_req: Request, res: Response) => {
  try {
    // Read the data from the data.json file and parse it
    let jsonData = JSON.parse(fs.readFileSync(`${__dirname}/../../tmp/data.json`));

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
const productRoutes = (app: express.Application) => {
  // Route to save first visit information
  app.post('/sFirstVisit', sFirstVisit);

  // Route to save next visit information
  app.post('/sNextVisit', sNextVisit);

  // Route to save link click information
  app.post('/sLinkClick', sLinkClick);

  // Route to get all info from data.json
  app.get('/allInfo', allInfo);

  // Route to get info about the links with amount of clicks
  app.get('/linkClickAll', linkClickAll);

  // Route to get info about the links with amount of clicks by unique users
  app.get('/linkClickAllUniqueID', linkClickAllUniqueID);
};

export default productRoutes;
