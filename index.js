/*
----------------
NODE IMPORTS
----------------

 NOTE: NodeJS 'require' modules look in its path, and if no specific file is specified,
 looks for 'index.js'.  So require('express') looks in node_modules for a folder 'express',
 then since no specific file is specified, looks for 'index.js', which is the standard
 convention for node modules.

 */

var express = 		require('express');
var bodyParser = 	require('body-parser');
var mongoose = 		require('mongoose');
var request =		require('request');

/*
 ----------------
Application Configuration
 ----------------
 */

//port settings
var port = 3000;

//setup our app object
var app = express();

//setup a static directory to serve front-end code
app.use(express.static(__dirname + "/_public"));
app.use(bodyParser.json());

//setup our database
var db = require('./_config/database');

/*
 ----------------
 Routes
 ----------------

 NOTE: require will look in 'routes' for module.js, which gives a function that will
 take the 'app' object, loop through all route files on the filesystem, and use the
 Express 4.0 router to setup all the routes.  This way, routes can be logically
 separated into different files to improve scalability.

 */

//setup the express router
var router = express.Router();

/*
 REST API for Departures

 We will return an array of departure data.  Will return an empty array if there was no
 data, or a JSON error object if there was some problem.

 NOTE: Normally, I would separate routes into separate files and do something with 'require'
 to include them here, but due to the scope and timing for this project, I am leaving them
 here.
 */

router.get('/departures', function(req, res)
{
	//first, get the data from the feed.  results are stored in 'body'
	request('http://developer.mbta.com/lib/gtrtfs/Departures.csv', function(err, resp, body){
		if(!err && resp.statusCode == 200)
		{
			var Departures = [];

			//get the CSV data, format it into a JSON object.  first, get each line.
			var lines = body.split('\n');

			//if there's at least one line...
			if(lines.length > 0)
			{
				//...get the CSV column names...
				var headers = lines[0].split(',');

				//... then, for each other line, get the CSV data
				for(var i=1; i<lines.length; i++)
				{
					//start with an empty departure object
					var departure = {};

					//get all data in the line
					var items = lines[i].split(',');
					for(var j=0; j<items.length; j++)
					{
						//store data in the departure object with a key of the CSV column name.
						//use a regex replace to remove all extra quote characters from the data.
						//also making sure to use trim() to remove any whitespace or formatting chars.
						//also using toLowerCase to keep consistent formatting
						departure[headers[j].trim().toLowerCase()] = items[j].trim().toLowerCase().replace(/["]/g, '');
					}

					//add this departure into the return array
					Departures.push(departure);
				}
			}

			res.json(Departures);

		}
		else
			res.status(500).json({error: 'Problem getting departure data from MBTA servers.'});

	});
});

router.get('*', function(req, res){
	res.render('./public/index.html');
});

app.use('/', router);

//require('./_server/routes')(app);

/*
 ----------------
Launch
 ----------------
 */

app.listen(port);
console.log('Server started on port: ' + port);

exports = module.exports = app;











