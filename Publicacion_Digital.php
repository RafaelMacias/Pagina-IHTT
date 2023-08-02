<?php
session_start();
header('Access-Control-Allow-Origin: *');
date_default_timezone_set("America/Tegucigalpa");
require_once("config/conexion_pagina_web.php");

class Publicacion_Dig{
	private $info;
	private $script = "";
	private $modulo = 59;
	private $script2 ="$('.select2').select2({ placeholder : '' }); $('.select2-remote').select2({ data: [{id:'A', text:'A'}]}); $('button[data-select2-open]').click(function(){ $('#' + $(this).data('select2-open')).select2('open'); });";

	function Publicacion_Dig(){
		
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
		
		$file = $header.file_get_contents("template/Publicacion_Digital.html").$footer;
		$file = str_replace("@@CURRENTSITE@@", "Publicación", $file);
		$file = str_replace("@@PAGESCRIPT@@", '<script type="text/javascript" src="@@DIR@@js/Publicacion_Digital.js"></script>', $file);
		$file = str_replace("@@SELCT@@", $this->script2, $file);
		$file = str_replace("@@DIR@@", "assets/", $file);
		$file = str_replace("@@SCRIPT@@", $this->script, $file);

		$file = str_replace("@@ELIMINAR@@", $Dpublicacion, $file);
		$file = str_replace("$Epublicacion", $Epublicacion, $file);
		$file = str_replace("@@MODTITULO@@", $modtitulo, $file);
		$file = str_replace("@@MODFECHA@@", $modfecha, $file);

		$publicacion=$this->getPublicacion();
		$file = str_replace("@@IDPUBLICACION@@", $publicacion['ID_Publicacion'], $file);
		$file = str_replace("@@TITULO@@", $publicacion['Titulo_Publicacion'], $file);
		$file = str_replace("@@DESCPLU@@", $publicacion['DESC_Publicacion'], $file);
		$file = str_replace("@@NOMBREIMAGEN@@", $publicacion['Nombre_Imagen'], $file);
		$file = str_replace("@@IDIMAGEN@@", $publicacion['ID_Imagen'], $file);
		$file = str_replace("@@DESCTIPO@@", $publicacion['DESC_Tipo_Publicacion'], $file);
		//Valida q la si la foto de perfil esta vacia le ponga una por default
		if ($publicacion['FotoPerfil']=='') {
			$image = 'assets/img/default-avatar.png';
			$imagen_escritor = $image;
		}else {
			$image = 'imgEmpleado/Empleado-'.$publicacion['ID_Empleado'].'/'.$publicacion['FotoPerfil'];
			$imagen_escritor = 'https://satt.transporte.gob.hn:83/'.$image.'';
		}	

		$file = str_replace("{{IMGESCRITOR}}", $imagen_escritor, $file);
	  	
	  	//Variable para convertir el nombre a minusclas
		$nombres = strtolower($publicacion['Nombres']);//-->pasamos todo el nombre a minusculas
		$nombres_corto = ucwords($nombres);//-->pasamos la primera letra a mayuscula
		//Variable para convertir el apellido a minusclas
		$apellidos = strtolower($publicacion['Apellidos']);
		$apellidos_corto = ucwords($apellidos);

		$nombre_completo = $nombres_corto.' '.$apellidos_corto;
		$file = str_replace("{{NOMBREESCRITOR}}", $nombre_completo, $file);

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
    	$fechaComoEntero = strtotime($publicacion['Fecha_Publicacion_Normal']);
		$day = date("d", $fechaComoEntero);
		$mes = date("m", $fechaComoEntero);
		$year = date("Y", $fechaComoEntero);
		settype($day, "integer");
		settype($mes, "integer");
		$fecha_publicacion = $day.' de '.$mes_letras[$mes].' , '.$year;

		$file = str_replace("{{FECHAPUBLICACION}}", $fecha_publicacion, $file);

		//Validacion de la pocion de la imagen
		// if ($publicacion['Posicion_Imagen'] == 'I') {
		// 	$class_posicion = 'class= "l left"';
		// }else if ($publicacion['Posicion_Imagen'] == 'C')  {
		// 	$class_posicion = 'class= "col-center"';
		// }else {
		// 	$class_posicion = 'class= "right"';
		// }
		// $file = str_replace("@@POSICION@@", $class_posicion, $file);

		//Validacion de imagen de la noticia
		if ($admin==0) {

			if ($publicacion['Nombre_Imagen']==null) {
				$figure = '';
			}else {
				$figure = '<figure class= "col-center"><img src="Documentos/Imagenes/'.$publicacion['DESC_Tipo_Publicacion'].'/'.$publicacion['Nombre_Imagen'].'" alt="No se puedo encontrar la imagen"></figure><br>';
			}
			
		}else {

			if ($publicacion['Nombre_Imagen']==null) {
				$figure = '<div class="col-12 col-sm-4 col-lg-12 text-center" onclick="modificarImagen();"><div class="icon icon-shape icon-sm icon-shape-tertiary" style="cursor:pointer;"><span class="far fa-image"></span></div></div>';
			}else {
				$figure = '<figure class= "col-center"><img src="Documentos/Imagenes/'.$publicacion['DESC_Tipo_Publicacion'].'/'.$publicacion['Nombre_Imagen'].'" alt="daisy photographed from below"><figcaption><a><i class="fas fa-edit mr-2 edit-icon" onclick="modificarImagenCreada();"></i></a></figcaption></figure><br>';
			}

		}


		$file = str_replace("@@FIGURE@@", $figure, $file);

		$articulos=$this->getArticulosRelacionados();
		$file = str_replace("@@ARTICULOS@@", $articulos, $file);

		$ultimasnoticias=$this->getUltimasNoticias();
		$file = str_replace("@@ULTIMASNOTICIAS@@", $ultimasnoticias, $file);


		if ($publicacion['ID_Categoria_Publicacion']!='ICP-8') {
			$piepagina = '<div class="row">
			                  <div class="col-12 col-md-4 mb-4 mb-lg-0">
			                     <div class="mb-4">
			                        <h3 class="h5 font-weight-medium">Art&iacute;culos relacionados</h3>
			                     </div>
			                     '.$articulos.'
			                  </div>
			                  <div class="col-12 col-md-4 mb-4 mb-lg-0">
			                     <div class="mb-4">
			                        <h3 class="h5 font-weight-medium">&Uacute;ltimas Noticias</h3>
			                     </div>
			                     <ul class="list-unstyled">
			                        '.$ultimasnoticias.'
			                     </ul>
			                  </div>
			                  <div class="col-12 col-md-4 mb-4 mb-lg-0">
			                     <div class="mb-4">
			                        <h3 class="h5 font-weight-medium">¡Tu comentario nos importa!</h3>
			                     </div>
			                     <p>Estamos interesados en saber tu opinion. Dejanos saber a travez del correo electrónico.</p>
			                    '.$Epublicacion.'
			                  </div>
			                </div>';
		}else {
			$piepagina = '';
		}

		$file = str_replace("@@PIEPAGINA@@", $piepagina, $file);

		$file = str_replace("{{title_viñeta}}", "Inicio", $file);
		$file = str_replace("{{title}}", "Inicio", $file);

		echo $file;
	}

