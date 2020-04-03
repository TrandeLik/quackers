var i;
const btn = document.getElementById('button');
const nickInput = document.getElementById('nickname');

window.onload = function () {
    i = 0;
};

btn.onclick = function () {
    let audio = new Audio();
    audio.src = '/static/sounds/quack.mp3';
    audio.play();
    i += 1;
    nick = nickInput.value;
    console.log(i);
    if (nick !== '') {
        if (i % 1 === 0) {
            axios.post('/update_score', {nickname: nick})
                .then(response => {
                    console.log(response.data)
                }).catch(error => {
                console.log(error.response.data);
            });
        }
    }
};
