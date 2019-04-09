var d = 0;
var size = 16;
var snakeSize = 3;

//Coordinates of actual snake head position
var headTr = 0;
var headTd = 0;

//Coordinates of actual apple position
var drawnTr = 0;
var drawnTd = 0;

var appleTr = 0;
var appleTd = 0;

var SnakePosition = class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

var snake = [];

var counter = 0;

var timer;

document.addEventListener('keydown', moveSnakeConstant, false);

function changeColor() {
    var lamaButton = document.getElementsByTagName("button")[0];
    lamaButton.style.color="red";
}

function losuj() {
    return Math.floor( Math.random() * 16);
}

function createSnakeTable() {
    var snakeTableDiv = document.getElementById("snakeTableDiv");

    

    const myTable = document.createElement('table');
	snakeTableDiv.innerText = "";
    //myTable.innerHTML = snaketable;
    references =[];
    //let JT=0;
    for (let i=0; i<size; i++) {    
        const row = document.createElement("tr");
        myTable.append(row);
        for  (var j=0; j<size; j++) {
        
           let td =document.createElement("td");
           //td.innerText = `${i} : ${j}`;
            //^to samo co: td.innerText = i + ' : ' + j;
                //td.style.backgroundColor = `rgb(${losuj()}, ${losuj()}, ${losuj()})`;
            td.innerInt = losuj();
            //td.innerText = "";
            parseInt("td.innerInt", 10);   

            
            row.append(td);
            //references[(i * 16) + j] = td;
        }
    }

    snakeTableDiv.append(myTable);

    drawSnake();
    dropApple();
}


function dropApple() {
    deleteApple();

    drawnTr = parseInt(Math.random() * 16);
    drawnTd = parseInt(Math.random() * 16);
    var snakeTableDiv = document.getElementById("snakeTableDiv");

    var table = document.getElementById("snakeTableDiv"),
      tr = table.getElementsByTagName('tr')[drawnTr],
        td = tr.getElementsByTagName('td')[drawnTd];

    appleTd = drawnTd;
    appleTr = drawnTr;

        if(td.style.backgroundColor == "green")
        {
            dropApple();
        }
        else
        {
            td.style = "background-color: red;";
        }
}


function deleteApple(){
    var table = document.getElementById("snakeTableDiv"),
            tr = table.getElementsByTagName('tr')[parseInt(drawnTr)],
            td = tr.getElementsByTagName('td')[parseInt(drawnTd)];

    if(td.style.backgroundColor != "green")
    {
        td.style = "background-color: #DEB887;";
    }
}

function drawSnake(){
    var drawnTr = parseInt(Math.random() * 16);
    var drawnTd = parseInt(Math.random() * 16);

    var table = document.getElementById("snakeTableDiv"),
            tr = table.getElementsByTagName('tr')[drawnTr],
            td = tr.getElementsByTagName('td')[drawnTd];

            td.style = "background-color: green";

    headTr = drawnTr;
    headTd = drawnTd;

    snake.push(new SnakePosition(drawnTd, drawnTr));
    console.log(snake);
}

var delta = 500;
var lastKeypressTime = 0;

function moveSnakeConstant(e){
    clearTimeout(timer);
    timer = setInterval('moveSnake('+ e.keyCode + ')', 100);
}

function moveSnake(code)
{
    var thisKeypressTime = new Date();
          if (thisKeypressTime - lastKeypressTime <= delta)
          {
              var actualSnakeSize = snake.length - 1;

                switch (code) {
                    case 37: // Left
                        if (snake[actualSnakeSize].x > 0)
                        {
                            var table = document.getElementById("snakeTableDiv"),
                                tr = table.getElementsByTagName('tr')[snake[actualSnakeSize].y],
                                td = tr.getElementsByTagName('td')[snake[actualSnakeSize].x - 1];
                                td.style = "background-color: green";

                            
                            makeStep(snake[actualSnakeSize].x - 1, snake[actualSnakeSize].y);
                        }
                        break;

                    case 40: // Down
                        if (snake[actualSnakeSize].y < 15)
                        {
                            var table = document.getElementById("snakeTableDiv"),
                                tr = table.getElementsByTagName('tr')[snake[actualSnakeSize].y + 1],
                                td = tr.getElementsByTagName('td')[snake[actualSnakeSize].x];
                                td.style = "background-color: green";
                            
                            makeStep(snake[actualSnakeSize].x, snake[actualSnakeSize].y + 1);
                        }
                        break;

                    case 39: // Right
                        if (snake[actualSnakeSize].x < 15)
                        {
                            var table = document.getElementById("snakeTableDiv"),
                                tr = table.getElementsByTagName('tr')[snake[actualSnakeSize].y],
                                td = tr.getElementsByTagName('td')[snake[actualSnakeSize].x + 1];
                                td.style = "background-color: green";

                            makeStep(snake[actualSnakeSize].x + 1, snake[actualSnakeSize].y);
                        }
                        break;

                    case 38: // Up
                        if (snake[actualSnakeSize].y > 0)
                        {
                            var table = document.getElementById("snakeTableDiv"),
                                tr = table.getElementsByTagName('tr')[snake[actualSnakeSize].y -1],
                                td = tr.getElementsByTagName('td')[snake[actualSnakeSize].x];
                                td.style = "background-color: green";

                            makeStep(snake[actualSnakeSize].x, snake[actualSnakeSize].y - 1);
                        }
                        break;
                    }


            thisKeypressTime = 0;
          }
          lastKeypressTime = thisKeypressTime;
}

function makeStep(x, y) {
    if (x == appleTd && y == appleTr) {
        console.log("OMNOMNOMNOM");
        dropApple();
        snakeSize++;
        counter++;
        document.getElementById("counterDiv").innerText = "Wynik: " + counter;
    }

    snake.push(new SnakePosition(x, y));
    if (snake.length > snakeSize) {
        var table = document.getElementById("snakeTableDiv"),
            tr = table.getElementsByTagName('tr')[snake[0].y],
            td = tr.getElementsByTagName('td')[snake[0].x];
            td.style = "background-color: #DEB887";
        snake.shift();
    }
    console.log(snake);
}