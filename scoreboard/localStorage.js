
let name1form = document.getElementById("name1");
let name2form = document.getElementById("name2");
let tscr1form = document.getElementById("tscr1");
let tscr2form = document.getElementById("tscr2");
let bscr1form = document.getElementById("bscr1");
let bscr2form = document.getElementById("bscr2");



//이름이 없으면 데이터저장 있으면 데이터 불러오기
if(!localStorage.getItem('name1')) {
  setStorage();
} else {
  getStorage();
}
//localstorage에 데이터 저장
function setStorage() {
  localStorage.setItem('name1', name1form.value);
  localStorage.setItem('name2', name2form.value);
  localStorage.setItem('tscr1', tscr1form.value.toString());
  localStorage.setItem('tscr2', tscr2form.value.toString());
  localStorage.setItem('bscr1', bscr1form.value.toString());
  localStorage.setItem('bscr2', bscr2form.value.toString());


  getStorage();
}
//데이터 가져오기
function getStorage() {
  let currentName1 = localStorage.getItem('name1');
  let currentName2 = localStorage.getItem('name2');
  let currentTscr1 = parseInt(localStorage.getItem('tscr1')); 
  let currentTscr2 = parseInt(localStorage.getItem('tscr2'));
  let currentBscr1 = parseInt(localStorage.getItem('bscr1'));
  let currentBscr2 = parseInt(localStorage.getItem('bscr2'));
 

  name1form.value = currentName1;
  name2form.value = currentName2;
  tscr1form.value = currentTscr1;
  tscr2form.value = currentTscr2;
  bscr1form.value = currentBscr1;
  bscr2form.value = currentBscr2;
}

// 점수 초기화
function clearScores(){
localStorage.setItem('name1', name1form.value);
localStorage.setItem('name2', name2form.value);
localStorage.setItem('tscr1', tscr1form.value.toString());
localStorage.setItem('tscr2', tscr2form.value.toString());
localStorage.setItem('bscr1','0');
localStorage.setItem('bscr2','0');

 getStorage();
}

//좌우 선수,점수판 바꾸기 
function switchSide(){
localStorage.setItem('name1', name2form.value);
  localStorage.setItem('name2', name1form.value);
  localStorage.setItem('tscr1', tscr2form.value.toString());
  localStorage.setItem('tscr2', tscr1form.value.toString());
  localStorage.setItem('bscr1', bscr2form.value.toString());
  localStorage.setItem('bscr2', bscr1form.value.toString());

  getStorage();
}

//종료
function exit(){
     location.href = "../main/prvGame.php";
}


//데이터 정보가 바뀔때마다 저장
name1form.onchange = setStorage;
name2form.onchange = setStorage;
tscr1form.onchange = setStorage;
tscr2form.onchange = setStorage;
bscr1form.onchange = setStorage;
bscr2form.onchange = setStorage;

