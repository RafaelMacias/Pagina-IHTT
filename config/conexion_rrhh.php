<?php
/*
$user_conexion = "moy1989";
$pass_conexion = "";//transporte2016$
$data_base_conexion = "IHTT_RRHH";
$host_conexion = "192.168.200.108";
*/

$user_conexion = "ihtt_rrhh";
$pass_conexion = "6htt2017#%&*6";//transporte2016$
$data_base_conexion = "IHTT_RRHH";
try{

	$host_conexion = "192.168.200.221";
	$dbr = new PDO("dblib:host=".$host_conexion.";dbname=".$data_base_conexion.";charset=utf8", $user_conexion, $pass_conexion);
	//$dbu = new PDO("sqlsrv:Server=".$host_conexion.";Database=".$data_base_conexion, $user_conexion, $pass_conexion);
} catch (PDOException $e) {
    echo 'Falló la conexión: conexion rrhh pagina web'; //. $e->getMessage();
}

?>