var express = require('express')
//request-promise 모듈
var rp = require('request-promise');

var app = express()
//bodyParser 임포트
var bodyParser = require('body-parser')

//앞에서 만든 blockchain 모듈 임포트 -> 코인객체 생성
var Blockchain = require('./blockchain');
var bitcoin = new Blockchain();

//나의 네트워크 고유 아이디 생성
var uuid = require('uuid/v1');
var nodeAddress = uuid().split('-').join('');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

// 웹브라우저에 get 방식으로 /blockchain 주소를 입력했을 때 실행
app.get('/blockchain', function (req, res) {
  res.send(bitcoin)
})
 

// 웹브라우저에 post 방식으로 /transaction 주소를 입력했을 때 실행
app.post('/transaction', function (req, res) {

  const blockIndex = bitcoin.createNewTransaction(req.body.amount,req.body.sender,req.body.recipient);
  res.json({note : `트랜젝션은 ${blockIndex} 블락안으로 들어갈 예정입니다.`})

})


// 웹브라우저에 get 방식으로 /mine 주소를 입력했을 때 실행
app.get('/mine', function (req, res) {
  //마지막 블럭을 가져온다.
  const lastBlock = bitcoin.getLastBlock();

  //마지막 블럭의 해쉬 값, 즉 이전 블럭의 해쉬값
  const previousBlockHash = lastBlock['hash'];

  //현재 블락의 데이터 : 미완료된 거래내역 + 블락의 index 값
  const currentBlockData = {
    transactions:bitcoin.pendingTransaction,
    index:lastBlock['index'] + 1
  };

  //이전블락해쉬, 현재블럭 데이터를 proofOfWork에 넣고 맞는 hash값(0000sfaff...)을 찾고 해당 nonce 값을 리턴.
  const nonce = bitcoin.proofOfWork(previousBlockHash,currentBlockData);
  //이전블락해쉬, 현재블럭 데이터, nonce 값을 넣고 현재 블락의 해쉬 값 리턴
  const blockHash = bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce);

  //채굴에 대한 보상
  bitcoin.createNewTransaction(10,"bosang0000",nodeAddress)

  //새로운 블락을 생성하려면 nonce,previousBlockHash,blockHash 값이 필요하다.
  const newBlock = bitcoin.createNewBlock(nonce,previousBlockHash,blockHash);

  res.json({
    note: "새로운 블락이 성공적으로 만들어졌습니다.",
    newBlock : newBlock 
  })

})

//새로운 노드를 등록하고 전체 네트워크에 알림
app.post('/register-and-broadcast-node',function(req,res){
//새로 진입한 노드 주소
const newNodeUrl = req.body.newNodeUrl;
//비트코인 네트워크에 새로 진입한 노드의 주소가 없을 경우 추가
if(bitcoin.networkNodes.indexOf(newNodeUrl) == -1){
bitcoin.networkNodes.push(newNodeUrl);
}
const regNodesPromises = [];
//비트코인 네트워크에 등록된 네트워크에 새로운 노드 정보를 등록
bitcoin.networkNodes.forEach(networkNodes => {
//register - node
const requestOption = {
uri: networkNodesUrl + '/register-node',
method: 'POST',
body:{newNodeUrl:newNodeUrl},
json:true
};
//순차적으로 비동기를 실행하기 위해서 배열에 넣음
regNodesPromises.push(rp(requestOption))
}); //for 문 끝

//순차적으로 비동기 작업 처리
Promise.all(regNodesPromises)
.then(data => {
//새로운 노드안에 전체 네트워크에 대한 정보 한번에 입력해주기
const bulkRegisterOption = {
uri : newNodeUrl + '/register-nodes-bulk',
method : 'POST',
body : {allNetworkNodes : [...bitcoin.networkNodes,bitcoin.currentNodeUrl]},
json : true
};
return rq(bulkRegisterOption);
}).then(data => {
res.json({nodt: "새로운 노드가 전체 네트워크에 성공적으로 등록이 되었습니다."});

});
});

// 네트워크에 새로운 노드 등록
app.post('/register-node',function(req,res){
  //새로운 노드 주소
  const newNodeUrl = req.body.newNodeUrl;
  //코인 네트워크에 새로운 노드의 주소가 없다면,
  const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
  //코인의 현재 url이 새로운 노드 주소가 아니라면, 즉 현재 접속한 주소와 중복되지 않는다면,
  const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
  
  if(nodeNotAlreadyPresent&&notCurrentNode){
  //코인 전체 네트워크에 새로운 주소 등록
  bitcoin.networkNodes.push(newNodeUrl);
  res.json({note: "새로운 노드가 등록되었습니다."})
  }
  
  })
  
// 새로운 노드에 기존의 노드 정보 등록
app.post('/register-nodes-bulk',function(req,res){

})



//동적 포트 package.json script 객체에서 2번째 방에 들어있는 데이터 3001,3002,3003 ...3005
var port = process.argv[2];
app.listen(3000,function(){
  console.log(`listening on port ${port}...`)

})



