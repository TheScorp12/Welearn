// exports.getBalance = require("./simple-coin/get-balance")
// exports.getAddress = require("./get-address")
// exports.cidToBytes = require("./cid-to-bytes")
// exports.sendCoin = require("./simple-coin/send-coin")
// exports.storeAll = require("./filecoin-market-consumer/store-all")
// exports.getDealCommitment = require("./filecoin-market-consumer/get-deal-commmitment")
// exports.addCID = require("./deal-rewarder/add-cid")
// exports.fund = require("./deal-rewarder/fund")
// exports.claimBounty = require("./deal-rewarder/claim-bounty")
// exports.makeDealProposal = require("./deal-client/make-deal-proposal")
// exports.getDealProposal = require("./deal-client/get-deal-proposal")
// exports.getDealStatus = require("./deal-client/get-deal-status")
exports.createuser = require("./createuser")
const app  = require('express')()
const multer = require('multer')
//const fileHandler = require('./uploadfile');
// const createuser = require('./createuser');

createuser('0xC9F58a37fEa347683edBdD55d4Ca9CC51797fd84',"Mohammed","Aasim","mohdaasimc@gmail.com",1);

const upload = multer({})

// app.post('/upload-vid',upload.single('video'),(req, res, next) =>{
//     fileHandler(req.video);
// })

app.listen(5500, ()=> {
    console.log("Listening!!");
})