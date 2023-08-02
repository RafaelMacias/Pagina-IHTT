<?php
$user_conexion = "gmazzoni";
$pass_conexion = "Dark*2017#";//transporte2016$
$data_base_conexion = "IHTT_DB";
try {
    $host_conexion = "sqlihtt";
	$dbsice = new PDO("dblib:host=".$host_conexion.";dbname=".$data_base_conexion.";charset=utf8", $user_conexion, $pass_conexion);
} catch (PDOException $e) {
    echo 'Falló la conexión: satt conexion sice';// . $e->getMessage();
}
?>