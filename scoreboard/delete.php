<?php
if ( !isset($_POST["chkDel"]) || !is_array($_POST["chkDel"]) ) {
    die('missing or wrong parameter "chkDel"');
}
include_once('/lib/mssql.lib.php');
$dbconn = sqlserverConnection();

$query = 'DELETE FROM scoreboard WHERE matchidx = ?';
$stmt = sqlsrv_prepare($dbconn, $query, array(&$id));
if( !$stmt ) {
    die( print_r( sqlsrv_errors(), true) );
}

foreach( $_POST["chkDel"] as $id ) {
    if( !sqlsrv_execute( $stmt ) ) {
        die( print_r( sqlsrv_errors(), true) );
    }
  }

  sqlsrv_free_stmt( $tsql);
sqlsrv_close( $dbconn);
header("Location: {$_SERVER['HTTP_REFERER']}");
exit;
    ?>
