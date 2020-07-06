const express     = require("express");
const mongoose    = require("mongoose");
const bodyParser  = require("body-parser");
const morgan      = require("morgan");
const config      = require("../config");
const Url         = require("../models/Url");
const validUrl    = require("valid-url")
const shortId     = require("shortid"); 
const shortid = require("shortid");
const baseUrl     = config.baseUrl;
const url         = config.mongoUrl;

const urlRouter   = express.Router();
urlRouter.use(morgan('dev'));
urlRouter.use(bodyParser.json());

urlRouter.get('/short/:shortCode', async(req,res)=>{
    const shortCode = req.params.shortCode
    //console.log(shortCode);
    if(shortCode){
        var url = await Url.findOne({urlCode:shortCode});
        if(url){
            console.log(url.longUrl);
            res.redirect(url.longUrl);
        }else{
            console.log("Sory Problem  Redirecting");
        }

    }else{
        console.log("Cant find any associate Url");
    }
})



urlRouter.post("/short", async (req,res)=>{
    const longurl = req.body.longUrl
    if(validUrl.isUri(longurl)){
    
            var url = await Url.findOne({longUrl:longurl});
            if(url){
                console.log("[+] Found !!!!");
                return res.status(200).json(url);
            }else{
                console.log("[-] Not Found !!!!");
                console.log("[*] Constructing !!!!");
                const shortCode = shortId.generate();
                const shorturl  = baseUrl + '/' + shortCode;
                console.log(shorturl);
                url = new Url({
                    urlCode  : shortCode,
                    longUrl  : longurl,
                    shortUrl : shorturl
                })

                await url.save()
                return res.status(201).json(url);


            }
    }else{
        console.log("Please Enter a Valid Url");
    }
    
})



module.exports = urlRouter;