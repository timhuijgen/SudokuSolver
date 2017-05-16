class UI {

    constructor() {
        this.element = document.getElementById('puzzle');

        this.draw();
    }

    draw() {
        for(let y = 0; y < 9; y++) {
            for(let x = 0; x < 9; x++) {
                let div = document.createElement('div');
                div.classList.add('field');
                div.id = 'field-' + x + '-' + y;
                div.innerHTML = '(' + x + ', ' + y + ')<br/><span class="value">0</span>';
                this.element.appendChild(div);
            }
        }
    }

    colorGroups(groups) {
        groups.forEach(group => {
            let color = getRandomColor(),
                textColor = invert(color);

            group.fields.forEach(field => {
                let el = this.getElement(field.x, field.y);
                el.style.backgroundColor = '#' + color;
                el.style.color = '#' + textColor;
            });

        });
    }


    getElement(x, y) {
        return document.getElementById('field-' + x + '-' + y);
    }

    setElementValue(x, y, value) {
        this.getElement(x, y).innerHTML = '(' + x + ', ' + y + ')<br/><span class="value">' + value + '</span>';4
    }


}

export default UI;