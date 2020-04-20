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
    let music = '';
    i += 1;
    switch (i) {
        case 69:
            music = '/static/sounds/were all soldiers.mp3';
            break;

        case 256:
            music = '/static/sounds/8_bit.mp3';
            break;

        case 128:
            music = '/static/sounds/lenin.mp3';
            break;

        case 300:
            music = '/static/sounds/ba-dum-tss.mp3';
            break;

        case 500:
            music = '/static/sounds/hrushev1.mp3';
            break;

        case 609:
            music = '/static/sounds/Boy next door.mp3';
            break;

        case 666:
            music = '/static/sounds/alalalalalalala.mp3';
            break;

        case 750:
            music = '/static/sounds/gorbachev.mp3';
            break;

        case 1204:
            music = '/static/sounds/gagarin.mp3';
            break;

        case 2020:
            music = '/static/sounds/coronavirus.mp3';
            break;

        case 2505:
            alert('Вы умерли!');
            break;

        case 5000:
            music = '/static/sounds/everyone is counting on me.mp3';
            break;

        case 6969:
            music = '/static/sounds/gachi_barbariki.mp3';
            break;

        default:
            music = '/static/sounds/quack.mp3';
    }
    audio.src = music;
    audio.play();
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