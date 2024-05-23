const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let DataBase =[];

app.get('/player', async (req, res) => {
    try {
        res.json(DataBase);
    } catch(err) {
        console.log("Error in Player", err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/playercreate', async (req, res) => {
    try {
        const { Title, body  } = req.body;
        DataBase.push({ Title, body  })
        .then(res.json('done'))
        .catch(res.json("not"));
       
    } catch (error) {
        console.error('Error in Player Creation:', error);
    }
});



app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const initialLength = DataBase.length; 
        DataBase = DataBase.filter(game => game.Title !== id); 
        const finalLength = DataBase.length;
        if (finalLength < initialLength) {
            res.json('deleted');
            console.log("Games deleted successfully");
        } else {
            res.status(404).json('No games found to delete');
            console.log("No games found to delete");
        }
    } catch (error) {
        console.error('Error in deleting games:', error);
    }
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { Title , body } = req.body;
    console.log(id)
    const dataIndex = DataBase.findIndex(data => data.Title === id);

    if (dataIndex === -1) {
        console.log("Player not found");
    } else {
        DataBase[dataIndex].Title = Title; 
        DataBase[dataIndex].body = body;
        console.log('Score updated'); 
    }
    res.json('update');
});


app.get('/', async (req, res) => {
    res.send(DataBase);
})


app.listen(5000, () => {
    console.log("Server is Running")
})
