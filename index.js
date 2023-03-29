const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');

const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// middleware1
// app.use(function(req, res, next) {
//     req.myName = 'Priyanka';
//     console.log('middleware 1 called');
//     next();
// });

// // middleware2
// app.use(function(req, res, next) {
//     console.log('My name from MW2', req.myName);
//     console.log('middleware 2 called');
//     next();
// });

var contactsList = [
    {
        name: "Priyanka",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Coding Ninjas",
        phone: "2316537634"
    }
]

//Controllers
app.get('/', function(req, res) {
    // console.log('My name from get route controller', req.myName);

    Contact.find({}, function(err, contacts) {
        if(err) {
            console.log('Error in fetching contacts from db');
        }

        return res.render('home', {
            title: "My Contacts List",
            contacts_list: contacts
        });
    });

    // console.log(__dirname);
    // res.send('<h1>Cool, it is running! Or is it?</h1>');
});

app.get('/practice', function(req, res) {
    return res.render('practice', {title: "Let's Play With EJS"});
});

app.post('/create-contact', function(req, res) {
    // contactsList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // contactsList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact) {
        if(err) {
            console.log('Error in creating a contact!');
            return;
        }

        console.log('********', newContact);
        return res.redirect('back');
    });

    // return res.redirect('/');
    // return res.redirect('back');

    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // return res.redirect('/practice');   
});

// for deleting a contact

// using params
// app.get('/delete-contact/:phone', function(req, res) {
//     console.log(req.params);
//     let phone = req.params.phone;
// });

// using query
// app.get('/delete-contact', function(req, res) {
//     // get the query from the url
//     let phone = req.query.phone;

//     let contactIndex = contactsList.findIndex(contact => contact.phone == phone);

//     if(contactIndex != -1) {
//         contactsList.splice(contactIndex, 1);
//     }

//     return res.redirect('back');
// });

app.get('/delete-contact', function(req, res) {
    // get the id from query in the url
    let id = req.query.id;

    // find the contact in the db using id & delete
    Contact.findByIdAndDelete(id, function(err) {
        if(err) {
            console.log('Error in deleting an object from db!');
            return;
        }

        return res.redirect('back');
    });
});

app.listen(port, function(err) {
    if(err) {
        console.log('Error in running the server', err);
    }

    console.log('Yup! My Express Server is running on Port:', port);
});