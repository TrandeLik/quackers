var i;
var userDict;
const btn = document.getElementById('button');
const nickInput = document.getElementById('nickname');
const select = document.getElementById('slct');
const btnSend = document.getElementById('sendAnswer');
const usersAnswer = document.getElementById('answer');
const info  = document.getElementById('infoForAlert');
const currentScore  = document.getElementById('currentScore');

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
            <th class="leaderboard">Место</th>
            <th class="leaderboard">Ник</th>
            <th class="leaderboard">Счет</th>
        </tr>
        </thead>
        <tbody>
    `;

    for (let j=0; j<data.length; j++){
        let rowClass = '';
        switch (j) {
            case 0:
                rowClass = 'first-place';
                break;
            case 1:
                rowClass = 'second-place';
                break;
            case 2:
                rowClass = 'third-place';
                break;
            default:
                rowClass = 'leaderboard';
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
            userDict = response.data
            createTable(userDict)
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
    currentScore.innerText = `Текущий счет: ${i}`;
}

window.onload = function () {
    i = 0;
    updateAll();
};

nickInput.onchange = function(){
    let nickname = this.value;
    if (Object.keys(userDict).indexOf(nickname) != -1){
        i = userDict[nickname];
    }
    updateAll();
};

btn.onclick = function () {
    let audio = new Audio();
    let music = '';
    i += 1;
    console.log('out')
    console.log(i);
    switch (i) {
        case 69:
            music = '/static/sounds/1.mp3';
            break;

        case 256:
            music = '/static/sounds/3.mp3';
            break;

        case 128:
            music = '/static/sounds/2.mp3';
            break;

        case 300:
            music = '/static/sounds/4.mp3';
            break;

        case 500:
            music = '/static/sounds/5.mp3';
            break;

        case 609:
            music = '/static/sounds/6.mp3';
            break;

        case 666:
            music = '/static/sounds/7.mp3';
            break;

        case 750:
            music = '/static/sounds/8.mp3';
            break;

        case 1204:
            music = '/static/sounds/9.mp3';
            break;

        case 2020:
            music = '/static/sounds/10.mp3';
            break;

        case 2505:
            alert('Вы умерли!');
            break;

        case 2506:
            music = '/static/sounds/13.mp3';
            break;

        case 5000:
            music = '/static/sounds/11.mp3';
            break;

        case 6969:
            music = '/static/sounds/12.mp3';
            break;

        default:
            music = '/static/sounds/quack.mp3';
    }
    audio.src = music;
    audio.play();
    let nick = nickInput.value;
    if (nick !== '') {

        if (i % 10 == 0) {
            console.log('inside');
            console.log(i);
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
              switch (response.data) {
                  case 'ANSWERED':
                      info.innerText = 'Жулик, не воруй! Ты уже ответил(а) на этот вопрос!';
                      break;
                  case 'OK':
                      info.innerText = 'ЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕ! Правильно!';
                      break;
                  case 'ERROR':
                      info.innerText = 'Пока неверно, но мы в тебя еще верим';
                      break;
              }
              updateAll();
              $('#alert').modal('show');
              usersAnswer.value = '';
          })
  }

};
