/*
    Version 1.1

    Create an Autonomous Transaction Processing Service

    Before running this example, install necessary dependencies by running:
    npm install http-signature jssha
*/
var auth = require('./auth.js');
var regions = require('./regions.js');
var headers = require('./headers.js');
var https = require('https');
//Create autonomous database ATP 



function createATP(callback) {

var body = JSON.stringify({
  "compartmentId" : auth.myCompartment,
  "displayName" : process.argv[2],
  "dbName" : process.argv[3],
  "adminPassword" : process.argv[4],
  "cpuCoreCount" : parseInt(process.argv[5]),
  "dataStorageSizeInTBs" : parseInt(process.argv[6])
});
var options = {
        host: regions.dbPhoenixRegion,
        path: '/20160918/autonomousDatabases',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    };
var request = https.request(options, headers.handleRequest(callback));

    headers.sign(request, {
        body: body,
        privateKey: auth.privateKey,
        keyFingerprint: auth.keyFingerprint,
        tenancyId: auth.tenancyId,
        userId: auth.authUserId
    });

    request.end(body);
};

headers.getUser(auth.authUserId, function(data) {
    console.log(data);


    console.log("\nCREATING ATP Service:");

    
    createATP(function(data) {
        console.log(data);
    });

});


   
