const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'pages'))

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.set('port', (process.env.PORT || 5001));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    response.render('page1')
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

app.get('/menu', function(request, response) {
    response.render('page2')
})

app.post('/sendform', (req, res, next) => {
    console.log(req.body)

        fs.writeFileSync('test_email.txt', req.body.email +" - Hello, "+ req.body.name +"!");
        res.download('test_email.txt');
});