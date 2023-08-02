<?php
session_start();
header('Access-Control-Allow-Origin: *');
date_default_timezone_set("America/Tegucigalpa");
require_once("config/conexion_pagina_web.php");

class Noticias{
	private $info;
	private $script = "";
	private $modulo = 59;
	private $script2 ="$('.select2').select2({ placeholder : '' }); $('.select2-remote').select2({ data: [{id:'A', text:'A'}]}); $('button[data-select2-open]').click(function(){ $('#' + $(this).data('select2-open')).select2('open'); });";

function Noticias(){
	
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
		
		$file = $header.file_get_contents("template/Noticias.html").$footer;
		$file = str_replace("@@CURRENTSITE@@", "Noticias", $file);
		$file = str_replace("@@PAGESCRIPT@@", '<script type="text/javascript" src="@@DIR@@js/Centro_Documentos.js"></script>', $file);
		$file = str_replace("@@SELCT@@", $this->script2, $file);
		$file = str_replace("@@DIR@@", "assets/", $file);
		$file = str_replace("@@SCRIPT@@", $this->script, $file);

		$noticias=$this->getUltimaNoticia();
		$file = str_replace("@@ARTICULOS@@", $noticias, $file);

		$noticias=$this->getUltimasTresNoticias();
		$file = str_replace("@@RECIENTES@@", $noticias, $file);

		$noticias=$this->getUltimasCuatroNoticias();
		$file = str_replace("@@MOBILES@@", $noticias, $file);

		$file = str_replace("{{title_viñeta}}", "Inicio", $file);
		$file = str_replace("{{title}}", "Inicio", $file);

		echo $file;
	}

	//Obtener las ultima noticias en principal
	function getUltimaNoticia(){
	    $query="SELECT TOP 1 * FROM v_Pagina_Publicaciones WHERE (Fecha_Publicacion_Normal <= GetDate()) AND ID_Tipo_Publicacion IS NULL ORDER BY ID DESC";
	    $p = array();
	    $data = $this->select_pw($query, $p);
	    $datos[1]=count($data);
	    $datos[0]=array();

	    if (count($data)!=0) {
	    	$result ='';

	    	for($i=0;$i<count($data);$i++){

    			//Validacion imagen
		    	if ($data[$i]['FotoPerfil']=='') {
					$image = 'assets/img/default-avatar.png';
					$imagen_escritor = $image;
				}else {
					$image = 'imgEmpleado/Empleado-'.$data[$i]['ID_Empleado'].'/'.$data[$i]['FotoPerfil'];
					$imagen_escritor = 'https://satt.transporte.gob.hn:83/'.$image.'';
				}	

				//Variable para convertir el nombre a minusclas
				$nombres = strtolower($data[$i]['Nombres']);//-->pasamos todo el nombre a minusculas
				$nombres_corto = ucwords($nombres);//-->pasamos la primera letra a mayuscula
				//Variable para convertir el apellido a minusclas
				$apellidos = strtolower($data[$i]['Apellidos']);
				$apellidos_corto = ucwords($apellidos);

				$nombre_completo = $nombres_corto.' '.$apellidos_corto;


				//Arreglo para obtener el mes segun la fecha de la publicacion
		    	$mes_letras = array(
							'1'=>'Enero',
							'2'=>'Febrero',
							'3'=>'Marzo',
							'4'=>'Abril',
							'5'=>'Mayo',
							'6'=>'Junio',
							'7'=>'Julio',
							'8'=>'Agosto',
							'9'=>'Septiembre',
							'10'=>'Octubre',
							'11'=>'Noviembre',
							'12'=>'Diciembre'
							);
				//sacar la fecha de publicacion
		    	$fechaComoEntero = strtotime($data[$i]['Fecha_Publicacion_Normal']);
				$day = date("d", $fechaComoEntero);
				$mes = date("m", $fechaComoEntero);
				$year = date("Y", $fechaComoEntero);
				settype($day, "integer");
				settype($mes, "integer");
				$fecha_publicacion = $day.' de '.$mes_letras[$mes].' , '.$year;

				if ($data[$i]['ID_Tipo_Publicacion']==null) {

					$link = '<a onclick="saveVistasPublicacion(\''.$data[$i]['ID_Publicacion'].'\')" class="link-muted" href="http://www.transporte.gob.hn/Publicacion.php?ID='.$data[$i]['ID_Publicacion_Encrypted'].'" target="_blank">'.$data[$i]['Titulo_Publicacion'].'</a>';

					if ($data[$i]['ID_Imagen']==null) {
						$img = '';
						$css = 'width: 35rem; height: 25rem; vertical-align: middle; padding: 0rem;';
						$cardcss = 'height: 20rem;';
					}else if ($data[$i]['ID_Imagen']=='') {
						$img = '';
						$css = 'width: 35rem; height: 25rem; vertical-align: middle; padding: 0rem;';
						$cardcss = 'height: 20rem;';
					}else {
						$img = '<img style="width: 25rem;margin-top: 10px;height: 28rem" src="Documentos/Imagenes/Noticias/'.$data[$i]['Nombre_Imagen'].'" class="card-img-top rounded-top rounded-bottom center" alt="image">';
						$css = 'border-left: solid 1px #e6e7e8;';
						$cardcss = '';
					}

	
				}else {

					$link = '<a onclick="saveVistasPublicacion(\''.$data[$i]['ID_Publicacion'].'\')" class="link-muted" href="http://www.transporte.gob.hn/Publicacion_Digital.php?ID='.$data[$i]['ID_Publicacion_Encrypted'].'" target="_blank">'.$data[$i]['Titulo_Publicacion'].'</a>';

					if ($data[$i]['ID_Imagen']==null) {
						$img = '';
						$css = 'width: 35rem; height: 25rem; vertical-align: middle; padding: 0rem;';
						$cardcss = 'height: 20rem;';
					}else if ($data[$i]['ID_Imagen']=='') {
						$img = '';
						$css = 'width: 35rem; height: 25rem; vertical-align: middle; padding: 0rem;';
						$cardcss = 'height: 20rem;';
					}else {
						$img = '<img style="width: 25rem;margin-top: 10px;height: 25rem" src="Documentos/Imagenes/'.$data[$i]['DESC_Tipo_Publicacion'].'/'.$data[$i]['Nombre_Imagen'].'" class="card-img-top rounded-top rounded-bottom center" alt="image">';
						$css = 'border-left: solid 1px #e6e7e8;';
						$cardcss = '';
					}

				}
		

			 	$result .= '<th rowspan="5" class="bg-greylight" style="'.$css.'">
			 					<div class="col-12 col-sm-12 col-lg-12">
                                    <div class="card border-light">
                                        '.$img.'
                                        <div class="card-body" style="'.$cardcss.'">
                                            <span class="h6 icon-tertiary small"><i class="far fa-calendar-alt mr-2 text-gris"></i>'.$fecha_publicacion.'</span>
                                            <h5 class="card-title mt-3">'.$link.'</h5>
                                            
                                            <!--<div class="content">'.$data[$i]['DESC_Publicacion'].'</div>-->
                                        </div>
                                    </div>
                                </div>
                            </th>'
			;}

	    }else {
	    	$result = '<ul class="list-unstyled">
		                    <li class="pb-3">NO HAY NINGUNA PUBLICACIÓN RELACIONADA</li>
		                </ul>';
	    }

	    return $result;
	}

