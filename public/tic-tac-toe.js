
window.onload = (event => {
    //Keep track of game state
    let filled = 0; 
    let title = document.querySelector("#title")

    let board = document.querySelector("#board");
    board.addEventListener("click", handleBoardClick);

    let newBtn = document.querySelector("#new");
    newBtn.addEventListener("click", handleNewClick);

    let giveUpBtn = document.querySelector("#give-up")
    giveUpBtn.addEventListener("click", handleGiveUpClick);

    let r1 = document.querySelectorAll(".r1");
    let r2 = document.querySelectorAll(".r2");
    let r3 = document.querySelectorAll(".r3");

    let c1 = document.querySelectorAll(".c1");
    let c2 = document.querySelectorAll(".c2");
    let c3 = document.querySelectorAll(".c3");

    let d1 = document.querySelectorAll(".d1");
    let d2 = document.querySelectorAll(".d2");
    
    let winner;

    //UI tokens
    let x = document.querySelector("#x");
    let o = document.querySelector("#o");

    let nextToken = {
        "next": "x",
        "x": x,
        "o": o
    };

    //add two horizontal lines for board
    r1.forEach(ele => {
        ele.classList.add("bottom");
    });
    r2.forEach(ele => {
        ele.classList.add("bottom");
    });


    //add two vertical lines for board 
    c1.forEach(ele => {
        ele.classList.add("right");
    });

    c2.forEach(ele => {
        ele.classList.add("right");
    });

    //Gray out new game button
    if(!winner){
        newBtn.style.backgroundColor = "gray";
    }


    function handleBoardClick(event) {
        if(!winner){
            let square = event.target;
            console.log(square)
            if (square.children.length === 0) {
                //place token
                let next = nextToken["next"];
                square.appendChild(nextToken[next].cloneNode(true));
                if (next === "x") {
                    nextToken["next"] = "o";
                } else {
                    nextToken["next"] = "x";
                }
                filled++;

                console.log("filled")
                //check for winner
                let win = checkWinner();
                if (win) {
                    title.innerHTML = "Winner: " + win.toUpperCase();
                    winner = win;
                    newBtn.style.backgroundColor = "white";
                    giveUpBtn.style.backgroundColor = "gray";
                } else if (filled === 9) {
                    //check for tie
                    title.innerText = "Tie Game"
                }


            }
        }
    }

    function handleNewClick(event){
        if(!winner){
            console.log("cant click this");
        }else{
            resetGameBoard();
        }
    }

    function handleGiveUpClick(event){
        if(winner){
            console.log("can't click this");
        }else{
           resetGameBoard();
        }
    }


    //Check all rows, columns, diagonals for a winner
    function checkWinner(){
        return checkNodeList(r1) || checkNodeList(r2) || checkNodeList(r3)
        || checkNodeList(c1) || checkNodeList(c2) || checkNodeList(c3) ||
        checkNodeList(d1) || checkNodeList(d2);
    } 

    //check 3 nodes to see if they match
    function checkNodeList(r) {
        let rows = []; 
        r.forEach(ele => {
            if(ele.children.length > 0){
                rows.push(ele.children[0].className)
            }else{
                rows.push("");
            }
        });
        return checkMatch(rows);
    }

    //check to see if 3 strings match
    function checkMatch(l1){
        for(let i = 0; i < l1.length - 1; i++){
            if(l1[i] !== l1[i+1]){
                return false;
            }
        }
        return l1[0];
    }
    
    //Reset Game Board 
    function resetGameBoard() {
        title.innerText = "Tic-Tac-Toe";
        let tokensPlayed = document.querySelectorAll(".squares>div");
        tokensPlayed.forEach(tok => {
            tok.remove(); 
        });
        winner = undefined;
        nextToken["next"] = "x";
        filled = 0;
        giveUpBtn.style.backgroundColor = "white";
        newBtn.style.backgroundColor = "gray";

    }
}) 
