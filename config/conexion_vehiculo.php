<?php
$user_conexion = "emejia";
$pass_conexion = "elio7g@llo";//transporte2016$
$data_base_conexion = "IHTT_SISGESVEH";
try {
    $host_conexion = "sqlihtt";
	$dbv = new PDO("dblib:host=".$host_conexion.";dbname=".$data_base_conexion.";charset=utf8", $user_conexion, $pass_conexion);
} catch (PDOException $e) {
    echo 'Falló la conexión: vehículo';// . $e->getMessage();
}
?>