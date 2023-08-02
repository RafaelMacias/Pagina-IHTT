<?php
session_start();
header('Access-Control-Allow-Origin: *');
date_default_timezone_set("America/Tegucigalpa");
require_once("config/conexion_pagina_web.php");
require_once("config/conexion_rrhh.php");

class Consultas_Generales{
	private $info;
	private $script = "";
	private $modulo = 59;
	private $script2 ="$('.select2').select2({ placeholder : '' }); $('.select2-remote').select2({ data: [{id:'A', text:'A'}]}); $('button[data-select2-open]').click(function(){ $('#' + $(this).data('select2-open')).select2('open'); });";

function Consultas_Generales(){

	$this->printHTML();
}

function select_pw($q,$p) {
    global $dbpw;
    $stmt = $dbpw->prepare($q);
	$stmt->execute($p);
	return $stmt->fetchAll();
}

	function printHTML() {
		$header = file_get_contents("template/header.html");
		require_once("config.php");
		$footer = file_get_contents("template/footer.html");
		
		$file = $header.file_get_contents("template/Consultas_Generales.html").$footer;
		$file = str_replace("@@CURRENTSITE@@", "Manuales", $file);
		$file = str_replace("@@PAGESCRIPT@@", '<script type="text/javascript" src="@@DIR@@js/Centro_Documentos.js"></script>', $file);
		$file = str_replace("@@SELCT@@", $this->script2, $file);
		$file = str_replace("@@DIR@@", "assets/", $file);
		$file = str_replace("@@SCRIPT@@", $this->script, $file);

		$file = str_replace("@@BUSQUEDA@@", $this->getTipoBusqueda(), $file);

		$file = str_replace("{{title_viñeta}}", "Inicio", $file);
		$file = str_replace("{{title}}", "Inicio", $file);

		echo $file;
	}

	/*------Funcion para cargar el dropdown de los tipo de busquedas----*/
	function getTipoBusqueda() {
		$q="SELECT * FROM [IHTT_PAGINA_WEB].[dbo].[TB_Pagina_Tipo_Busquedas] WHERE ID_Tipo_Busqueda <> 'IDB-5' ORDER BY ID";
		$p=array();
		$datos = $this->select_pw($q,$p);
		$options = "";
		for($i=0;$i<count($datos);$i++){
			$options .= '<option value="'.$datos[$i]["ID_Tipo_Busqueda"].'">'.$datos[$i]["DESC_Tipo_Busqueda"].'</option>';
		}
		return $options;
	}

}

$c = new Consultas_Generales();

?>