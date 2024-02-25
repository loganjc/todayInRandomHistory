import express, { json } from 'express';
import axios from 'axios';

const port = 3000;
const app = express();
const apiURL = 'https://byabbe.se/on-this-day/'

const config = {
    headers: {
        'Accept': 'application/json'
    }
}

app.use(express.static('public/style'));

app.get('/', async (req, res) => {
    let currDate = new Date();
    let currDay = currDate.getDate();
    let currMonth = currDate.getMonth() + 1;
    const reqURL = apiURL + `${currMonth}/${currDay}/events.json`; 
    const response = await axios.get(reqURL, config);
    const eventNumber = Math.floor(Math.random() * response.data.events.length);
    res.render('index.ejs', {data: response.data.events[eventNumber]});
});

app.listen(port, () => {
    console.log(`Server instance running on ${port}`);
});