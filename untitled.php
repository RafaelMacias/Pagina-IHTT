<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Content-type: application/x-javascript');
date_default_timezone_set("America/Tegucigalpa");
require_once("config/conexion_rrhh.php");
require_once("config/conexion_usuarios.php");
require_once("config/conexion_pagina_web.php");

// require_once("config/conexion_HD.php");
//Empleados();
class Api_PW {
	private $info;

	function Api_PW(){

function InsertarUs($q, $parametros){
    global $dbu;
	$stmt = $dbu->prepare($q);
	return $stmt->execute($parametros);
}

	if(isset($_POST["action"])){
		if ($_POST["action"] == "save-escaneo") {
			$this->CargaSolicitud();///carga de PDF
		}//Aqui Continua la Consulta con un elseif
  	
	}

	if(isset($_GET["action"])){
		if($_GET["action"] == "get-documentos" && isset($_GET["cat"]) ) {
			$this->getDocumentos();///Obtiene los documentos segun carpeta
		}//Aqui Continua la Consulta con un elseif//
	}
}

//Funcion para cargar los documentos de pases de salida escaneados
 function CargaSolicitud() {
 	global $dbpw;
	$dbpw->beginTransaction();
	//--categoria documento
	$categoria = $_POST ['categoria'];
	$nombrepdf = $_POST ['nombrepdf'];
	$desccategoria = $_POST ['desccategoria'];


  	$nombre_archivo = $_FILES['EscaneoSolicitud']['name']; //Nombre completo con extencion
  	$Nombre_base = substr($nombre_archivo, 0, strripos($nombre_archivo, '.')); // nombre completo sin extencion
    $extencion_archivo = substr($nombre_archivo, strripos($nombre_archivo, '.')); // nombre extencion
    $filesize = $_FILES["EscaneoSolicitud"]["size"]; //Nombre original del pdf
    $tipos_archivos_permitidos = array('.doc','.xlsx','.docx','.rtf','.pdf'); //Validacion de tipos de extenciones permitidas
    $nuevo_nombre = $nombrepdf . $extencion_archivo; //Nuevo nombre del archivo

    //Validacion de tipo de tamaño archivo
    // if ($filesize<=1000) {

    // 	$tipo_tamaño = 'bytes';
    // 	$tamaño_archivo = $filesize;

    // }else if ($filesize<=999999) {

    // 	$tipo_tamaño = 'kb';
    // 	$kb_archivo = ($filesize * 0.001);
    // 	$tamaño_archivo = round($kb_archivo, 1, PHP_ROUND_HALF_UP);

    // }else if ($filesize>=1000000){

    // 	$tipo_tamaño = 'mb';
    // 	$kb_archivo = ($filesize * 0.001);
    // 	$mb_archivo = ($kb_archivo * 0.001);
    // 	$tamaño_archivo = round($mb_archivo, 1, PHP_ROUND_HALF_UP);
   	// }

   	$filesize = floatval($filesize);
        $arBytes = array(
            0 => array(
                "UNIT" => "TB",
                "VALUE" => pow(1024, 4)
            ),
            1 => array(
                "UNIT" => "GB",
                "VALUE" => pow(1024, 3)
            ),
            2 => array(
                "UNIT" => "MB",
                "VALUE" => pow(1024, 2)
            ),
            3 => array(
                "UNIT" => "KB",
                "VALUE" => 1024
            ),
            4 => array(
                "UNIT" => "B",
                "VALUE" => 1
            ),
        );
    foreach($arBytes as $arItem)
    {
        if($filesize >= $arItem["VALUE"])
        {
            $result = $filesize / $arItem["VALUE"];
            $result = str_replace(",", "." , strval(round($result, 2)));
            $unidad = $arItem["UNIT"];
            break;
        }
    }
    //Permisos para subir archivo
    $dirE = "Documentos/".$desccategoria;
  	if (!is_dir($dirE)) {
	    mkdir($dirE, 0777, true);
	    //chmod($dirE, 0777);       
  	}

  	//Validaciones de la carga de documentos
  	if (in_array($extencion_archivo,$tipos_archivos_permitidos)) {
  		//Valida que no se puede subir un mismo tipo de documento con el mismo nombre
		if (file_exists("Documentos/".$desccategoria."/".$nuevo_nombre)) {
			echo json_encode(array('result' => 3));
    		return;
		}
	//Valida que no deje subir si no a seleccionado nada	
    }elseif (empty($Nombre_base)) {	
		echo json_encode(array('result' => 4));
    	return;
    //Valida que solo permita subir los archivos permitidos en el arreglo $tipos_archivos_permitidos
	}else {
    	echo json_encode(array('result' => 5));
    	return;
    }


  	if(isset($_FILES['EscaneoSolicitud'])) {
       move_uploaded_file($_FILES['EscaneoSolicitud']['tmp_name'], "Documentos/".$desccategoria."/".$nuevo_nombre);
    }

    //Creacion de la llave del documento
	$p=array();
	$datai = $this->select("SELECT top 1 * FROM [dbo].[TB_Pagina_Bitacora_Documentos] ORDER BY [ID] DESC",$p);
	if(count($datai)==0) {
		$iddocumento =  "IDM-1";
	}else{
		$rest = substr($datai[0]["ID_Documento"],4);
	    $iddocumento = "IDM-".(intval($rest)+1);
	}

    //Insert a la tabla de bitacora de los documentos
    $q="INSERT INTO [dbo].[TB_Pagina_Bitacora_Documentos] (ID_Documento, Nombre_Documento, Categoria_Documento, Size_Documento, Extencion_Documento, Sistema_Usuario, Sistema_Fecha, Tipo_Unidad) VALUES(:IDD,:NOM,:CAT,:TA,:EXT,:SU,:SF,:TPU)";
	$p=array(":IDD"=>$iddocumento,":NOM"=>$nuevo_nombre,":CAT"=>$categoria,":TA"=>$result,":EXT"=>$extencion_archivo,":SU"=>$_SESSION["user_name"],":SF"=>date("Y-m-d H:i:s"),":TPU"=>$unidad);

	// echo json_encode($q);
	// 			echo json_encode($p);
	// 			return;

	if (!$this->insert($q,$p)) {
		echo json_encode(array('result'=> 'Error Insert Bitacora Documentos'));
		$dbpw->rollback();
		return;
	}

    echo json_encode(array('result' => 1,'TBARCHIVO'=>$desccategoria ));
    $dbpw->commit();
}	



function clearDummyData($data, $number){
	for($i=0;$i<$number;$i++){
		unset($data[$i]);
	}
	return $data;
}


function select($q,$p) {
	global $dbc;
	$stmt = $dbc->prepare($q);
	$stmt->execute( $p ) or die(print_r($stmt->errorInfo(), true));
	$datos = $stmt->fetchAll();
	return $datos;
}

function insert($q, $p) {
	global $dbc;
	$stmt = $dbpw->prepare($q);
	return $stmt->execute($p);
}


}

$api = new Api_PW();



?>
