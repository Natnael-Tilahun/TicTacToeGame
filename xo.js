var row=5;
var col=5;
   const creatTable=(function(r,c){
var row=r;
var col=c;
var body=document.getElementById('tableDiv')
const tbody=document.createElement('tbody');
const htmltable=document.createElement('table');

const table=new Array(row)
for(let i=0;i<row;i++){
    table[i]=new Array(col)
}
for(let i=0;i<row;i++){
    var tr=document.createElement('tr');
    for(let j=0;j<col;j++){
        var td=document.createElement('td')
        var cellText=document.createTextNode(i+''+j)
        td.appendChild(cellText)
        tr.appendChild(td)
        td.addEventListener("click", function(){ 
            checkTurn(this.parentNode.rowIndex +'' + this.cellIndex ,this)
        });

    }
        tbody.appendChild(tr)
}
body.appendChild(htmltable)
htmltable.appendChild(tbody)
})(row,col);
var turn='X';
var turnOver=row*row-1;
const player1Result=[]
const player2Result=[]
document.getElementById('PlayerX').innerHTML=localStorage.getItem('PlayerX');
document.getElementById('PlayerO').innerHTML=localStorage.getItem('PlayerO');

function Player(playerName,stepsArray,won){
    this.playerName=playerName;
    this.stepsArray=stepsArray;
    this.won=won;
    this.checkWinner=function(res){
        let testCase;
        function checkRowWinner(age) {
            testCase=res[0]
            return (age.charAt(0) == parseInt(testCase.charAt(0)));
        }
     
        function checkColumnWinner(age) {
            testCase=res[0]
            return (age.charAt(1) == parseInt(testCase.charAt(1)));
        }

        function checkLeftDiagonalWinner(age){
            return (age.charAt(0) == age.charAt(1));
        }
        function checkRightDiagonalWinner(age){
            testCase=res[0].charAt(0) + res[0].charAt(1)
            return ((parseInt(age.charAt(0)) + parseInt(age.charAt(1))) == testCase);
        }
     
        if(res.filter(checkRowWinner).length >= row){
            return true
        }
        else if(res.filter(checkColumnWinner).length >= row)
            return true
        else if(res.filter(checkLeftDiagonalWinner).length >= row)
            return true
        else if(res.filter(checkRightDiagonalWinner).length >= row)
            return true
        return false
    };
    this.checkGame=function(steps,a){
            this.stepsArray.push(steps)
            if(this.checkWinner(this.stepsArray)) {
                alert('\t\t\t\t\t\tCongratulation !!! \n\t\t\t\t\t' + this.playerName+ " is the Winner !!")
                this.won=localStorage.getItem(this.playerName)
                localStorage.setItem(this.playerName,++this.won)
                location.reload()
            }
            else if(turnOver==0){
                alert('\t\t\t\t\tGame Over!!!! \n\t\t\tDraw Game! Restart the game to play agian.');
                location.reload()
            }
            else 
                turnOver--
    };
}

const playerNati=new Player("PlayerX",player1Result,0);
const playerAbdu=new Player("PlayerO",player2Result,0);

function checkTurn(steps,htmlElement){
    if(turn=='X'){
        playerNati.checkGame(steps,htmlElement);
        htmlElement.style.color = "white";
        htmlElement.style.backgroundColor = "rgba(243, 87, 87,0.5)";
        htmlElement.innerHTML=turn;
        htmlElement.style.font="bold 3rem sans-serif";
        htmlElement.style.pointerEvents="none";
        turn="O"
    }
    else{
        playerAbdu.checkGame(steps,htmlElement);
        htmlElement.style.color = "white";
        htmlElement.style.backgroundColor = "rgba(0, 0, 255,0.5)";
        htmlElement.innerHTML=turn;
        htmlElement.style.font="bold 3rem sans-serif";
        htmlElement.style.pointerEvents="none"
        turn="X"
    }
}
function resetGame(){
    localStorage.clear()
    location.reload()
}