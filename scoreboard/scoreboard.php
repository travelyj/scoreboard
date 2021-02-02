<?php
echo '<link rel="stylesheet" href="/js/icofont/icofont.min.css">';
echo '<link rel="stylesheet" href="/js/font-awesome/css/font-awesome.min.css">';
?>
<?php
$sunname1 = $_GET['sunname1'];
$sunname2 = $_GET['sunname2'];


include_once('/lib/mssql.lib.php');
$dbconn = sqlserverConnection();
$sql = "select * from scoreboard where  (sunname1 = '$sunname1' AND sunname2 ='$sunname2') OR (sunname1 = '$sunname2' AND sunname2 ='$sunname1')";
$result= sqlsrv_query($dbconn,$sql);
$rows=sqlsrv_num_rows($result);

while ($row=sqlsrv_fetch_array($result)){
  $name1 = $row['sunname1'];
  $name2 =  $row['sunname2'];
  $score1 = $row['score1'];
  $score2 = $row['score2'];
  $sim = $row['sim01'];
}

sqlsrv_close($dbconn);
?>
<link rel="stylesheet" href="scoreboard.css?v=4">
<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>

<form id="scoreForm" name="scoreForm" action="update.php"  method="post" enctype="multipart/form-data" autocomplete="off" >
  <span id="error" style="display:none; color:#F00">Some Error!Please Fill form Properly </span> <span id="success" style="display:none; color:#0C0">All the records are submitted!</span>
  <div id="scoreWrap">
    <button type="button" id="fullscreen-button" class="btn btn-info"><i class="fa fa-expand"></i></button>

    <div id="scoreBoard">
      <input name="simpan" value="<?php echo $sim;?>" hidden>
      <input name="winner" id="winner" value="" hidden>
      <div id="player1">
        <input name="tscr1"  id="tscr1"  value="<?php echo $score1?$score1:0 ?>"  readonly >
        <input id="name1" name="name1" value="<?php echo $name1?$name1:$sunname1 ;?>" readonly>
        <span class="scoreblock minus" onclick="minusOne(score1)"><i class="icofont-minus-square"></i></span>
        <span class="scoreblock plus" onclick="addOne(score1)"><i class="icofont-plus-square"></i></span>
      </div>



      <div id="vs"><span id="chng" onclick="switchSide();"><i class="fa fa-exchange" aria-hidden="true"></i></span><h1>VS</h1></div>



      <div id="player2">
       <input   name="tscr2" id="tscr2" value="<?php echo $score2?$score2:0 ?>" readonly>
       <input name="name2"  id="name2" value="<?php echo $name2?$name2:$sunname2; ?>" readonly>
       <span class="scoreblock minus" onclick="minusOne(score2)"><i class="icofont-minus-square"></i></span>
       <span class="scoreblock plus" onclick="addOne(score2)"><i class="icofont-plus-square"></i></span>
     </div>
   </div>


   <div id="scoreBoard2">

    <div id="scr1">
      <input  name="bscr1"  id="bscr1" class="scoreblock2"  value=0 readonly>
      <span class="scoreblock2 minus" onclick="minusOne(scr1)"><i class="icofont-minus-square"></i></span>
      <span  class="scoreblock2 plus" onclick="addOne(scr1)"><i class="icofont-plus-square"></i></span>
    </div>



    <div id="vs"></div>



    <div id="scr2">
     <input name="bscr2"  id="bscr2" class="scoreblock2" value=0 readonly>
     <span  class="scoreblock2 minus" onclick="minusOne(scr2)"><i class="icofont-minus-square"></i></span>
     <span  class="scoreblock2 plus" onclick="addOne(scr2)"><i class="icofont-plus-square"></i></span>
   </div>
 </div>
</div>

<div id="linetop"></div>

<div id="buttons">
  <button type="button" id="countBtn">타이머</button>
  <button type="button" onclick="clearScores();">게임 RESET</button>
  <button type="submit" name="save" id="save" onclick="saveWinner();" value="save"> 경기저장</button>
  <button type="button" onclick="exit();">종료</button>
  <button type="button"><a href="list.php" target="_blank">리스트</a></button>
</div>

<div id="countdown">
  <a href="" class="cd-popup-close cd-close-button"><i class="fa fa-times fa-4x" style="pointer-events:none;"></i></a>
  <div id="setmins">
   <input type="number" value="15" class="start-time" id="cd_minutes" pattern="[0-9]*"/>
   <i id="minutes">분</i></div>
   <div id="errorMessage" class="sr-only" role="error"></div>
   <h1 id="time">00:00:00</h1>
   <ul>
    <li id="playpause">▶</li>
    <li id="reset">&#9724;</li>
  </ul>

</div>
</form>

<script src="localStorage.js"></script>
<script src="bottom.js"></script>
<script type="text/javascript">

  let score1 = document.getElementById("tscr1");
  let score2 = document.getElementById("tscr2");
  let scr1 = document.getElementById("bscr1");
  let scr2 = document.getElementById("bscr2");

  function addOne (score) {
    score.value++;
    score.innerText = score.value;
    setStorage();
  }

  function minusOne (score) {
    if(score.value>0){
      score.value--;
      score.innerText = score.value;
      setStorage();
    }
  }

  function saveWinner(){
    winner = document.getElementById("winner");
    getStorage();

    if(tscr1form.value>tscr2form.value){
      winner.value = name1form.value;  
    }else{
      winner.value = name2form.value;
    }
  };

</script>
