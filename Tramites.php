<?php
session_start();
header('Access-Control-Allow-Origin: *');
date_default_timezone_set("America/Tegucigalpa");
require_once("config/conexion_pagina_web.php");
// require_once("../config/conexion_rrhh.php");

class Tramites{
	private $info;
	private $script = "";
	private $modulo = 59;
	private $script2 ="$('.select2').select2({ placeholder : '' }); $('.select2-remote').select2({ data: [{id:'A', text:'A'}]}); $('button[data-select2-open]').click(function(){ $('#' + $(this).data('select2-open')).select2('open'); });";

function Tramites(){

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
		
		$file = $header.file_get_contents("template/Tramites.html").$footer;
		$file = str_replace("@@CURRENTSITE@@", "Trámites", $file);
		$file = str_replace("@@PAGESCRIPT@@", '', $file);
		$file = str_replace("@@SELCT@@", $this->script2, $file);
		$file = str_replace("@@DIR@@", "assets/", $file);
		$file = str_replace("@@SCRIPT@@", $this->script, $file);

		$file = str_replace("@@TRAMITES@@", $this->getTramites(), $file);
		$file = str_replace("{{TOPTRAMITES}}", $this->TopTramitesConsultados(), $file);
		$file = str_replace("{{TRAMITESLINEA}}", $this->TramitesEnLinea(), $file);
		$file = str_replace("{{TRAMITESEXTERNOS}}", $this->TramitesExternos(), $file);

		$file = str_replace("{{title_viñeta}}", "Tramites", $file);

		echo $file;
	}
	//Obtine los tramites
	function getTramites() {

	   $q="SELECT * FROM TB_Pagina_Tramites ORDER BY ID DESC";
	   $p=array();
	   $datos = $this->select_pw($q,$p);
	   $options = "";
	   for($i=0;$i<count($datos);$i++){
	      $options .= '"'.$datos[$i]["DESC_Tramite"].'"'.',';
	   }
	   return $options;
	}
	//Funcion par cargar los tramites mas consultados
	function TopTramitesConsultados(){

		$q ="SELECT * FROM v_Top_Consultas_Tramites";
		$data = $this->select_pw($q,array());

		$tramites='';
		
		for($i=0;$i<count($data);$i++){

			//datos que arman la tarjeta
			$tramites.= '<ul class="text-secondary" style="padding: 2px;text-align: left;margin-bottom: 0rem;">
                                <li class="">
                                    <a href="'.$data[$i]['Link_Tramite'].'" target="_blank" style="color: #424aa0">'.$data[$i]['DESC_Tramite'].'
                                    </a>
                                </li>
                              </ul>';
		}
		if (count($data)==0) {
		 	$tramites = "<li style='text-align: center;' class='collection-item'><strong>Sin tramites</strong></li>";
		}
		return $tramites;
	}

	//Funcion par cargar los tramites en linea
	function TramitesEnLinea(){

		$q ="SELECT * FROM TB_Pagina_Tramites WHERE ID_Tramite = 'IDT-5'";
		$data = $this->select_pw($q,array());

		$tramites='';
		
		for($i=0;$i<count($data);$i++){

			//datos que arman la tarjeta
			$tramites.= '<ul class="text-secondary" style="padding: 2px;text-align: left;margin-bottom: 0rem;">
                                <li class="">
                                    <a href="'.$data[$i]['Link_Tramite'].'" target="_blank" style="color: #424aa0">'.$data[$i]['DESC_Tramite'].'
                                    </a>
                                </li>
                              </ul>';
		}
		if (count($data)==0) {
		 	$tramites = "<li style='text-align: center;' class='collection-item'><strong>Sin tramites</strong></li>";
		}
		return $tramites;
	}

	//Funcion par cargar los tramites en externos
	function TramitesExternos(){

		$q ="SELECT TOP 4 * FROM TB_Pagina_Tramites WHERE Tipo_Tramite = 'IDI-2' ORDER BY DESC_Tramite";
		$data = $this->select_pw($q,array());

		$tramites='';
		
		for($i=0;$i<count($data);$i++){

			//datos que arman la tarjeta
			$tramites.= '<ul class="text-secondary" style="padding: 2px;text-align: left;margin-bottom: 0rem;">
                                <li class="">
                                    <a href="'.$data[$i]['Link_Tramite'].'" target="_blank" style="color: #424aa0">'.$data[$i]['DESC_Tramite'].'
                                    </a>
                                </li>
                              </ul>';
		}
		if (count($data)==0) {
		 	$tramites = "<li style='text-align: center;' class='collection-item'><strong>Sin tramites</strong></li>";
		}
		return $tramites;
	}


}

$c = new Tramites();

?>