	function getTotalVistasPublicaciones($id) {
		$query = "SELECT COUNT (*) AS Total FROM TB_Pagina_Bitacora_Visualizaciones WHERE Evento='PUBLICACION' AND ID_Documento= :IDP";
		$p = array(":IDP" => $id);
		$data_total = $this->select_pw($query, $p );
		if (count($data_total)>0) {
		return array("Total" =>$data_total[0]["Total"]);
		} else {
		return array("Total" =>'');
		}				
	}

	function getTotalLikesPublicaciones($id) {
		$query = "SELECT COUNT (*) AS Total FROM TB_Pagina_Bitacora_Opiniones WHERE Tipo_Documento='PUBLICACION' AND Evento='LIKE' AND ID_Documento= :IDP";
		$p = array(":IDP" => $id);
		$data_total = $this->select_pw($query, $p );
		if (count($data_total)>0) {
		return array("Total" =>$data_total[0]["Total"]);
		} else {
		return array("Total" =>'');
		}				
	}

	//Obtener las tres ultimas noticias en general
	function getUltimasTresNoticias(){
	    $query="SELECT TOP 3 * FROM v_Pagina_Publicaciones WHERE (Fecha_Publicacion_Normal<=GetDate()) AND ID_Tipo_Publicacion IS NULL AND ID_Publicacion<> (SELECT TOP 1 ID_Publicacion FROM v_Pagina_Publicaciones WHERE Fecha_Publicacion_Normal<=GetDate() ORDER BY Fecha_Publicacion_Normal DESC) ORDER BY Fecha_Publicacion_Normal DESC";
	    $p = array(":IDP" => $this->getUltimaNoticia()['ID_Publicacion']);
	    $data = $this->select_pw($query, $p);
	    $datos[1]=count($data);
	    $datos[0]=array();

	    if (count($data)!=0) {
	    	$result ='';

	    	for($i=0;$i<count($data);$i++){

	    		//Obtener total vistas
	    		$visitas = $this->getTotalVistasPublicaciones($data[$i]['ID_Publicacion']);
	    		//Obtener total likes
	    		$likes = $this->getTotalLikesPublicaciones($data[$i]['ID_Publicacion']);

    			//Validacion imagen
		    	if ($data[$i]['FotoPerfil']=='') {
					$image = 'assets/img/default-avatar.png';
					$imagen_escritor = $image;
				}else {
					$image = 'imgEmpleado/Empleado-'.$data[$i]['ID_Empleado'].'/'.$data[$i]['FotoPerfil'];
					$imagen_escritor = 'https://satt.transporte.gob.hn:83/'.$image.'';
				}	

				//Variable para convertir el nombre a minusclas
				$nombres = strtolower($data[$i]['Nombres']);//-->pasamos todo el nombre a minusculas
				$nombres_corto = ucwords($nombres);//-->pasamos la primera letra a mayuscula
				//Variable para convertir el apellido a minusclas
				$apellidos = strtolower($data[$i]['Apellidos']);
				$apellidos_corto = ucwords($apellidos);

				$nombre_completo = $nombres_corto.' '.$apellidos_corto;


				//Arreglo para obtener el mes segun la fecha de la publicacion
		    	$mes_letras = array(
							'1'=>'Enero',
							'2'=>'Febrero',
							'3'=>'Marzo',
							'4'=>'Abril',
							'5'=>'Mayo',
							'6'=>'Junio',
							'7'=>'Julio',
							'8'=>'Agosto',
							'9'=>'Septiembre',
							'10'=>'Octubre',
							'11'=>'Noviembre',
							'12'=>'Diciembre'
							);
				//sacar la fecha de publicacion
		    	$fechaComoEntero = strtotime($data[$i]['Fecha_Publicacion_Normal']);
				$day = date("d", $fechaComoEntero);
				$mes = date("m", $fechaComoEntero);
				$year = date("Y", $fechaComoEntero);
				settype($day, "integer");
				settype($mes, "integer");
				$fecha_publicacion = $day.' de '.$mes_letras[$mes].' , '.$year;

				if ($data[$i]['ID_Tipo_Publicacion']==null) {

					$link = '<a onclick="saveVistasPublicacion(\''.$data[$i]['ID_Publicacion'].'\')" class="link-muted" href="http://www.transporte.gob.hn/Publicacion.php?ID='.$data[$i]['ID_Publicacion_Encrypted'].'" target="_blank">'.$data[$i]['Titulo_Publicacion'].'</a>';

					if ($data[$i]['ID_Imagen']==null) {
						$divimg = '';
						$divtext = 'class="col-12 col-lg-12 col-xl-12"';
						$img = '';
						$css = 'width: 35rem; height: 25rem; vertical-align: middle; padding: 0rem;';
						$cardcss = 'height: 20rem;';
					}else if ($data[$i]['ID_Imagen']=='') {
						$divimg = '';
						$divtext = 'class="col-12 col-lg-12 col-xl-12"';
						$img = '';
						$css = 'width: 35rem; height: 25rem; vertical-align: middle; padding: 0rem;';
						$cardcss = 'height: 20rem;';
					}else {
						$divimg = 'class="col-12 col-lg-6 col-xl-4" style="display: flex; justify-content: center; align-items: center;"';
						$divtext = 'class="col-12 col-lg-6 col-xl-8"';
						$img = '<img style="width: 7rem; height: 8rem;" src="Documentos/Imagenes/Noticias/'.$data[$i]['Nombre_Imagen'].'" alt="meeting office" class="card-img p-2 rounded-xl">';
						$css = 'border-left: solid 1px #e6e7e8;';
						$cardcss = '';
					}

				} else {

					$link = '<a onclick="saveVistasPublicacion(\''.$data[$i]['ID_Publicacion'].'\')" class="link-muted" href="http://www.transporte.gob.hn/Publicacion_Digital.php?ID='.$data[$i]['ID_Publicacion_Encrypted'].'" target="_blank">'.$data[$i]['Titulo_Publicacion'].'</a>';

					if ($data[$i]['ID_Imagen']==null) {
						$divimg = '';
						$divtext = 'class="col-12 col-lg-12 col-xl-12"';
						$img = '';
						$css = 'width: 35rem; height: 25rem; vertical-align: middle; padding: 0rem;';
						$cardcss = 'height: 20rem;';
					}else if ($data[$i]['ID_Imagen']=='') {
						$divimg = '';
						$divtext = 'class="col-12 col-lg-12 col-xl-12"';
						$img = '';
						$css = 'width: 35rem; height: 25rem; vertical-align: middle; padding: 0rem;';
						$cardcss = 'height: 20rem;';
					}else {
						$divimg = 'class="col-12 col-lg-6 col-xl-4"';
						$divtext = 'class="col-12 col-lg-6 col-xl-8"';
						$img = '<img style="width: 12rem" src="Documentos/Imagenes/'.$data[$i]['DESC_Tipo_Publicacion'].'/'.$data[$i]['Nombre_Imagen'].'" alt="meeting office" class="card-img p-2 rounded-xl">';
						$css = 'border-left: solid 1px #e6e7e8;';
						$cardcss = '';
					}

				}
		
			 	$result .= '<tr style="border-right: solid 2px #e6e7e8;">
                          <td style="vertical-align: middle;padding: 0rem;border-bottom: solid 2px #e6e7e8;">
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div class="card border-light">
                                    <div class="row no-gutters align-items-center">
                                       <div '.$divimg.'>'.$img.'</div>
                                       <div '.$divtext.'>
                                          <div class="card-body py-lg-0">
                                             <div class="d-flex no-gutters align-items-center mb-2">

                                                <div class="col text-left">
                                                   <ul class="list-group mb-0">
                                                      <li class="list-group-item small p-0"><span class="far fa-calendar-alt mr-2 text-gris"></span><span class="text-turqueza">'.$fecha_publicacion.'</span></li>
                                                   </ul>
                                                </div>
                                            
                                             </div>
                                        
                                                <h2 class="h5">'.$link.'</h2>
                                             
                                             <div class="col d-flex pl-0">
                                                <span class="text-muted font-small mr-3"><span class="fas fa-eye mr-2 text-turqueza"></span><span class="text-gris">'.$visitas['Total'].'</span></span> 
                                                <span class="text-muted font-small mr-3"><span class="far fa-thumbs-up mr-2 text-turqueza"></span><span class="text-gris">'.$likes['Total'].'</span></span> 
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                            </div>
                          </td>
                        </tr>'
			;}

	    }else {
	    	$result = '<ul class="list-unstyled">
		                    <li class="pb-3">NO HAY NINGUNA PUBLICACIÓN RELACIONADA</li>
		                </ul>';
	    }

	    return $result;
	}

