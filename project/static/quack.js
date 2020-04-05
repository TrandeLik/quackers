var i;
const btn = document.getElementById('button');
const nickInput = document.getElementById('nickname');
const select = document.getElementById('slct');
const btnSend = document.getElementById('sendAnswer');
const usersAnswer = document.getElementById('answer');

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
    select.innerHTML = '<option selected disabled>Список вопросов</option>';
    for (let question in allQuestions){
        if (!allQuestions[question]){
            select.innerHTML += `<option>${question}</option>`
        } else {
            select.innerHTML += `<option disabled>${question}</option>`
        }
    }
}

function getQuestions(){
    axios.get(`/questions?nickname=${nickInput.value}`)
        .then(response => {
            drawQuestions(response.data);
        });
}

function updateAll(){
    generate();
    getQuestions();
}

window.onload = function () {
    i = 0;
    updateAll()
};

nickInput.onchange = function(){
    updateAll()
};

btn.onclick = function () {
    let audio = new Audio();
    audio.src = '/static/sounds/quack.mp3';
    audio.play();
    i += 1;
    let nick = nickInput.value;
    if (nick !== '') {
        if (i % 10 === 0) {
            axios.post('/update_score', {nickname: nick, iter: i})
                .then(response => {
                    console.log(response.data)
                })
        }
    }
    updateAll();
};

btnSend.onclick = function () {
  let nick = nickInput.value;
  let ans = usersAnswer.value;
  let quest = select.value;
  console.log(quest);
  if (nick !== ''){
      axios.post('/check_answer', {nickname: nick, question: quest, answer: ans})
          .then(response =>{
              updateAll();
              usersAnswer.value = '';
          })
  }

};