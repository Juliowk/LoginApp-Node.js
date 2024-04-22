const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const path = require('path')

const app = express();
const PORT = 8081;

const operations = require("./routes/operations");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine({
     defaultLayout: 'main',
     runtimeOptions: {
          allowProtoPropertiesByDefault: true,
          allowProtoMethodsByDefault: true
     }
}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
     res.render("register");
});

app.use("/operations", operations);

app.listen(PORT, () => { console.log(`Rodando na url: https://localhost${PORT}`); });