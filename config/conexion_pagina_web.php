<?php
$user_conexion = "gmazzoni";
$pass_conexion = "Dark*2017#";//transporte2016$
$data_base_conexion = "IHTT_PAGINA_WEB";
try {
    $host_conexion = "192.168.200.221";
	$dbpw = new PDO("dblib:host=".$host_conexion.";dbname=".$data_base_conexion.";charset=utf8", $user_conexion, $pass_conexion);
} catch (PDOException $e) {
    echo 'Falló la conexión: pagina web'; // . $e->getMessage();
}
?>