	//Obtener las 4 ultimas noticias en general movil
	function getUltimasCuatroNoticias(){
	    $query="SELECT TOP 4 * FROM v_Pagina_Publicaciones WHERE (Fecha_Publicacion_Normal<=GetDate()) AND ID_Tipo_Publicacion IS NULL ORDER BY Fecha_Publicacion_Normal DESC";
	    $p = array();
	    $data = $this->select_pw($query, $p);
	    $datos[1]=count($data);
	    $datos[0]=array();

	    if (count($data)!=0) {
	    	$result ='';

	    	for($i=0;$i<count($data);$i++){


	    		//Obtener total vistas
	    		$likes = $this->getTotalVistasPublicaciones($data[$i]['ID_Publicacion']);
	    		//Obtener total likes
	    		$likes = $this->getTotalLikesPublicaciones($data[$i]['ID_Publicacion']);

    			//Validacion imagen
		    	if ($data[$i]['FotoPerfil']=='') {
					$image = 'assets/img/default-avatar.png';
					$imagen_escritor = $image;
				}else {
					$image = 'imgEmpleado/Empleado-'.$data[$i]['ID_Empleado'].'/'.$data[$i]['FotoPerfil'];
					$imagen_escritor = 'https://satt.transporte.gob.hn:83/'.$image.'';
				}	

				//Variable para convertir el nombre a minusclas
				$nombres = strtolower($data[$i]['Nombres']);//-->pasamos todo el nombre a minusculas
				$nombres_corto = ucwords($nombres);//-->pasamos la primera letra a mayuscula
				//Variable para convertir el apellido a minusclas
				$apellidos = strtolower($data[$i]['Apellidos']);
				$apellidos_corto = ucwords($apellidos);

				$nombre_completo = $nombres_corto.' '.$apellidos_corto;


				//Arreglo para obtener el mes segun la fecha de la publicacion
		    	$mes_letras = array(
							'1'=>'Enero',
							'2'=>'Febrero',
							'3'=>'Marzo',
							'4'=>'Abril',
							'5'=>'Mayo',
							'6'=>'Junio',
							'7'=>'Julio',
							'8'=>'Agosto',
							'9'=>'Septiembre',
							'10'=>'Octubre',
							'11'=>'Noviembre',
							'12'=>'Diciembre'
							);
				//sacar la fecha de publicacion
		    	$fechaComoEntero = strtotime($data[$i]['Fecha_Publicacion_Normal']);
				$day = date("d", $fechaComoEntero);
				$mes = date("m", $fechaComoEntero);
				$year = date("Y", $fechaComoEntero);
				settype($day, "integer");
				settype($mes, "integer");
				$fecha_publicacion = $day.' de '.$mes_letras[$mes].' , '.$year;

				if ($data[$i]['ID_Tipo_Publicacion']==null) {

					$link = '<a onclick="saveVistasPublicacion(\''.$data[$i]['ID_Publicacion'].'\')" class="link-muted" href="http://www.transporte.gob.hn/Publicacion.php?ID='.$data[$i]['ID_Publicacion_Encrypted'].'" target="_blank">'.$data[$i]['Titulo_Publicacion'].'</a>';

					if ($data[$i]['ID_Imagen']==null) {
						$img = '';
						$css = 'width: 35rem; height: 25rem; vertical-align: middle; padding: 0rem;';
						$cardcss = 'height: 20rem;';
					}else if ($data[$i]['ID_Imagen']=='') {
						$img = '';
						$css = 'width: 35rem; height: 25rem; vertical-align: middle; padding: 0rem;';
						$cardcss = 'height: 20rem;';
					}else {
						$img = '<img style="width: 20rem" src="Documentos/Imagenes/Noticias/'.$data[$i]['Nombre_Imagen'].'" alt="meeting office" class="card-img p-2 rounded-xl">';
						$css = 'border-left: solid 1px #e6e7e8;';
						$cardcss = '';
					}

				} else {

					$link = '<a onclick="saveVistasPublicacion(\''.$data[$i]['ID_Publicacion'].'\')" class="link-muted" href="http://www.transporte.gob.hn/Publicacion_Digital.php?ID='.$data[$i]['ID_Publicacion_Encrypted'].'" target="_blank">'.$data[$i]['Titulo_Publicacion'].'</a>';

					if ($data[$i]['ID_Imagen']==null) {
						$img = '';
						$css = 'width: 35rem; height: 25rem; vertical-align: middle; padding: 0rem;';
						$cardcss = 'height: 20rem;';
					}else if ($data[$i]['ID_Imagen']=='') {
						$img = '';
						$css = 'width: 35rem; height: 25rem; vertical-align: middle; padding: 0rem;';
						$cardcss = 'height: 20rem;';
					}else {
						$img = '<img style="width: 20rem" src="Documentos/Imagenes/'.$data[$i]['DESC_Tipo_Publicacion'].'/'.$data[$i]['Nombre_Imagen'].'" alt="meeting office" class="card-img p-2 rounded-xl">';
						$css = 'border-left: solid 1px #e6e7e8;';
						$cardcss = '';
					}

				}
		

			 	$result .= '<div class="col-12 col-sm-12 col-md-12 col-lg-12 mb-3">
                                <div class="card border-light">
                                    <div class="row no-gutters align-items-center">
                                       <div class="col-12 col-lg-6 col-xl-4 text-center">'.$img.'</div>
                                       <div class="col-12 col-lg-6 col-xl-8">
                                          <div class="card-body py-lg-0">
                                             <div class="d-flex no-gutters align-items-center mb-2">

                                                <div class="col text-left">
                                                   <ul class="list-group mb-0">
                                                      <li class="list-group-item small p-0"><span class="far fa-calendar-alt mr-2"></span>'.$fecha_publicacion.'</li>
                                                   </ul>
                                                </div>
                                            
                                             </div>
                                             <a href="#">
                                                <h2 class="h5">'.$link.'</h2>
                                             </a>
                                             <div class="col d-flex pl-0">
                                                <span class="text-muted font-small mr-3"><span class="fas fa-eye mr-2"></span>3880</span> 
                                                <span class="text-muted font-small mr-3"><span class="far fa-thumbs-up mr-2"></span>'.$likes['Total'].'</span> 
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                            </div>'
			;}

	    }else {
	    	$result = '<ul class="list-unstyled">
		                    <li class="pb-3">NO HAY NINGUNA PUBLICACIÓN RELACIONADA</li>
		                </ul>';
	    }

	    return $result;
	}

}

$c = new Noticias();

?>