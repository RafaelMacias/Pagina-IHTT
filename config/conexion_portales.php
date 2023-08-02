<?php
$user_conexion = "ablandin";
$pass_conexion = "Ab$2017*#$%";
$data_base_conexion = "IHTT_Portales";
try {
    $host_conexion = "sqlihtt";
	$dbp = new PDO("dblib:host=".$host_conexion.";dbname=".$data_base_conexion.";charset=utf8", $user_conexion, $pass_conexion);
} catch (PDOException $e) {
    echo 'Falló la conexión: portales satt'; // . $e->getMessage();
}
?>
