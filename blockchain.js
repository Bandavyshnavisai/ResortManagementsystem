const SHA256=require("crypto-js/sha256");
class block{
    constructor(index,timestamp,data,previousHash=" "){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
    }
    calculatehash(){
        return SHA256(
            this.index+
            this.previousHash+
            this.timestamp+
            JSON.stringify(this.data)
            
        ).toString();
    }
}
class BlockChain{
    constructor(){
        this.chain=[this.creategenesisblock()];
    } 
    
    creategenesisblock(){
        return new block(0,new Date().toString(),"genesis block",0);
    }
    getlatestblock(){
        return this.chain[this.chain.length-1];
    }
    addblock(newblock){
        newblock.previousHash=this.getlatestblock().previousHash;
        newblock.hash=newblock.calculatehash();
        console.log(`mined the block with hash:${newblock.hash}`);
        this.chain.push(newblock);
    }
    isChainValid(){
        for (let i =1;i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if (currentBlock.hash !== currentBlock.calculatehash()){
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true; 
    }
    
    
    
}
let mychain=new BlockChain();
console.log('<<adding 1st block>>');
mychain.addblock(new block(1,"09/04/2019",{qty:15}));
console.log('<<adding 2nd block>>');
mychain.addblock(new block(2,"09/04/2019",{qty:25}));
console.log(mychain.isChainValid()?'the chain is valid':'the chain is not valid');
module.exports.BlockChain=BlockChain;
module.exports.block=block;