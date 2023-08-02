<?php
session_start();
header('Access-Control-Allow-Origin: *');
date_default_timezone_set("America/Tegucigalpa");

class Probidad_Etica{
	private $info;
	private $script = "";
	private $modulo = 59;
	private $script2 ="$('.select2').select2({ placeholder : '' }); $('.select2-remote').select2({ data: [{id:'A', text:'A'}]}); $('button[data-select2-open]').click(function(){ $('#' + $(this).data('select2-open')).select2('open'); });";

function Probidad_Etica(){

	$this->printHTML();
}

	function printHTML() {
		$header = file_get_contents("template/header.html");
		require_once("config.php");
		$footer = file_get_contents("template/footer.html");
		
		$file = $header.file_get_contents("template/Probidad_Etica.html").$footer;
		$file = str_replace("@@CURRENTSITE@@", "Probidad y Ética", $file);
		$file = str_replace("@@PAGESCRIPT@@", '', $file);
		$file = str_replace("@@SELCT@@", $this->script2, $file);
		$file = str_replace("@@DIR@@", "assets/", $file);
		$file = str_replace("@@SCRIPT@@", $this->script, $file);

		$file = str_replace("{{title_viñeta}}", "Inicio", $file);

		echo $file;
	}

}

$c = new Probidad_Etica();

?>