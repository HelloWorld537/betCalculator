const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

// Маршрут для чтения файла data.json и отправки его содержимого на клиент
app.get('/get_data', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ошибка сервера');
        } else {
            let jsonData;
            try {
                jsonData = JSON.parse(data);
            } catch (parseErr) {
                console.error(parseErr);
                jsonData = []; // Если произошла ошибка парсинга, создаем пустой массив
            }
            res.json(jsonData);
        }
    });
});

// Маршрут для обновления файла data.json данными от клиента
app.post('/update_data', (req, res) => {
    const newData = req.body;
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ошибка сервера');
        } else {
            let jsonData;
            try {
                jsonData = JSON.parse(data);
            } catch (parseErr) {
                console.error(parseErr);
                jsonData = [];
            }
            jsonData.push(newData);
            fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Ошибка сервера');
                } else {
                    res.json(jsonData);
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
