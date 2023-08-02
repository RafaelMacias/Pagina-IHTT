<?php
session_start();
header('Access-Control-Allow-Origin: *');
date_default_timezone_set("America/Tegucigalpa");

class Contactanos{
	private $info;
	private $script = "";
	private $modulo = 59;
	private $script2 ="$('.select2').select2({ placeholder : '' }); $('.select2-remote').select2({ data: [{id:'A', text:'A'}]}); $('button[data-select2-open]').click(function(){ $('#' + $(this).data('select2-open')).select2('open'); });";

function Contactanos(){

	$this->printHTML();
}

	function printHTML() {
		$header = file_get_contents("template/header.html");
		require_once("config.php");
		$footer = file_get_contents("template/footer.html");
		
		$file = $header.file_get_contents("template/Contactanos.html").$footer;
		$file = str_replace("@@CURRENTSITE@@", "Consulta Generales", $file);
		$file = str_replace("@@PAGESCRIPT@@", '', $file);
		$file = str_replace("@@SELCT@@", $this->script2, $file);
		$file = str_replace("@@DIR@@", "assets/", $file);
		$file = str_replace("@@SCRIPT@@", $this->script, $file);


		$horariosInstitucion = [
		    'Sun' => ['00:00 AM' => '00:00 AM'],
		    'Mon' => ['08:00 AM' => '04:00 PM'],
		    'Tue' => ['08:00 AM' => '04:00 PM'],
		    'Wed' => ['08:00 AM' => '04:00 PM'],
		    'Thu' => ['08:00 AM' => '04:00 PM'],
		    'Fri' => ['08:00 AM' => '04:00 PM'],
		    'Sat' => ['00:00 AM' => '00:00 AM']
		];

		// current OR user supplied UNIX timestamp
		$timestamp = time();

		// estado por default
		$status = 'Cerrado';
		$icono = '<i class="fas fa-door-closed" style="font-size: 4.5rem;color:#A91E2C"></i>';

		// get current time object
		$currentTime = (new DateTime())->setTimestamp($timestamp);

		// loop through time ranges for current day
		foreach ($horariosInstitucion[date('D', $timestamp)] as $startTime => $endTime) {

		    // create time objects from start/end times
		    $startTime = DateTime::createFromFormat('h:i A', $startTime);
		    $endTime   = DateTime::createFromFormat('h:i A', $endTime);

		    // check if current time is within a range
		    if (($startTime < $currentTime) && ($currentTime < $endTime)) {
		        $status = 'Abierto';
		        $icono = '<i class="fas fa-door-open" style="font-size: 4.5rem;color:#2ec593"></i>';
		        break;
		    }
		}
		
		$file = str_replace("@@ESTADO@@", $status, $file);
		$file = str_replace("@@ICONO@@", $icono, $file);

		$file = str_replace("{{title_viñeta}}", "Inicio", $file);

		echo $file;
	}

}

$c = new Contactanos();

?>