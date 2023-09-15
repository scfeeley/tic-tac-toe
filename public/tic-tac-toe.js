
window.onload = (event => {
    //Keep track of game state
    let filled = 0; 
    let title = document.querySelector("#title")

    let board = document.querySelector("#board");
    board.addEventListener("click", handleBoardClick);

    let newBtn = document.querySelector("#new");
    console.log(newBtn)
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


    function handleBoardClick(event) {
        if(!winner){
            let square = event.target;
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
                console.log("winner checked")
                console.log(win);
                if (win) {
                    title.innerHTML = "Winner: " + win.toUpperCase();
                    winner = win;
                } else if (filled === 9) {
                    //check for tie
                    title.innerText = "Tie Game"
                }


            }
        }
    }

    function handleNewClick(event){
        console.log("clicked");
    }

    function handleGiveUpClick(event){
        console.log("gave up")
    }


        
    function checkWinner(){
        return checkNodeList(r1) || checkNodeList(r2) || checkNodeList(r3)
        || checkNodeList(c1) || checkNodeList(c2) || checkNodeList(c3) ||
        checkNodeList(d1) || checkNodeList(d2);
    } 
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
    function checkMatch(l1){
        for(let i = 0; i < l1.length - 1; i++){
            if(l1[i] !== l1[i+1]){
                return false;
            }
        }
        return l1[0];
    };
})  
