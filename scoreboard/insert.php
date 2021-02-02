<?php

$sunname1 = $_POST['sunname1'];
$sunname2 = $_POST['sunname2'];
$sim1 = $_POST['simpan'];
include_once('../../lib/mssql.lib.php');
$dbconn = sqlserverConnection();

//    QUERY
 $query = "IF NOT EXISTS (SELECT * FROM scoreboard WHERE (sunname1 = '$sunname1' AND sunname2 ='$sunname2') OR (sunname1 = '$sunname2' AND sunname2 ='$sunname1'))

 INSERT INTO scoreboard (sunname1,sunname2,sim01,gdate,score1,score2,gameresult) 
           VALUES  ('$sunname1','$sunname2','$sim1',GETDATE(),'0','0','0');
           ";

$result1 = sqlsrv_query($dbconn,$query);
if(!$result1){
    echo "err";
}
sqlsrv_close($dbconn);
header("Location:scoreboard.php?sunname1=".urlencode($sunname1)."&sunname2=".urlencode($sunname2));
exit;
?>
<!-- <script type="text/javascript">location.href = 'scoreboard.php';</script> -->
