const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();


const baseURL = process.env.Base_URL + ':' + (process.env.PORT || 7000);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "/public/views"));


app.get('/', async (req, res) => {
    try {
        const response = await axios.get(baseURL + '/books');
        console.log(baseURL);
        
        const books = response.data;
        res.render('books', { books });
    } catch (error) {   
        console.log(error);
        res.status(500).send('Error retrieving books');
    }   
});

app.get("/book/:id", async (req, res) => {
    const { id } = req.params;
    console.log("get book");
    
    try {
        const response = await axios.get(baseURL + '/books/' + id);
        const book = response.data;
        res.render('book', { book });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error retrieving book details');
    }   
});

app.get('/create', async (req, res) => {
    res.render('create');
});

app.post('/create', async (req, res) => {
    const { title, author } = req.body;
    try {
        await axios.post(baseURL + '/books', { title, author });
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error creating book');
    }
});

app.get("/update/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(baseURL + '/books/' + id);
        const book = response.data;
        res.render('update', { book });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error retrieving book details for update');
    }
});

app.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    try {
        await axios.put(baseURL + '/books/' + id, { title, author });
        res.redirect('/');
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Error updating book');
    }
});

app.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await axios.delete(baseURL + '/books/' + id);
        res.redirect('/');
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Error deleting book');
    }
});

app.listen(7001, () => {
    console.log('Client is running on http://localhost:7001');
});