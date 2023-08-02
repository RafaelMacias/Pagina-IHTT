<?php
$user_conexion = "gmazzoni";
$pass_conexion = "Dark*2017#";//transporte2016$
$data_base_conexion = "IHTT_HELP_DESK";
try {
    $host_conexion = "sqlihtt";
	$dbhelp = new PDO("dblib:host=".$host_conexion.";dbname=".$data_base_conexion.";charset=utf8", $user_conexion, $pass_conexion);
} catch (PDOException $e) {
    echo 'Falló la conexión: help desk satt'; // . $e->getMessage();
}
?>
