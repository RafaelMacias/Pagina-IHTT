<?php
session_start();
header('Access-Control-Allow-Origin: *');
date_default_timezone_set("America/Tegucigalpa");
require_once("config/conexion_pagina_web.php");

class Documentos{
	private $info;
	private $script = "";
	private $modulo = 59;
	private $script2 ="$('.select2').select2({ placeholder : '' }); $('.select2-remote').select2({ data: [{id:'A', text:'A'}]}); $('button[data-select2-open]').click(function(){ $('#' + $(this).data('select2-open')).select2('open'); });";

function Documentos(){
	
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
		
		$file = $header.file_get_contents("template/Requisitos.html").$footer;
		$file = str_replace("@@CURRENTSITE@@", "Manuales", $file);
		$file = str_replace("@@PAGESCRIPT@@", '<script type="text/javascript" src="@@DIR@@js/Requisitos.js"></script>', $file);
		$file = str_replace("@@SELCT@@", $this->script2, $file);
		$file = str_replace("@@DIR@@", "assets/", $file);
		$file = str_replace("@@SCRIPT@@", $this->script, $file);

		$file = str_replace("@@ADMIN@@", $admin, $file);

		$file = str_replace("@@DOCUMENTOS@@", $this->getDocumentos(), $file);

		$file = str_replace("{{title_viñeta}}", "Inicio", $file);
		$file = str_replace("{{title}}", "Inicio", $file);

		echo $file;
	}

	//Obtine los docuementos
	function getDocumentos() {

	   $q="SELECT * FROM TB_Pagina_Bitacora_Documentos ORDER BY ID DESC";
	   $p=array();
	   $datos = $this->select_pw($q,$p);
	   $options = "";
	   for($i=0;$i<count($datos);$i++){
	      $options .= '"'.$datos[$i]["Nombre_Documento"].'"'.',';
	   }
	   return $options;
	}

}

$c = new Documentos();

?>