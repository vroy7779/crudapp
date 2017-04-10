/*eslint-env node, express*/
var express = require("express");
var app = express();
var mongojs = require("mongojs");

var ca1 = [new Buffer("LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURkVENDQWwyZ0F3SUJBZ0lFV09hbnFUQU5CZ2txaGtpRzl3MEJBUTBGQURBOE1Ub3dPQVlEVlFRRERERjIKY205NWRXbEFaMjFoYVd3dVkyOXRMVFl5TjJOaE0yVTNZVEppTlRFMFlUSmlPVEEyTlRFMVpHTm1abU0yWTJNegpNQjRYRFRFM01EUXdOakl3TkRBd09Wb1hEVE0zTURRd05qSXdNREF3TUZvd1BERTZNRGdHQTFVRUF3d3hkbkp2CmVYVnBRR2R0WVdsc0xtTnZiUzAyTWpkallUTmxOMkV5WWpVeE5HRXlZamt3TmpVeE5XUmpabVpqTm1Oak16Q0MKQVNJd0RRWUpLb1pJaHZjTkFRRUJCUUFEZ2dFUEFEQ0NBUW9DZ2dFQkFKMzJqaVA2aXVhUlpZTUZ2UTRUVHU5cQo1V2FlRGczcWx2Wjg1WVdvV242WFphQ2I2S1E3UE5YSFNNWjlCUlUrSktpQVFkSjZWc25VRFV3Zmx1bzhBUS9NClYra2lGTnN2UWxkd3RqYk15ZjVNYXgyRi8yRDd1TUVCcm41MkZyU1ZUZXdxblhQVjhTYkFibmllYjFENXlvbVUKdnlDWUNFUFdLN1pOZ1FVSjBTZHN5a3B5WC9Ic1BOSGFURWk2SE9iV1ZYM0JnWGQ5bTVKejB6eVE2UlJBQW0vWQp3Z1FsS1kwdkFQNHR1K2t4YUtFTTNKNnQ3Rys0ZzNOQkh1WVRUcEhSN2hWOHdUK2pMTkpRS1R3Sllqc284WDcrCnNEd0tKODlwMG5zMUltYXU3cm1Zd3JFbGplMkM5anpkM3dhck11YnZiZ1IrTmc3MkdheGN0dDk1ckNsNDVrTUMKQXdFQUFhTi9NSDB3SFFZRFZSME9CQllFRkF6Tk15TVNyVnI1Z294dm56WTZVRVVtNjNYWU1BNEdBMVVkRHdFQgovd1FFQXdJQ0JEQWRCZ05WSFNVRUZqQVVCZ2dyQmdFRkJRY0RBUVlJS3dZQkJRVUhBd0l3REFZRFZSMFRCQVV3CkF3RUIvekFmQmdOVkhTTUVHREFXZ0JRTXpUTWpFcTFhK1lLTWI1ODJPbEJGSnV0MTJEQU5CZ2txaGtpRzl3MEIKQVEwRkFBT0NBUUVBVWZnUVlZaDVxV2VQeWl2cmFBTTFXYXlITUFobjJHSndFL083d0tQMFhXUnZnanI5dk0yKwpyWU5PRU43MStHTzBxMEI2VWp6b05PeGNnOXRpdTFsMk9GNTgvdlovSjZNMlVvWWJ6TFNhU1BoSlg4UlZ3cnl6CmdVMlFmVDd2Q3Yra3pNY1ZYUEFyWUcwd0xvbFBMdGdoenR3YWpkV2J5di9VanJSbzArT3VPTGJZaWtLa0NjeS8KWXZxcGV6Y1N3eGVXRVJUUDFvNzg5QmhYU0kvcGpYM2ZIVjB4Zzg0UTU4RVIwTXh0RDJPNlhDVjlXTnVLeU12NwppbXdCc0QvUkNSWE9Gc3FjQ09zMThmUVlKMUJOTThGd05Gazl4em80RXArSUxXaXc5VTAvQUZaaW51eitzS0ZxCmxWQzc2SXNGRm5odmJCay9NaGorbHJrNU9peTBmczlLclE9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==","base64")];

var details ={
	mongos: {
            ssl: true,
            sslValidate: true,
           sslCA:ca1,
		   poolSize: 1,
           reconnectTries: 1
}
};
var db = mongojs("mongodb://admin:RYESMZFDESJQELAK@sl-us-dal-9-portal.6.dblayer.com:22516,sl-us-dal-9-portal.7.dblayer.com:22516/admin?ssl=true",["contactlist"],details);

var bodyParser = require("body-parser");
var port=process.env.PORT || 3000;
var host=process.env.HOST || "localhost";

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.use(/* @callback */ function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS");
  next();
});

app.get("/contactlist", /* @callback */ function(req, res) {
	console.log("revice get");

	db.contactlist.find(/* @callback */ function(err,docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post("/contactlist",function(req,res){
	console.log(req.body);
	db.contactlist.insert(req.body, /* @callback */ function(err,doc){
		res.json(doc);
	});
});

app.delete("/contactlist/:id", function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id:mongojs.ObjectId(id)},/* @callback */ function(err,doc){
		res.json(doc);
	});
});


app.get("/contactlist/:id", function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, /* @callback */ function (err, doc) {
    res.json(doc);
  });
});

app.put("/contactlist/:id", function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, /* @callback */ function (err, doc) {
      res.json(doc);
    });
});

app.listen(port,function(){
console.log("app running");
console.log("your app is runing at "+host+":"+port);
});
