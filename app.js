// importing modules

var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();


const sales = require('./routes/sales.js');
const creditsales = require('./routes/creditsales.js');
const cashPurchase = require('./routes/cashPurchase.js');
const creditPurchase = require('./routes/creditPurchase.js');
const expense = require('./routes/expense.js');
const employee = require('./routes/employee.js');
const payCreditPurchase = require('./routes/payCreditPurchase.js');
const addAccount = require('./routes/addAccount.js');
const addCompany = require('./routes/addCompany.js');
const journal = require('./routes/journal.js');
const close = require('./routes/close.js');
const paid = require('./routes/paid.js');
const register = require('./routes/register.js');
const productMaster = require('./routes/productMaster.js');
const categoryMaster = require('./routes/categoryMaster.js');

const login = require('./routes/login.js');


//connect to mongodb
mongoose.connect(process.env.MONGODB_URI || '',{useMongoClient: true});

//on connection
mongoose.connection.on('connected',()=>{
	console.log('connected to database mongodb @ 27017');
});

mongoose.connection.on('error',(err)=>{
	if(err){
		console.log('error in connection databse'+err);
	}
	
});
//port number

const port = process.env.PORT || 3000;

//add midleware
app.use(cors());

//body-parser
app.use(bodyparser.json());

//static file
app.use(express.static(path.join(__dirname,'public')));


app.use('/api', sales);
app.use('/api', cashPurchase);
app.use('/api', creditPurchase);
app.use('/api', expense);
app.use('/api', employee);
app.use('/api', creditsales);
app.use('/api', payCreditPurchase);
app.use('/api', addCompany);
app.use('/api', addAccount);
app.use('/api', journal);
app.use('/api', close);
app.use('/api', paid);
app.use('/api', register);
app.use('/api', login);
app.use('/api', productMaster);
app.use('/api', categoryMaster);


//testing server

app.get('/',(req, res)=>{
	res.send('foobar');
});

app.listen(port,()=>{
	console.log('server start at port:'+port);
});