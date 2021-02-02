<?php echo '<link rel="stylesheet" href="/js/font-awesome/css/font-awesome.min.css">';
?>
<link rel="stylesheet" href="prvGame.css">

<!-- <button id="open-multiple" disabled type="button">Open video Files</button> -->
<a href="../scores/scoreboard.php" id="prvBtn"><i class="fa fa-long-arrow-left" aria-hidden="true"></i>&nbsp;이전게임으로</a>
<div id="fullscreen-button" class="btn btn-info"><i class="fa fa-expand"></i></div>

<div class="totalWrap">
  <video id="videos"  type="video/mp4"  autoplay preload="auto" muted controls >
  </video>
  <form id="nameForm" name="nameForm"  action="../scores/insert.php"  method="post" autocomplete="off" enctype="multipart/form-data"  onsubmit="return validateForm(this);">
    <div class="players">
      <input  type="text" class ="span sunname1" name="sunname1" value=""  placeholder="선수1"  onkeyup="nospaces(this)" required >
      <button class="span startBtn" onclick="beforeGame();" type="submit" >게임시작</button>
      <input type="text" class ="span sunname2"  name="sunname2" value=""   placeholder="선수2"  onkeyup="nospaces(this)" required>
      <input type="text" class =""  name="simpan" value="" placeholder="심판"  onkeyup="nospaces(this)" required>
    </div>
  </form>
</div>
<script type="text/javascript">
  function nospaces(t){
  if(t.value.match(/\s/g)){
    t.value=t.value.replace(/\s/g,'');
  }
}
  function validateForm(t){
  p1 = t.sunname1;
  if (!(/^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]*$/i.test(p1.value))) {
    alert("선수1:문자/숫자만 입력하세요");
    p1.focus();
    return false;
  }
     p2 = t.sunname2;
     if (!(/^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]*$/i.test(p2.value))) {
    alert("선수2:문자/숫자만 입력하세요");
     p2.focus();
    return false;
  }
     sim = t.simpan;
       if (!(/^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]*$/i.test(sim.value))) {
    alert("심판:문자/숫자만 입력하세요");
    sim.focus();
    return false;
  }
  if(p1.value==p2.value){
     alert("선수1 선수2 정보를 다르게 입력해주세요");
      return false;
  }
  return true;
  };

</script>

<script src="prvGame.js"></script>
<!-- <script type="module" src="prvGame.js"></script> -->

