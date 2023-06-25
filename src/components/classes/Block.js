const SHA256 = require('crypto-js/sha256')

export default class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString()
    }

    mineBlock(difficulty){ // o hash do bloco deve começar com x zeros
        while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")){
            // fica rodando até o hash começar com o tanto de 0 em difficulty
            this.nonce++
            this.hash = this.calculateHash()
        }
        console.log("Bloco minerado: " + this.hash)
    }
}