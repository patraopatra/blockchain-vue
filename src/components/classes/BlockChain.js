import Block from "./Block"

export default class BlockChain {
    constructor(){
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 5
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2023", "Genesis Block", "0") // primeiro bloco, pode ter oq quiser
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash // pega o hash do ultimo bloco
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock) // coloca o bloco novo na blockchain
    }

    isChainValid(){ // validar a blockchain
        for(let i = 1; i < this.chain.length; i++){ // loop pela blockchain
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i-1]

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false // se o hash n for igual ao hash calculado, deu ruim
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false // se o hash do bloco anterior for diferente, deu ruim
            } 
        }
        return true
    }
}