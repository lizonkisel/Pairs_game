card = document.getElementById('field');
cards = Array.from(card.getElementsByClassName('card'));
let timerShow = document.getElementById("timer");
var timer_start = false;
transform = []; /* массив для 3-х карточек по порядку их открытия */
card.addEventListener('click', function(event) {
    console.log(transform);
    texts = ['WIN', 'LOSE'];
    if(!timer_start) {
        var sec = 60;
        let game_timer = setInterval(function timer() {
            sec = sec - 1;
            if (final_transform.length === 12) {
                timer_start = false;
                result_text = document.querySelectorAll('.result_text');
                result_text[0].innerHTML = texts[0];
                document.getElementsByClassName('overlay')[0].style= "visibility: visible";
                document.getElementsByClassName('result_text')[0].classList.add('animation');
                clearInterval(game_timer);
                transform = [];
            }
            if (sec >= 10) {
                var strTimer = '00:' + String(sec);
            } else {
                var strTimer = '00:0' + String(sec);
            }
            timerShow.innerHTML = strTimer;
            if (sec === 0) {
                timer_start = false;
                result_text = document.querySelectorAll('.result_text');
                result_text[0].innerHTML = texts[1];
                document.getElementsByClassName('overlay')[0].style= "visibility: visible";
                document.getElementsByClassName('result_text')[0].classList.add('animation');
                clearInterval(game_timer);
                transform = [];
            }
        }, 1000);
        timer_start = true;
    }

    if (event.target.tagName === 'DIV') {
        let cardDiv = event.target.closest('.card');
        cardDiv.classList.toggle('transform'); /* это и 2 строчки выше - поворот краточек */
        temp_transform = Array.from(card.querySelectorAll('.transform'));
        if (transform.length >= 3) {
            transform.splice(0, 2);
        }; /* если длина массива больше 3 - удаляем первые 2 элемента. То есть открытой остаётся одна карточка */
        for (var m=0, len = temp_transform.length; m < len; m++) {
            if (transform.indexOf(temp_transform[m]) === -1) {
                transform.push(temp_transform[m]);
            }
        } /* проверяем, есть ли в массиве из 3-х карточек уже перевёрнутые. Если нет - пушим их туда */
        if (transform.length === 2) {
            if (transform[0].innerHTML != transform[1].innerHTML) {
                transform[0].querySelector('.back').classList.remove('color');
                transform[0].querySelector('.back').classList.add('wrong');
                transform[1].querySelector('.back').classList.remove('color');
                transform[1].querySelector('.back').classList.add('wrong');

            } else if (transform[0].innerHTML === transform[1].innerHTML) {
                transform[0].querySelector('.back').classList.remove('wrong');
                transform[1].querySelector('.back').classList.remove('wrong');
                transform[0].querySelector('.back').classList.remove('color');
                transform[0].querySelector('.back').classList.add('right');
                transform[1].querySelector('.back').classList.remove('color');
                transform[1].querySelector('.back').classList.add('right');
                transform[0].classList.add('not_clickable');
                transform[1].classList.add('not_clickable');
                transform[0].classList.add('not_transform');
                transform[1].classList.add('not_transform');
            }
        } else if (transform.length != 1 & transform.length != 2) {
            for (var n=0, len = transform.length - 1; n < len; n++) {
                transform[n].classList.remove('transform');
            }

            for (var k=0, len = transform.length; k < len; k++) {
                transform[k].querySelector('.back').classList.remove('wrong');
                transform[k].querySelector('.back').classList.add('color');
                if (transform[k].classList.contains('not_transform')) {
                    transform[k].querySelector('.back').classList.remove('color');
                }
            }

        }
    }
    final_transform = Array.from(card.querySelectorAll('.not_transform'));
});

button_new = document.getElementsByClassName('restart');
button_new[0].addEventListener('click', function(event) {
    /* button_new[0].style= "box-shadow: inset 2px 1px 8px";
    button_new[0].classList.add('restart_active'); */
    retransform = Array.from(card.querySelectorAll('.not_transform'));
    for (var k=0, len = retransform.length; k < len; k++) {
        retransform[k].classList.remove('transform');
        retransform[k].classList.remove('not_clickable');
        retransform[k].classList.remove('not_transform');
        retransform[k].querySelector('.back').classList.remove('right');
        retransform[k].querySelector('.back').classList.remove('wrong');
        retransform[k].querySelector('.back').classList.add('color');
    };

    no_transform = Array.from(card.querySelectorAll('.transform'));
    for (var k=0, len = no_transform.length; k < len; k++) {
        no_transform[k].classList.remove('transform');
        no_transform[k].classList.remove('not_clickable');
        no_transform[k].classList.remove('not_transform');
        no_transform[k].querySelector('.back').classList.remove('right');
        no_transform[k].querySelector('.back').classList.remove('wrong');
        no_transform[k].querySelector('.back').classList.add('color');
    };

    setTimeout(lol, 1000);
    function lol() {
        var my_name = shuffle(new_name);
        var emoji = document.querySelectorAll('.emoji');
        for (var i=0, len = emoji.length; i < len; i++) {
            emoji[i].innerHTML = my_name[i];
        };
    }

    document.getElementsByClassName('overlay')[0].style = "visibility: hidden";
    document.getElementsByClassName('result_text')[0].classList.remove('animation');

    timerShow.innerHTML = '01:00';
});

function shuffle(arr) {
	var j, temp;
	for(var i = arr.length - 1; i > 0; i--) {
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
};

var name = new Array('\u{1F436}', '🐙', '🐼',  '🦄', '🐷', '🐓', '\u{1F436}', '🐙', '🐼',  '🦄', '🐷', '🐓');
new_name = new Array();
for (var j=0, len = name.length; j < len; j=j+3) {
    new_name.push(name[j]+name[j+1]);
};
var my_name = shuffle(new_name);

var emoji = document.querySelectorAll('.emoji');
for (var i=0, len = emoji.length; i < len; i++) {
    emoji[i].innerHTML = my_name[i];
};
