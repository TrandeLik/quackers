var i;
const btn = document.getElementById('button');
const nickInput = document.getElementById('nickname');
const select = document.getElementById('slct');


function createTable(dataDict){
    let data = [];
    for (let d in dataDict){
        data.push([d, dataDict[d]])
    }
    data.sort((a, b) => b[1] - a[1]);
    let table = document.getElementById('tbl');
    table.innerHTML = `
        <thead>
        <tr>
            <th class="table-secondary">Место</th>
            <th class="table-secondary">Ник</th>
            <th class="table-secondary">Счет</th>
        </tr>
        </thead>
        <tbody>
    `;

    for (let j=0; j<data.length; j++){
        let rowClass = '';
        switch (j) {
            case 0:
                rowClass = 'table-warning';
                break;
            case 1:
                rowClass = 'table-success';
                break;
            case 2:
                rowClass = 'table-primary';
                break;
            default:
                rowClass = 'table-secondary';
        }
        table.innerHTML += `
            <tr>
                <td class="${rowClass}">${j + 1}</td>
                <td class="${rowClass}">${data[j][0]}</td>
                <td class="${rowClass}">${data[j][1]}</td>
            </tr>
        `
    }
    table.innerHTML += '</tbody>'
}

function generate(){
    axios.get('/get_leaderboard')
        .then(response => {
            createTable(response.data)
        })
}

function drawQuestions(allQuestions) {
    let questions = [];
    select.innerHTML = '';
    for (let question in allQuestions){
        if (!allQuestions[question]){
            select.innerHTML += `<option>${question}</option>`
        } else {
            select.innerHTML += `<option disabled>${question}</option>`
        }
    }
    console.log(allQuestions);
    console.log(questions)
}

function getQuestions(){
    axios.get(`/questions?nickname=${nickInput.value}`)
        .then(response => {
            drawQuestions(response.data);
        });
}

window.onload = function () {
    i = 0;
    generate();
    getQuestions();
};

nickInput.onchange = function(){
    getQuestions();
};

btn.onclick = function () {
    let audio = new Audio();
    audio.src = '/static/sounds/quack.mp3';
    audio.play();
    i += 1;
    nick = nickInput.value;
    generate();
    if (nick !== '') {
        if (i % 1 === 0) {
            axios.post('/update_score', {nickname: nick})
                .then(response => {
                    console.log(response.data)
                })
        }
    }
};
