//Allows you to use process.env
require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
)



//Show PDF
app.get('/server/show_file/', (req, res) => {

    const path = './files/RateConfirmation_Acme.pdf'

    var fs = require('fs')

    if (fs.existsSync(path)) {
        console.log("File exists!!!")
        res.contentType("application/pdf");
        fs.createReadStream(path).pipe(res)
    } else {
        res.status(500)
        console.log('File not found')
        res.send('File not found')
    }  

})

 


//For fun. Practie sending texts api
app.post('/server/sendtext', (req, res) => {

    client.messages
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: req.body.to,
            body: req.body.body
        })
        .then(() => {
            res.send(JSON.stringify({ success: true }));
        })
        .catch(err => {
            console.log(err);
            res.send(JSON.stringify({ success: false }));
        });

})

//POST endpoint for adding new load to file
app.post('/server/assign/load', (req, res) => {

    var newLoad = req.body

    console.log("The server has received the assign driver request!")
    console.log(newLoad)

    var fs = require('fs')

    var fileName = '../client/src/common/data/loadstest.json'

    var matchedLoad = null

    
    fs.readFile(fileName, function (err, data) {

        var json = JSON.parse(data)

        //Search for json file until you find the matching
        //load Num
        for (var i = 0; i < json.length; i++)
        {
            if (json[i].loadNum == newLoad.loadNum){
                //console.log("Found a match load in the json file!")
                //console.log(json[i])
                json[i].driver = newLoad.driver
                json[i].driverCellNum = newLoad.driverCellNum
                json[i].truckNum = newLoad.truckNum
                json[i].trailerNum = newLoad.trailerNum
                //console.log("Now updated!")
                //console.log(json[i])
                matchedLoad = json[i]
            }
            
        }
 
        //.stringify(json, null, "") outputs using correct spacing for readability
        fs.writeFile(fileName, JSON.stringify(json, null, " "), function(err, result) {
            if(err){
                console.log('error', err)
            }
          })

        console.log("\n")

        
        res.header('Content-Type', 'application/json');


        var pickUpDate = matchedLoad.pickupDateAndTime.split(" ")[0]
        var pickUpTime = matchedLoad.pickupDateAndTime.split(" ")[1]
        

        var deliveryDate = matchedLoad.deliveryDateAndTime.split(" ")[0]
        var deliveryTime = matchedLoad.deliveryDateAndTime.split(" ")[1]

        var driverFirstName = matchedLoad.driver.split(" ")[0]

        var msgBody =   driverFirstName + 
                        ", a new load has been dispatched. Pickup from " + matchedLoad.pickupCompany + " at " + 
                        matchedLoad.pickupStreetName + " " + matchedLoad.pickupCityAndState + " " + 
                        matchedLoad.pickupZipCode + " on " + pickUpDate + " @ " + pickUpTime  + ". Deliver to " + matchedLoad.deliveryCompany + " at " +
                        matchedLoad.deliveryStreetName + " " + matchedLoad.deliveryCityAndState + " " + 
                        matchedLoad.deliveryZipCode + " on " + deliveryDate + " @ " + 
                        deliveryTime + "."
        
        console.log("Message body: ")
        console.log(msgBody)
        
        /*
        client.messages
        .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: "+19167709975",
            body: msgBody
        })
        .then(() => {
            res.send(JSON.stringify({ success: true }));
        })
        .catch(err => {
            console.log(err);
            res.send(JSON.stringify({ success: false }));
        });
        */

        //test
        
      
        
          
    })



})

//POST endpoint for adding new load to file
app.post('/server/add/load', (req, res) => {

    var newLoad = req.body

    console.log("The server has received the post request!")
    console.log(newLoad)

    var pickUpDate = newLoad.pickupDateAndTime.split("T")[0].substr(5,6).replace("-", "/")

    var deliveryDate =  newLoad.deliveryDateAndTime.split("T")[0].substr(5,6).replace("-", "/") 

    var pickUpTime = newLoad.pickupDateAndTime.split("T")[1]
    var deliveryTime = newLoad.deliveryDateAndTime.split("T")[1]

    var newPickupDateAndTime = pickUpDate + " " + pickUpTime
    var newDeliveryDateAndTime = deliveryDate + " " + deliveryTime

    //Set the date and time in the proper format
    newLoad.pickupDateAndTime = newPickupDateAndTime
    newLoad.deliveryDateAndTime = newDeliveryDateAndTime

    newLoad.loadRate = "$" + newLoad.loadRate

    var fs = require('fs')

    var fileName = '../client/src/common/data/loadstest.json'

    
    fs.readFile(fileName, function (err, data) {
        var json = JSON.parse(data)
        json.push(newLoad)
        console.log("New json file")

        //.stringify(json, null, "") outputs using correct spacing for readability
        fs.writeFile(fileName, JSON.stringify(json, null, " "), function(err, result) {
            if(err){
                console.log('error', err)
            }
          })
    })
    

    /*
    res.header('Content-Type', 'application/json');

    var driverFirstName = newLoad.driver.split(" ")[0]
    var msgBody =   driverFirstName + 
                    ", a new load has been dispatched. Pickup from " + newLoad.pickupCompany + " at " + 
                    newLoad.pickupStreetName + " " + newLoad.pickupCityAndState + " " + 
                    newLoad.pickupZipCode + " on " + pickUpDate + " @ " + pickUpTime  + ". Deliver to " + newLoad.deliveryCompany + " at " +
                    newLoad.deliveryStreetName + " " + newLoad.deliveryCityAndState + " " + 
                    newLoad.deliveryZipCode + " on " + deliveryDate + " @ " + deliveryTime + "."
    
    console.log("Message body: ")
    console.log(msgBody)

    
    
    client.messages
      .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: "+19167709975",
        body: msgBody
      })
      .then(() => {
        res.send(JSON.stringify({ success: true }));
      })
      .catch(err => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
      });
      */
      
  

})

//Get JSON loads
app.get('/server/get/loads', (req, res) => {

    console.log("Loads request made it to the server!!!")
    var fileName = '../client/src/common/data/loadstest.json'
    var fs = require('fs')
    

    fs.readFile(fileName, function (err, data) {
        var json = JSON.parse(data)
        res.setHeader('Content-Type', 'application/json')
        res.send({ loads: json })
    })


})

//Test greeting
app.get('/server/api/greeting', (req, res) => {
    console.log("Get request made it to the server!!!")
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(3001, () => console.log("Mark's server started..."))