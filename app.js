class Field {
    constructor(targetDiv) {
        this.w = 20;
        this.h = 20;

        //let row = [];
        //for (let i = 0; i <= this.w; i++) { row.push(0); }

        this.fieldEl = '.';
        this.foodEl = '0';

        this.matrix = [];
        for (let i = 0; i <= this.h; i++) {
            let row = [];
            for (let i = 0; i <= this.w; i++) { row.push(this.fieldEl); }
            this.matrix.push(row);
        }

        this.targetDiv = targetDiv;

        this.snakeX = 0;
        this.snakeY = 0;
    }

    putMatrix() {
        this.targetDiv.textContent = '';
        this.matrix.forEach((row) => {
                row.forEach((el) => this.targetDiv.textContent += el);
                this.targetDiv.textContent += '\n';
            }
        )
    }
    placeSnake(snake) {
        this.matrix[this.snakeY][this.snakeX] = this.fieldEl;

        this.snakeX = snake.x;
        this.snakeY = snake.y;

        this.matrix[snake.y][snake.x] = snake.head;
    }
    putFood() {

        function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

        let foodX = getRandomInt(0, this.w);
        let foodY = getRandomInt(0, this.h);

        console.log('Put food to->', foodX, foodY);

        this.matrix[foodY][foodX] = this.foodEl;
    }

}

class Snake {
    constructor(field) {
        this.head = 'X';
        this.x = 5;
        this.y = 9;

        this.body = 3;

        this.direction = 'UP';

        this.field = { w: field.w, h: field.h }
    }

    move() {
        let curX;
        let curY;
        let nextEl;

        function checkNextEl(x, y, el) {
            if(nextEl != field.fieldEl) {
                console.log('M->', x, y, el);

                let curPoints = parseInt(pointsDiv.textContent);
                pointsDiv.textContent = curPoints + 1;

                snake.grow();

                field.putFood();
            }
        }

        switch (this.direction) {
            case 'UP':

                curY = this.y - 1;
                if (curY < 0) {
                    //console.log('border');
                    curY = this.field.h;
                }

                nextEl = field.matrix[curY][this.x];
                checkNextEl(this.x, curY, nextEl);

                this.y = curY;
                break;

            case 'DOWN':

                curY = this.y + 1;
                if (curY > this.field.h) {
                    //console.log('border');
                    curY = 0;
                }

                nextEl = field.matrix[curY][this.x];
                checkNextEl(this.x, curY, nextEl);

                this.y = curY;
                break;

            case 'LEFT':

                curX = this.x - 1;
                if (curX < 0) {
                    //console.log('border');
                    curX = this.field.w;
                }

                nextEl = field.matrix[this.y][curX];
                checkNextEl(curX, this.y, nextEl);

                this.x = curX;
                break;

            case 'RIGHT':

                curX = this.x + 1;
                if (curX > this.field.w) {
                    //console.log('border');
                    curX = 0;
                }

                nextEl = field.matrix[this.y][curX];
                checkNextEl(curX, this.y, nextEl);

                this.x = curX;


                break;
        }
        //console.log(`snake at: (${ this.x }, ${ this.y })`);
    }

    grow() {
        snake.body += 1;
    }

}

let field;
let snake;

let z = 0;
function moveSnake() {
    snake.move();
    field.placeSnake(snake);
    field.putMatrix();
    z++;
    //if(z < 20) requestAnimationFrame(moveSnake);
    setTimeout( () => requestAnimationFrame(moveSnake), 200);
}

let pointsDiv;

window.onload = () => {
    const contentDiv = document.getElementById('content');
    pointsDiv = document.getElementById('points');

    contentDiv.textContent = 'Start!\n';

    field = new Field(contentDiv);
    snake = new Snake(field);

    field.placeSnake(snake);

    for(let i = 0; i < 3; i++) field.putFood();

    field.putMatrix();

    //console.dir(field);
    //putMatrix(contentDiv);

    window.addEventListener('keydown', (e) => {
        let key  = e.key;
        //console.log(key);

        //return;
        switch(key) {
            //up
            case 'w':
                //console.log('Up!');
                snake.direction = 'UP';
                break;
            case 's':
                snake.direction = 'DOWN';
                //console.log('Down!');
                break;
            case 'a':
                snake.direction = 'LEFT';
                //console.log('left');
                break;
            case 'd':
                snake.direction = 'RIGHT';
                //console.log('right');
                break;
        }

    });

    requestAnimationFrame(moveSnake);
};