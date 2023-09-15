class Tokens {
    constructor(x, o) {
        this.x = x.cloneNode(true);
        this.o = o.cloneNode(true);
        this.next = this.x;
    }

    updateNextToken() {
        console.log(this.next.classList)
        if (this.next.classList.contains("x")) {
            this.next === o;
        } else {
            this.next === x;
        }
    }

    getNextNode() {
        let nextNode = this.next.cloneNode(true);
        this.updateNextToken();
        return nextNode;
    }
}