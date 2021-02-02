<?php
include_once('/lib/mssql.lib.php');
$dbconn = sqlserverConnection();

$sunname1 = $_POST['name1'];
$sunname2 = $_POST['name2'];
$score1 = $_POST['tscr1'];
$score2 = $_POST['tscr2'];
$sim1 = $_POST['simpan1'];
$winner = $_POST['winner'];
$query1 = "UPDATE scoreboard
    SET sunname1='$sunname1',sunname2='$sunname2',gameresult='$winner',score1='$score1',score2='$score2',gdate= GETDATE()";
$query2="WHERE  (sunname1 = '$sunname1' AND sunname2 ='$sunname2') OR (sunname1 = '$sunname2' AND sunname2 ='$sunname1');";

$query = $query1.$query2;

 $result1=sqlsrv_query($dbconn,$query);
 $result = sqlsrv_rows_affected($result1);
if($result == 1){
   echo "<SCRIPT>
        alert('저장되었습니다.');
        window.location.href='scoreboard.php';
    </SCRIPT>";
  exit();

}else if($result == 0){
  header("Location:../main/prvGame.php");
  exit;
}else (
"hmmmmmmmm");
sqlsrv_close( $dbconn);
    ?>
