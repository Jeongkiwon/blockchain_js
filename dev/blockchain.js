//sha256 모듈을 가져다 쓰겠다.
const  sha256 = require('sha256');

//현재 노드의 url -- package.json script 객체에서 3번째 방에 들어있는 데이터 http://localhost:3001
const currentNodeUrl = process.argv[3];

//블록체인 데이터 구조
function Blockchain(){
this.chain = [];
this.pendingTransaction = [];
//현재 node url -- 이부분!!!
this.currentNodeUrl = currentNodeUrl;
this.networkNodes = [];

//제네시스 블락 - 임의의 인자값 넣어준다.
this.createNewBlock(100,'0','0')
}



//블록체인 프로토 타입 함수 정의
Blockchain.prototype.createNewBlock = function(nonce,previousBlockHash,hash){
    //새 블록 객체
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransaction,
        nonce:nonce,
        hash:hash,
        previousBlockHash:previousBlockHash
    };

    //다음 거래를 위한 거래내역 배열 비워주고 새로운 블록을 chin 배열에 추가 
    this.pendingTransaction = [];
    this.chain.push(newBlock);

    return newBlock;

}

//마지막 블록 얻기 - chain 배열에는 블록데이터가 들어간다. 맨마지막 블록을 가져와라.
Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length - 1];
}

//새로운 트랜젝션(거래)가 발생했을 때 작동되는 함수
//인자값으로, 총액수, 보내는사람, 받는사람이 들어간다.
Blockchain.prototype.createNewTransaction = function(amount,sender,recipient){
    const newTransaction = {
        amount: amount,
        sender: sender,
        recipient: recipient
    }

    //맨위 트랜잭션 배열에 값을 넣어준다.
    this.pendingTransaction.push(newTransaction);

    //마지막 블록의 index 에서 + 1
    return this.getLastBlock()['index'] + 1
}

//해쉬 값 리턴 함수
Blockchain.prototype.hashBlock = function(previousBlockHash,currentBlockData,nonce){
    const dataAsString = previousBlockHash + nonce.toString() +  JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash
}

//pow 작업 함수 - 이전블록의 해쉬, 현재 블록 데이터와 nonce 값을 사용한다.
Blockchain.prototype.proofOfWork = function(previousBlockHash,currentBlockData){

    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
    while(hash.substring(0,4) != '0000'){
        nonce++;
        hash = this.hashBlock(previousBlockHash,currentBlockData,nonce)
    }
    return nonce;
}



//Blockchain 모듈화
module.exports = Blockchain;