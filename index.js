card = document.getElementById('field')
transform = []; /* массив для 3-х карточек по порядку их открытия */
card.addEventListener('click', function(event) {
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
});

function shuffle(arr){
	var j, temp;
	for(var i = arr.length - 1; i > 0; i--){
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
