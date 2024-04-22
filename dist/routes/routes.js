"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require('fs');
/**
 * Save first visit information
 *
 * @param {Request} req - The request object containing the first visit information to save
 * @param {Response} res - The response with empty object
 */
var sFirstVisit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var firstVisitData, jsonData, updatedData;
    return __generator(this, function (_a) {
        //console.log('req.body', req.body);
        try {
            firstVisitData = {
                country: req.body.country,
                ip: req.body.ip,
                firstVisit: req.body.firstVisit,
                id: req.body.id
            };
            jsonData = JSON.parse(fs.readFileSync("".concat(__dirname, "/../../tmp/data.json")));
            //console.log('jsonData', jsonData);
            // Check if this id with data already exists, if not add it
            if (jsonData.hasOwnProperty(firstVisitData.id)) {
                //console.log('Already exists');
            }
            else {
                jsonData[firstVisitData.id] = firstVisitData;
                //console.log('Not exists');
            }
            updatedData = JSON.stringify(jsonData, null, 2);
            //console.log('updatedData', updatedData);
            // Write the updated data back to the file
            fs.writeFileSync("".concat(__dirname, "/../../tmp/data.json"), updatedData);
            res.json();
        }
        catch (err) {
            res.status(400);
            res.json(err.message);
        }
        return [2 /*return*/];
    });
}); };
/**
 * Save next visit information
 *
 * @param {Request} req - The request object containing the next visit information to save
 * @param {Response} res - The response with empty object
 */
var sNextVisit = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nextVisitData, jsonData, updatedData;
    return __generator(this, function (_a) {
        //console.log('req.body', req.body);
        try {
            nextVisitData = {
                nextVisit: req.body.nextVisit,
                id: req.body.id
            };
            jsonData = JSON.parse(fs.readFileSync("".concat(__dirname, "/../../tmp/data.json")));
            //console.log('jsonData', jsonData);
            // Check if this user id already exists to add the next visit date or create a new user id with the next visit date
            if (jsonData.hasOwnProperty(nextVisitData.id)) {
                //console.log('User exists, add next visit date');
                // Check if the next visit date already exists and add it in array with visit date or create a new array with the visit date
                if (jsonData[nextVisitData.id].nextVisit) {
                    jsonData[nextVisitData.id].nextVisit.push(nextVisitData.nextVisit);
                }
                else {
                    jsonData[nextVisitData.id].nextVisit = [nextVisitData.nextVisit];
                }
            }
            else {
                jsonData[nextVisitData.id] = { id: nextVisitData.id, nextVisit: [nextVisitData.nextVisit] };
            }
            updatedData = JSON.stringify(jsonData, null, 2);
            //console.log('updatedData', updatedData);
            // Write the updated data back to the file
            fs.writeFileSync("".concat(__dirname, "/../../tmp/data.json"), updatedData);
            res.json();
        }
        catch (err) {
            res.status(400);
            res.json(err.message);
        }
        return [2 /*return*/];
    });
}); };
/**
 * Save click information
 *
 * @param {Request} req - The request object containing the click information to save
 * @param {Response} res - The response with empty object
 */
var sLinkClick = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var clickData, jsonData, updatedData;
    return __generator(this, function (_a) {
        console.log('req.body', req.body);
        try {
            clickData = {
                link: req.body.link,
                id: req.body.id,
                date: req.body.date
            };
            jsonData = JSON.parse(fs.readFileSync("".concat(__dirname, "/../../tmp/data.json")));
            //console.log('jsonData', jsonData);
            // Check if this user id already exists to add the click information to it
            if (jsonData.hasOwnProperty(clickData.id)) {
                console.log('User exists, add click information');
                // Check if the click information already exists and add it in array with click objects or create a new array with the click object
                if (jsonData[clickData.id].click) {
                    jsonData[clickData.id].click.push({ link: clickData.link, date: clickData.date });
                }
                else {
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
            }
            else {
                jsonData.links[clickData.link] = [{ id: clickData.id, date: clickData.date, country: jsonData[clickData.id].country, firstVisit: jsonData[clickData.id].firstVisit }];
            }
            updatedData = JSON.stringify(jsonData, null, 2);
            //console.log('updatedData', updatedData);
            // Write the updated data back to the file
            fs.writeFileSync("".concat(__dirname, "/../../tmp/data.json"), updatedData);
            res.json();
        }
        catch (err) {
            res.status(400);
            res.json(err.message);
        }
        return [2 /*return*/];
    });
}); };
/**
 * Get all info from the data.json file
 *
 * @param {Request} _req - The request object (unused)
 * @param {Response} res - The response object used to send all the information
 */
var allInfo = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonData;
    return __generator(this, function (_a) {
        try {
            jsonData = JSON.parse(fs.readFileSync("".concat(__dirname, "/../../tmp/data.json")));
            res.json(jsonData);
        }
        catch (err) {
            res.status(400);
            res.json(err.message);
        }
        return [2 /*return*/];
    });
}); };
/**
 * Get info about the links with amount of clicks
 *
 * @param {Request} _req - The request object (unused)
 * @param {Response} res - The response object used to send the clicks information
 */
var linkClickAll = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonData_1, linkClicks;
    return __generator(this, function (_a) {
        try {
            jsonData_1 = JSON.parse(fs.readFileSync("".concat(__dirname, "/../../tmp/data.json")));
            linkClicks = Object.keys(jsonData_1.links).map(function (link) {
                return {
                    link: link,
                    clicks: jsonData_1.links[link].length
                };
            });
            res.json(linkClicks);
        }
        catch (err) {
            res.status(400);
            res.json(err.message);
        }
        return [2 /*return*/];
    });
}); };
/**
 * Get info about the links with amount of clicks by unique users
 *
 * @param {Request} _req - The request object (unused)
 * @param {Response} res - The response object used to send the clicks information
 */
var linkClickAllUniqueID = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var jsonData_2, linkClicks;
    return __generator(this, function (_a) {
        try {
            jsonData_2 = JSON.parse(fs.readFileSync("".concat(__dirname, "/../../tmp/data.json")));
            linkClicks = Object.keys(jsonData_2.links).map(function (link) {
                // Use a Set to store unique user IDs. uniqueUsers - object with the key representing the user ID
                var uniqueUsers = new Set(jsonData_2.links[link].map(function (click) { return click.id; }));
                return {
                    link: link,
                    clicks: uniqueUsers.size
                };
            });
            res.json(linkClicks);
        }
        catch (err) {
            res.status(400);
            res.json(err.message);
        }
        return [2 /*return*/];
    });
}); };
// Express routes here
/**
 * Routes for data endpoints
 *
 * @param {express.Application} app - The express application object
 */
var productRoutes = function (app) {
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
exports["default"] = productRoutes;
