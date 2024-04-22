"use strict";
// The entry point for the application. It creates an express server and defines routes for the app.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var routes_1 = __importDefault(require("./routes/routes"));
var cors_1 = __importDefault(require("cors"));
// Create a new express server
var app = (0, express_1["default"])();
var address = '0.0.0.0:3001';
// CORS configuration 
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};
// Use CORS middleware
app.use((0, cors_1["default"])(corsOptions));
// Use body parser middleware. Body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body
app.use(body_parser_1["default"].json());
// Define a route handler for the default home page
app.get('/', function (req, res) {
    res.send('This is API');
});
// Start the Express server
app.listen(3001, function () {
    console.log("starting app on: ".concat(address));
});
// Define routes for the app
(0, routes_1["default"])(app);
exports["default"] = app;
