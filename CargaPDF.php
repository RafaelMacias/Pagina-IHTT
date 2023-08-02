<?php
session_start();
header('Access-Control-Allow-Origin: *');
date_default_timezone_set("America/Tegucigalpa");
require_once("config/conexion_pagina_web.php");
require_once("config/conexion_rrhh.php");

class CargaPDF{
	private $info;
	private $script = "";
	private $modulo = 59;
	private $script2 ="$('.select2').select2({ placeholder : '' }); $('.select2-remote').select2({ data: [{id:'A', text:'A'}]}); $('button[data-select2-open]').click(function(){ $('#' + $(this).data('select2-open')).select2('open'); });";

function CargaPDF(){
	if( !isset($_SESSION['usuario']) || !isset($_SESSION["roles"][$this->modulo]) ) {
		header("Location: /admin.php");
	}
	$this->printHTML();
}
function SeleccionarRRHH($q, $parametros){
    global $dbr;
	$stmt = $dbr->prepare($q);
	$stmt->execute($parametros);
	return $stmt->fetchAll();
}
function select_pagina($q,$p) {
    global $dbpw;
    $stmt = $dbpw->prepare($q);
    $stmt->execute( $p );
    $datos = $stmt->fetchAll();
    return $datos;
}

function FOTO(){
	$q = "SELECT * FROM TB_Empleados where ID_Empleado = :ID";
	$T_Empleado ="";
	$datos1 = $this->SeleccionarRRHH($q,array(":ID"=>$_SESSION["ID_Usuario"]));
		$T_Empleado = $datos1[0]["FotoPerfil"];
	return $T_Empleado;
}
function Nombre(){
	$q = "SELECT * FROM TB_Empleados where ID_Empleado = :ID";
	$Empl_Nombre ="";
	$datos1 = $this->SeleccionarRRHH($q,array(":ID"=>$_SESSION["ID_Usuario"]));
		$Empl_Nombre = $datos1[0]["Nombres"];
	return $Empl_Nombre;
}


	function printHTML() {
		$header = file_get_contents("template/header.html");
		require_once("config.php");
		$footer = file_get_contents("template/footer.html");
		
		$file = $header.file_get_contents("template/CargaPDF.html").$footer;
		$file = str_replace("@@CURRENTSITE@@", "Consulta Generales", $file);
		$file = str_replace("@@PAGESCRIPT@@", '<script type="text/javascript" src="@@DIR@@js/CargaPDF.js"></script> ', $file);
		$file = str_replace("@@SELCT@@", $this->script2, $file);
		$file = str_replace("@@CATEGORIAPDF@@", $this->getCategoria(), $file);
		$file = str_replace("@@DIR@@", "assets/", $file);
		$file = str_replace("@@SCRIPT@@", $this->script, $file);

		//Validacion de la foto del perfil
		// $foto_p = $this->FOTO();
		// if ($foto_p == '') {
		// 	$foto_perfil = 'assets/img/default-avatar.png';
		// }else {
		// 	$foto_perfil = 'https://satt.transporte.gob.hn:83/imgEmpleado/Empleado-'.$_SESSION["ID_Usuario"].'/'.$foto_p;
		// }

		$file = str_replace("{{title_viñeta}}", "Inicio", $file);
		$file = str_replace("{{title}}", "Inicio", $file);
		// $file = str_replace("@@USERNAME@@", $_SESSION["usuario"], $file);
		// $file = str_replace("@@FOTO@@", $foto_perfil, $file);
		// $file = str_replace("@@CARGO@@", $_SESSION["Cargo"], $file);

		echo $file;
	}

	/*------Funcion para cargar el dropdown de los bancos----*/
	function getCategoria() {
		$q="SELECT * FROM [IHTT_PAGINA_WEB].[dbo].[TB_Pagina_Categorias_PDF]";
		$p=array();
		$datos = $this->select_pagina($q,$p);
		$options = "";
		for($i=0;$i<count($datos);$i++){
			$options .= '<option value="'.$datos[$i]["ID_Categoria"].'">'.$datos[$i]["DESC_Categoria"].'</option>';
		}
		return $options;
	}

}

$c = new CargaPDF();

?>