	//Obtine la publicacion segun el id
	function getPublicacion(){
	    $query="SELECT * FROM v_Pagina_Publicaciones WHERE ID_Publicacion_Encrypted = :ID";
	    $p = array(":ID"=>$_GET['ID']);
	    $data = $this->select_pw($query, $p);
	    $datos[1]=count($data);
	    $datos[0]=array();

	    if (count($data)!=0) {
	      $datos = array("ID_Publicacion" => $data[0]["ID_Publicacion"],"DESC_Publicacion" => $data[0]["DESC_Publicacion"],"Titulo_Publicacion" => $data[0]["Titulo_Publicacion"],"Nombre_Imagen" => $data[0]["Nombre_Imagen"],"Posicion_Imagen" => $data[0]["Posicion_Imagen"],"ID_Categoria_Publicacion" => $data[0]["ID_Categoria_Publicacion"],"Fecha_Publicacion" => $data[0]["Fecha_Publicacion"],"FotoPerfil" => $data[0]["FotoPerfil"],"ID_Empleado" => $data[0]["ID_Empleado"],"Nombres" => $data[0]["Nombres"],"Apellidos" => $data[0]["Apellidos"],"Fecha_Publicacion_Normal" => $data[0]["Fecha_Publicacion_Normal"],"ID_Imagen" => $data[0]["ID_Imagen"],"ID_Tipo_Publicacion" => $data[0]["ID_Tipo_Publicacion"],"DESC_Tipo_Publicacion" => $data[0]["DESC_Tipo_Publicacion"]);
	    }else {
	      $datos = array("ID_Publicacion" => 'Error al cargar publicacion',"DESC_Publicacion" => 'Error al cargar publicacion',"Titulo_Publicacion" => 'Error al cargar publicacion',"Nombre_Imagen" => 'Error al cargar la imagen',"Posicion_Imagen" => 'Error al cargar publicacion',"ID_Categoria_Publicacion" => 'Error al cargar publicacion',"Fecha_Publicacion" => 'Error al cargar publicacion',"FotoPerfil" => 'Error al cargar publicacion',"ID_Empleado" => 'Error al cargar publicacion',"Nombres" => 'Error al cargar publicacion',"Apellidos" => 'Error al cargar publicacion',"Fecha_Publicacion_Normal" => 'Error al cargar publicacion',"ID_Imagen" => 'Error al cargar publicacion',"ID_Tipo_Publicacion" => 'Error al cargar publicacion',"DESC_Tipo_Publicacion" => 'Error al cargar publicacion');
	    }
	    return $datos;
	}
	//Obtener los articulos relacionados segun la categoria de la publicacion
	function getArticulosRelacionados(){
	    $query="SELECT TOP 3 * FROM v_Pagina_Publicaciones WHERE ID_Categoria_Publicacion = :IDC AND Fecha_Publicacion_Normal <= Convert(Date, GetDate(), 101) AND ID_Publicacion <> :IDP";
	    $p = array(":IDC"=>$this->getPublicacion()['ID_Categoria_Publicacion'],":IDP"=>$this->getPublicacion()['ID_Publicacion']);
	    $data = $this->select_pw($query, $p);
	    $datos[1]=count($data);
	    $datos[0]=array();

	    if (count($data)!=0) {
	    	$result ='';

	    	for($i=0;$i<count($data);$i++){
			 	$result .= '<ul class="list-unstyled">
		                        <li class="pb-3"><i class="far fa-newspaper"></i>
		                        	<a class="link-muted" href="http://192.168.200.219/Publicacion.php?ID='.$data[$i]['ID_Publicacion_Encrypted'].'" target="_blank">'.$data[$i]['Titulo_Publicacion'].'
		                        	</a>
		                        </li>
		                    </ul>'
			;}

	    }else {
	    	$result = '<ul class="list-unstyled">
		                    <li class="pb-3">NO HAY NINGUNA PUBLICACIÓN RELACIONADA</li>
		                </ul>';
	    }

	    return $result;
	}

	//Obtener las ultimos noticias generados
	function getUltimasNoticias(){
	    $query="SELECT TOP 3 * FROM v_Pagina_Publicaciones WHERE Fecha_Publicacion_Normal <= Convert(Date, GetDate(), 101) ORDER BY ID DESC";
	    $p = array();
	    $data = $this->select_pw($query, $p);
	    $datos[1]=count($data);
	    $datos[0]=array();

	    if (count($data)!=0) {
	    	$result ='';

	    	for($i=0;$i<count($data);$i++){
			 	$result .= '<ul class="list-unstyled">
		                        <li class="pb-3"><i class="far fa-newspaper"></i>
		                        	<a class="link-muted" href="http://192.168.200.219/Publicacion.php?ID='.$data[$i]['ID_Publicacion_Encrypted'].'" target="_blank">'.$data[$i]['Titulo_Publicacion'].'
		                        	</a>
		                        </li>
		                    </ul>'
			;}

	    }else {
	    	$result = '<ul class="list-unstyled">
		                    <li class="pb-3">NO HAY NINGUNA PUBLICACIÓN RELACIONADA</li>
		                </ul>';
	    }

	    return $result;
	}


}

$c = new Publicacion_Dig();

?>