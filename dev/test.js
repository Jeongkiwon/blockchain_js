//blockchain.js 모듈을 이곳에서 가져다 쓰겠다.
const Blockchain = require('./blockchain');


//위에서 가져온 모듈의 객체를 만든다.
const bitcoin = new Blockchain();

//제네시스 블락
console.log(bitcoin)


//제네시스 블락 !
// Blockchain {
//     chain: 
//      [ { index: 1,
//          timestamp: 1527475657742,
//          transactions: [],
//          nonce: 100,
//          hash: '0',
//          previousBlockHash: '0' } ],
//     pendingTransaction: [] }
  





// const previousBlockHash = "abcdedferefa"
// const currentBlockData = [
//     {
//         amount: 10,
//         sender: 'BACKadffaaf',
//         recipient: 'HONGllalflks'

//     },
//     {
//         amount: 20,
//         sender: 'PACKadffaaf',
//         recipient: 'HONGllalflks'

//     },
//     {
//         amount: 30,
//         sender: 'PACKadffaaf',
//         recipient: 'HONGllalflks'

//     }
    
// ]

//pow 작업
//console.log(bitcoin.proofOfWork(previousBlockHash,currentBlockData)); //141237

//console.log(bitcoin.hashBlock(previousBlockHash,currentBlockData,141237))




//const nonce = 100;

//console.log(bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce))


//ec90a89a8364d8762ec3d365f2c8c91b1547af493e068009c119356b41f9699b



/*
//새로운 블락 만들기
bitcoin.createNewBlock(1111,"aaaaaaa","1a1a1a1a1a1a");

//새로은 트랜잭션 생성 - (총금액, 보내는이, 받는이)
bitcoin.createNewTransaction(100,'PACKadffaaf','HONGllalflks') 


//새로운 블락 생성 - 채굴후 얻은 블락(마이닝)
bitcoin.createNewBlock(2222,"bbbbbbb","2b2b2b2b2b2b");

//새로은 트랜잭션 생성2 - (총금액, 보내는이, 받는이)
bitcoin.createNewTransaction(777,'PACKadffaaf','HONGllalflks') 
//새로은 트랜잭션 생성3 - (총금액, 보내는이, 받는이)
bitcoin.createNewTransaction(888,'PACKadffaaf','HONGllalflks') 
//새로은 트랜잭션 생성4. - (총금액, 보내는이, 받는이)
bitcoin.createNewTransaction(999,'PACKadffaaf','HONGllalflks') 


//새로운 블락 만들기
bitcoin.createNewBlock(3333,"ccccccc","3c3c3c3c3c3c");




//찍어보기
console.log(bitcoin.chain[2])
*/







