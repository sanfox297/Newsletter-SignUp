

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
const port =process.env.PORT;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", (req,res)=> {

        res.sendFile(__dirname + "/signup.html");

});

app.post("/",(req,res)=>{

        const firstName = req.body.fname;
        const lastName = req.body.lname;
        const email = req.body.email;

        const data ={

                members : [

                        {
                                email_address: email,
                                status: "subscribed",
                                merge_fields:{

                                        FNAME: firstName,
                                        LNAME: lastName
                                }

                        }
                ]
        };

        const jsonData = JSON.stringify(data);
        const url = "https://us11.api.mailchimp.com/3.0/lists/59c1f28d8d";
        const Options = {

                method: "POST",
                auth: "pratik:18d20385c3474a4f9252580954e81907-us11"
        };      
        
        const request = https.request(url, Options, (response)=>{    
                
                if(response.statusCode === 200){
                        res.sendFile(__dirname + "/success.html");
                }else{

                        res.send(__dirname + "/failure.html");

                }

                response.on("data", (data)=>{

                        console.log(JSON.parse(data));
                });
        });

        request.write(jsonData);
        request.end(); 

});




app.listen(port || 3000, ()=>{

        console.log("Server is Working on PORT ");
});

//  mailchimp website login and goto the audiense
// Api Key - 18d20385c3474a4f9252580954e81907-us11
// Audiance Key - 59c1f28d8d