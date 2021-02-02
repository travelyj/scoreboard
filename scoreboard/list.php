<?php
include_once('/lib/mssql.lib.php');
$dbconn = sqlserverConnection();

if(isset($_GET["page"])){
  $page = $_GET["page"];
}else{
  $page = 1;
};
$sql = "SELECT matchidx,sunname1,sunname2,sim01,gameresult,score1,score2,CONVERT(VARCHAR(30), gdate, 100) as gdate FROM scoreboard ORDER BY matchidx desc ";
  $result = sqlsrv_query($dbconn,$sql,array(), array( "Scrollable" => 'static' ));
$total_record = sqlsrv_num_rows($result);
$list = 5;
$block_cnt = 5;
$block_num = ceil($page/$block_cnt);
$block_start = (($block_num-1)* $block_cnt)+1;
$block_end = $block_start+$block_cnt -1;
$total_page = ceil($total_record/$list);
if($block_end > $total_page){
  $block_end = $total_page;
}
$total_block = ceil($total_page/$block_cnt);
$page_start = ($page -1) * $list;
$add = "OFFSET $page_start ROWS FETCH NEXT $list ROWS ONLY ";
$sql2 = $sql.$add;
$result2 = sqlsrv_query($dbconn,$sql2);
// echo $sql2;
// exit;
?>
<script src="//code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>

<style type="text/css">
.tftable {font-size:12px;color:#333333;width:100%;border-width: 1px;border-color: #729ea5;border-collapse: collapse;}
.tftable th {font-size:12px;background-color:#acc8cc;border-width: 1px;padding: 8px;border-style: solid;border-color: #729ea5;text-align:left;}
.tftable tr {background-color:#d4e3e5;}
.tftable td {font-size:12px;border-width: 1px;padding: 8px;border-style: solid;border-color: #729ea5;}
.clickable-row:hover {background-color:#ffffff;}
</style>
 <form name="frmMain" id="matchlist" action="delete.php" method="post" onsubmit="return onDelete();">
<table class="tftable" border="1">
<thead>
    <tr>
    <th>idx</th>
    <th>선수1</th>
    <th>점수1</th>
    <th>선수2</th>
    <th>점수2</th>
    <th>승</th>
    <th>심판</th>
    <th>날짜</th>
    <th>삭제<input type="checkbox" id="selectall" onClick='toggle(this)' ></th>
    </tr>
</thead>
<tbody>
<?php

while ($row= sqlsrv_fetch_array($result2)){
?>
    <tr >
        <td class= "clickable" data-href=""><?php echo $row['matchidx'] ?></td>
        <td><?php echo $row['sunname1'] ?></td>
        <td><?php echo $row['score1']?></td>
        <td><?php echo $row['sunname2']?></td>
        <td><?php echo $row['score2']?></td>
        <td><?php echo $row['gameresult']?></td>
        <td><?php echo $row['sim01']?></td>
        <td><?php echo $row['gdate']?></td>
        <td><input type="checkbox" id="selectall" name="chkDel[]" value="<?php echo $row['matchidx']; ?>"></td>
    </tr>
<?php

  }
  // sqlsrv_close($dbconn);
  // 

  sqlsrv_free_stmt($result2);
?>
</tbody>
</table>
<div id ="page_num" style="text-align: center">
  <a href="<?php echo $PHP_SELP?>?page=<?php echo $page-1?>">이전</a>
     <?php 
         for($i=$block_start;$i<=$block_end;$i++){
          if($page == $i){
            echo "<b>$i</b>";
          }else{
            echo "<a href='list.php?page=$i'>$i</a>";
          }
         }
         ?>

  <a href="<?php echo $PHP_SELP?>?page=<?php echo $page+1?>">다음</a>

   </div>
<a href="scoreboard.php">이전게임</a>
<a href="../main/prvGame.php">메인</a>
<button  type="submit">선택삭제</button>
   </form>
   
<script language="JavaScript">
    function onDelete()
    {
        if(confirm('Do you want to delete ?')==true)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

function toggle(source) {
  // Get all input elements
  var inputs = document.getElementsByTagName('input'); 
   // Loop over inputs to find the checkboxes whose name starts with `orders`
   for(var i =0; i<inputs.length; i++) {
     if (inputs[i].type == 'checkbox' && inputs[i].name.indexOf('chkDel') === 0) { 
       inputs[i].checked = source.checked;
     }
   }
 }
</script>
