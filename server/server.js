const express = require("express");
const app= express();
const cors = require('cors') 
app.use(cors({credentials:true,origin:'http://localhost:3000'}));   
const cookieParser = require('cookie-parser');
require('dotenv').config();

require("./config/mongoose.config");

app.use(cookieParser())

app.use(express.json(),express.urlencoded({extended:true}));

require("./routes/user.routes")(app);
require('./routes/hikes.routes')(app)


const port = 8000;
app.listen( port, () => console.log(`Listening on port: ${port}`) );
