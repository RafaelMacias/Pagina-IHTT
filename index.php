<?php
session_start();
header('Access-Control-Allow-Origin: *');
date_default_timezone_set("America/Tegucigalpa");
require_once("config/conexion_pagina_web.php");

class index{
	private $script = "";
	private $modulo = 59;
	private $script2 ="$('.select2').select2({ placeholder : '' }); $('.select2-remote').select2({ data: [{id:'A', text:'A'}]}); $('button[data-select2-open]').click(function(){ $('#' + $(this).data('select2-open')).select2('open'); });";

function index(){
	
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
		$file = $header.file_get_contents("template/index.html").$footer;
		$file = str_replace("@@CURRENTSITE@@", "Consulta Generales", $file);
		$file = str_replace("@@PAGESCRIPT@@", '', $file);
		$file = str_replace("@@SELCT@@", $this->script2, $file);
		$file = str_replace("@@DIR@@", "assets/", $file);
		$file = str_replace("@@SCRIPT@@", $this->script, $file);

		$indicador=$this->getTotalSlider();
		$file = str_replace("@@INDICADORES@@", $indicador, $file);

		$imagenes=$this->getImagenesSlider();
		$file = str_replace("@@IMAGENES@@", $imagenes, $file);

		$file = str_replace("{{title_viñeta}}", "Inicio", $file);
		$file = str_replace("{{title}}", "Inicio", $file);


		echo $file;
	}

//Obtener total indicadores
function getTotalSlider(){
    $query="SELECT * FROM TB_Pagina_Imagenes_Slider ORDER BY ID ASC";
    $p = array();
    $data = $this->select_pw($query, $p);
    $datos[1]=count($data);
    $datos[0]=array();

    if (count($data)!=0) {
    	$result ='';
    	$rownumber = '';
    	$li='';
    	for($i=0;$i<count($data);$i++){
			// $rownumber = $rownumber + 1;

			if ($i==0) {
				$li = '<li data-target="#Carousel3" data-slide-to="0" class="active"></li>';
			}else {
				$rownumber = $rownumber + 1;
				$li = '<li data-target="#Carousel3" data-slide-to="'.$rownumber.'"></li>';
			}

		 	$result .= ''.$li.''
		;}

    }else {
    	$result = '<ol class="carousel-indicators">
                        <li data-target="#Carousel3" data-slide-to="1" class="active"></li>
                    </ol>';
}

    return $result;
}

//Obtener las imagenes del slider
function getImagenesSlider(){
    $query="SELECT * FROM TB_Pagina_Imagenes_Slider ORDER BY ID ASC";
    $p = array();
    $data = $this->select_pw($query, $p);
    $datos[1]=count($data);
    $datos[0]=array();

    if (count($data)!=0) {
    	$result ='';
    	$rownumber = '';
    	$class = '';
    	for($i=0;$i<count($data);$i++){
			$rownumber = $rownumber + 1;

			$dirimagen = 'Documentos/Imagenes/Slider/'.$data[$i]['Nombre_Imagen'].'';

			if ($data[$i]['Nombre_Imagen']=='Requisitos.jpg') {
				$contenido = '<a href="https://www.transporte.gob.hn/Requisitos"><img class="d-block w-100" src="'.$dirimagen.'" alt="Fifth slide"></a>';
				
			}elseif ($data[$i]['Nombre_Imagen']=='Entrega de certificado dos.jpg') {

				$contenido = '<a href="https://www.transporte.gob.hn/Documentos/Imagenes/Slider/LIistado_Certificados.pdf" target="_blank"><img class="d-block w-100" src="'.$dirimagen.'" alt="Fifth slide"></a>';

			} else {
				$contenido = '<img class="d-block w-100" src="'.$dirimagen.'" alt="Fifth slide">';
			}

			if ($i==0) {
				$class = 'active';
			}else {
				$class = '';
			}

		 	$result .= '<div class="carousel-item '.$class.'">
                            '.$contenido.'
                        </div>'
		;}

    }else {
    	$result = '<div class="carousel-item active">
                        <img class="d-block w-100" src="assets/img/carousel/image-1.jpg" alt="Fifth slide">
                    </div>';
    }

    return $result;
}








}

$c = new index();

?>