let winLose = document.querySelector('#winLose')
let betAmount = document.querySelector('#betAmount')
let x = document.querySelector('#x')
let game = document.querySelector('#game')
let enshure = document.querySelector('#enshure')
let profitCount = 0;
let gamesCount = 0;
let parseWinL = ''
let parseGamesCount = 0;
let parseAmount = 0;
let parseX = 0;
let clearEarn = 0;
let clearEarnSum = 0;


document.addEventListener("DOMContentLoaded", function () {
    // Функция для загрузки данных с сервера
    function loadJSON(callback) {
        fetch('http://localhost:3000/get_data')
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => console.error('Ошибка при получении данных:', error));
    }

    // Функция для заполнения таблицы данными из JSON-файла
    function fillTableWithData(data) {
        var betTable = document.getElementById("betTable");
        var tbody = betTable.querySelector("tbody");

        data.forEach(function (bet) {
            var newRow = document.createElement("tr");

            parseWinL = bet['Win/Lose']
            parseX = bet['X']
            parseAmount = Number(bet['Bet Amount'])
            parseGamesCount++

            if (parseWinL == 'Win') {

                console.log(clearEarn + 'cE');
                clearEarn = (parseAmount * parseX) - parseAmount
                clearEarnSum = clearEarnSum + clearEarn
                console.log(clearEarnSum + 'sum');
            }
            else {
                console.log(parseAmount);
                console.log(clearEarn);
                clearEarnSum = clearEarnSum - parseAmount



            }


            newRow.innerHTML = `
                <td class="winLGen" style="${parseWinL == 'Win' ? 'color: green' : 'color: red'} ">${bet["Win/Lose"]}</td>
                <td class="betAmountGen">${bet["Bet Amount"]}</td>
                <td class="xGen">${bet["X"]}</td>
                <td>${bet["Game"]}</td>
                <td>${bet["Enshure (0/10)"]}</td>
            `;

            tbody.insertBefore(newRow, tbody.firstChild);
        });
        document.querySelector('.bets-amount').innerHTML = "Bets: " + " " + parseGamesCount
        document.querySelector('.sum-profit').innerHTML = "Earn: " + " " + clearEarnSum + ' ₴'
        if (clearEarn > 0) {
            document.querySelector('.sum-profit').style.color = "#0FC80F"
        }



    }

    // Загружаем данные с сервера и заполняем таблицу данными при загрузке страницы
    loadJSON(fillTableWithData);


});



function SaveInputs() {
    const data = {
        "Win/Lose": winLose.value,
        "Bet Amount": betAmount.value,
        "X": x.value,
        "Game": game.value,
        "Enshure (0/10)": enshure.value
    };
    fetch('http://localhost:3000/update_data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(updatedData => {
            console.log('Данные успешно отправлены на сервер:', updatedData);
            // Обработка ответа с сервера, если требуется
            location.reload();
        })
        .catch(error => console.error('Ошибка при отправке данных на сервер:', error));
}
