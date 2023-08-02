<?php
$user_conexion = "gfranco";
$pass_conexion = "Gf#$%2017*0";//transporte2016$
$data_base_conexion = "IHTT_ARCHIVO";
try {
    $host_conexion = "sqlihtt";
	$dbarchivo = new PDO("dblib:host=".$host_conexion.";dbname=".$data_base_conexion.";charset=utf8", $user_conexion, $pass_conexion);
} catch (PDOException $e) {
    echo 'Falló la conexión: satt conexion archivo';// . $e->getMessage();
}
?>