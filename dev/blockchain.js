//블록체인 데이터 구조
function Blockchain(){
    this.chain = [];
    this.pendingTransaction으로 = [];
}

//블록체인 데이터 구조에 공통으로 사용되는 프로토타입 함수
//새로운 블록을 만드는 함수이다.
//새로운 블록에는 index, timestamp, transactions, nonce, hash, previousBlockHash라는 속성이 있다.
Blockchain.prototype.createNewBlock = function(nonce,previousBlockHash,hash){
    const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    transactions: this.pendingTransaction,
    nonce:nonce,
    hash:hash,
    previousBlockHash:previousBlockHash
};
//블록체인 데이터 구조의 속성 중 하나인 pendingTransaction으로 비우고
//블록체인 데이터 구조의 속성 중 하나인 chain에 newBlock을 추가한 뒤 리턴한다.
    this.pendingTransaction = [];
    this.chain.push(newBlock);
    
    return newBlock;
    
}

//블록체인 데이터 구조의 속성 중 하나인 chain의 제일 마지막 블록을 리턴한다.
Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length - 1];
}

//블록체인 데이터 구조 중 하나인 newTransaction에 새로운 트랜잭션이 발생하는 함수
//트랜잭션은 거래가 발생할 때 마다 생기는 데이터이다.
//트랜잭션은 거래로 인해 발생한 어떤 기록이지 블록이 아니다.
//블록이 되려면 채굴자들이 마이닝을 해야한다.
//그래서 아직 완결이 안된 데이터라 볼 수 있다.
//맨위 블록체인 데이터 구조의 배열이 newTransaction이였는데 pendingTransaction으로 바꾸면
//미완결의 라는 뜻을 나타내니 이해가 쉬울 것이다.
Blockchain.prototype.createNewTransaction = function(amount,sender,recipient){
    const newTransaction = {
    amount: amount,
    sender: sender,
    recipient: recipient
    }
    
    this.pendingTransaction.push(newTransaction);
    
    return this.getLastBlock()['index'] + 1
}    

//블록체인 데이터 구조를 모듈화 해서 다른 페이지에서도 사용할 수 있게한다.
//test.js에서 테스트를 해보자.
module.exports=Blockchain;
