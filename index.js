const fetch = require('node-fetch')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

async function getData(query) {
    console.log(query)
    const urlForAPI = `https://www.jiosaavn.com/api.php?__call=search.getResults&p=0&n=6&q=${query}&_format=json&_marker=00&ctx=wap6dot0`
    const response = await fetch(urlForAPI)
    const data = await response.json();
    return data
}

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/:query', async (req, res) => {

    const { query } = req.params;
    var data = await getData(query)
    res.status(200).send(data);
});

// starting the server
app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
    console.log(`listening on port ${process.env.PORT || 5000}`);
});
