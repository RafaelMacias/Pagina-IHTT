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
		if ($_POST["action"] == "get-url-tramite" && isset($_POST["url"])) {
    		$this->getURLTramite();//Obtiene la url del tramite
		}else if($_POST["action"]=="insert-bitacora-tramites" ){
			$this->SaveBitacoraTramites();//Insert a la bitacora tramites
		}else if ($_POST["action"] == "save-escaneo") {
			$this->CargaSolicitud();///carga de PDF
		}else if ($_POST["action"]=='ArchivosSolicitud') {
            $this->TraerScaner();// Trae los archivos de las solicitudes
        }else if ($_POST["action"]=='imagenes-slider') {
            $this->TraerScanerSlider();// Trae las imagenes del slider
        }else if ($_POST["action"] == "EliminarDocumento") {
			$this->EliminarDocumento();///Elimina el PDF cargado temporalmente
		}else if($_POST["action"]=="get-categoria" && isset($_POST["cat"])) {
			$this->getDetalleCategoria();///Obtiene el detalle de la categoria
		}else if($_POST["action"] == "save-vistas") {
			$this->InsertVisualizacionPDF();/// Insert visualizaciones pdf
		}else if ($_POST["action"] == "get-url-documentos" && isset($_POST["nom"])) {
    		$this->getURLDocumentos();//Obtiene la url del documento
		}else if ($_POST["action"] == "save-img-publicacion") {
			$this->CargaImgPublicacion();///carga de PDF
		}else if ($_POST["action"] == "save-publicacion") {
			$this->SavePublicacion();///Insert de la publicacion
		}else if ($_POST["action"] == "EliminarImagen") {
			$this->EliminarImagen();///Elimina la imagen de la publicacion
		}else if ($_POST["action"] == "save-opinion") {
			$this->InsertPublicaciones();///insert la opinion de la publicacion
		}else if ($_POST["action"] == "delete-publicacion") {
			$this->EliminarPublicacion();///Elimina la publicacion
		}else if($_POST["action"] == "save-vistas-publicacion") {
			$this->InsertVisualizacionPublicacion();/// Insert visualizaciones pdf
		}else if ($_POST["action"] == "parametro-busqueda" && isset($_POST["tipo"])) {
    		$this->getParametro_Busqueda();//Obtiene el parametro de busqueda
		}else if($_POST["action"] == "save-vistas-consultasg") {
			$this->InsertVisitasConsultas();///Insert like de consulta
		}else if ($_POST["action"] == "get-total-vistas-consultasg" && isset($_POST["tipo"])) {
			$this->getTotal_Vistas_General();/// Recupera el total de vistas general
		}else if($_POST["action"] == "update-titulo") {
			$this->UpdateTituloPublicacion();///Update el titulo de la publicación
		}else if($_POST["action"] == "update-fecha") {
			$this->UpdateFechaPublicacion();///Update la fecha de la publicación
		}else if($_POST["action"] == "update-imagen") {
			$this->UpdateImagenPublicacion();///Update la imagen de la publicación
		}else if ($_POST["action"] == "get-desc-tipopublicacion" && isset($_POST["tipo"])) {
			$this->getDesc_Tipo_Publicacion();/// Recupera la descripcion de la publicacion
		}else if ($_POST["action"] == "save-img-publicacion-dig") {
			$this->CargaImgPublicacionDigital();///carga de PDF o img para publicaciones digitales
		}else if ($_POST["action"] == "EliminarIma-publicaciondig") {
			$this->EliminarImagenPublicacionDigital();///Elimina la imagen de la publicacion digital
		}else if ($_POST["action"] == "save-img-slider") {
			$this->CargaImgSlider();///carga de imagenes para el slider
		}else if ($_POST["action"] == "eliminarima-slider") {
			$this->EliminarImagenSlider();///Elimina la imagen del slider
		}//Aqui Continua la Consulta con un elseif
  	
	}

	if(isset($_GET["action"])){
		if($_GET["action"] == "get-documentos" && isset($_GET["cat"]) ) {
			$this->getDocumentos();///Obtiene los documentos segun carpeta
		}if($_GET["action"] == "get-tipo-documentos" && isset($_GET["tipo"]) ) {
			$this->getTipoDocumentos();///Obtiene los tipos documentos segun carpeta
		}else if ($_GET["action"]=="search-noticias"){
			$this->SearchNoticias();///Obtine los datos de busqueda de las noticias
		}if($_GET["action"]=="search-censo"){
			$this->SearchCenso();///Obtine el resultado de la busqueda de los censos
		}if($_GET["action"]=="search-conductores"){
			$this->SearchConductores();///Obtine el resultado de la busqueda de conductores
		}if($_GET["action"]=="search-certificados"){
			$this->SearchCertificados();///Obtine el resultado de la busqueda de certificados
		}if($_GET["action"]=="search-permisos-eventuales"){
			$this->SearchPermisosEventuales();///Obtine el resultado de la busqueda de permisos eventuales
		}if($_GET["action"]=="search-registro-conductores"){
			$this->SearchRegistroConductores();///Obtine el resultado de la busqueda de registro conductores
		}if($_GET["action"]=="search-resoluciones"){
			$this->SearchResoluciones();///Obtine el resultado de la busqueda de resoluciones
		}if($_GET["action"]=="search-documentos-ip"){
			$this->SearchValidacionIP();///Obtine el resultado de la busqueda de documentos ip
		}if($_GET["action"]=="search-citas"){
			$this->SearchCitas();///Busca la cita por identidad
		}else if ($_GET["action"]=="search-portadas"){
			$this->SearchPortadas();///Obtine los datos de busqueda de las portadas
		}else if ($_GET["action"]=="search-comunicados"){
			$this->SearchComunicados();///Obtine los datos de busqueda de los comunicados
		}else if ($_GET["action"]=="search-campa"){
			$this->SearchCampañas();///Obtine los datos de busqueda de los campañas
		}else if ($_GET["action"]=="search-boletines"){
			$this->SearchBoletines();///Obtine los datos de busqueda de los boletines
		}else if ($_GET["action"]=="search-imagen-slider"){
			$this->SearchImagenesSlider();///Obtine las imagenes de los sliders
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

//Funcion para traer los archivos de una categoria especifica
function TraerScaner(){
  
  $directorio = 'Documentos/'.$_POST['categoria'].'';

  if (!is_dir($directorio)) {
    $datos[] = array('ARCHIVO' => 'SIN CARPETA' );
  }else{ 
    $ficheros1  = scandir($directorio);

    $datos[1]=count($ficheros1);
    $datos[0]=array();

  
	for($i=0;$i<count($ficheros1);$i++){
       	if ($ficheros1[$i]!='.' AND $ficheros1[$i]!='..') {
         $datos[0][] = array('ARCHIVO' => $ficheros1[$i] );
       	}
    }

  echo json_encode($datos);
    }
}

//Funcion para traer las imagenes del slider
function TraerScanerSlider(){
  
  $directorio = 'Documentos/Imagenes/Slider';

  if (!is_dir($directorio)) {
    $datos[] = array('ARCHIVO' => 'SIN CARPETA' );
  }else{ 
    $ficheros1  = scandir($directorio);

    $datos[1]=count($ficheros1);
    $datos[0]=array();

  
	for($i=0;$i<count($ficheros1);$i++){
       	if ($ficheros1[$i]!='.' AND $ficheros1[$i]!='..') {
         $datos[0][] = array('ARCHIVO' => $ficheros1[$i] );
       	}
    }

  echo json_encode($datos);
    }
}


//Funcin para eliminar los documentos de una categoria
function EliminarDocumento(){
	global $dbpw;
	$dbpw->beginTransaction();

	$nombre_carpeta = $_POST ['ArchivoTemporal'];
	$nombre_archivo = $_POST ['Borrar'];

	//Borramos el dato del archivo seleccionado de la bitacora
	$q = 'DELETE FROM TB_Pagina_Bitacora_Documentos WHERE Nombre_Documento=:NOMD';
	$p = array(":NOMD"=>$nombre_archivo);

    if (!$this->insert($q,$p)) {
    	echo json_encode(array('status'=> 'Error delete bitacora documento'));
    	$dbpw->rollback();
    	return;
    }
	
	//Elimina el archivo seleccionado
	@unlink("Documentos/".$nombre_carpeta."/".$nombre_archivo."");

	echo json_encode(array('result' => 1));
	$dbpw->commit();
}

//Obtener URL Tramites
function getURLTramite() {
	
	$query = "SELECT ID_Tramite,DESC_Tramite,Link_Tramite,Tipo_Tramite FROM TB_Pagina_Tramites WHERE DESC_Tramite = :DDT";
	$p = array(":DDT" => $_POST["url"]);
	$data = $this->select($query, $p );

	$datos = array();
	$datos[1] = count($data);
	$datos[0] = array();

	if (count($data)!=0) {
      for ($i=0; $i < count($data); $i++) { 
      	$datos[0][$i] = $this->clearDummyData($data[$i],100);
      }
		
	}		

	echo json_encode($datos);
}

//Insert datos de consulta de tramites a la bitacora
function SaveBitacoraTramites(){
	global $dbpw;
	$dbpw->beginTransaction();
	//--Datos del permiso explotacion
	$idtramite = $_POST ['idtramite'];
    $desctramite = $_POST ['desctramite'];
    $tipotramite = $_POST ['tipotramite'];
   
    //Insert a la tabla de Bitacora de tramites
    $q="INSERT INTO [dbo].[TB_Pagina_Bitacora_Consultas_Tramites] (ID_Tramite, DESC_Tramite, Tipo_Tramite, Sistema_Fecha) VALUES(:IDT,:DESCT,:TT,:SF)";
	$p=array(":IDT"=>$idtramite,":DESCT"=>$desctramite,":TT"=>$tipotramite,":SF"=>date("Y-m-d H:i:s"));

	if (!$this->insert($q,$p)) {
		echo json_encode(array('status'=> 'Error Insert Bitacora Tramites'));
		$dbpw->rollback();
		return;
	}

    echo json_encode(array('status'=> 1));
	$dbpw->commit();
}
//Obtiene las categorias de las carpetas de los pdf
function getDetalleCategoria() {
	
	$query = "SELECT ID_Categoria, DESC_Categoria FROM TB_Pagina_Categorias_PDF WHERE ID_Categoria = :IDC";
	$p = array(":IDC" => $_POST["cat"]);
	$data = $this->select($query, $p );

	$datos = array();
	$datos[1] = count($data);
	$datos[0] = array();

	if (count($data)!=0) {
      for ($i=0; $i < count($data); $i++) { 
      	$datos[0][$i] = $this->clearDummyData($data[$i],100);
      }
		
	}		

	echo json_encode($datos);
}
//Obtiene los documentos segun la carpeta que seleccione
function getDocumentos() {
	$parameters[":IDC"] = $_GET["cat"];
	$query = "SELECT * FROM v_Pagina_Documentos WHERE ID_Categoria = :IDC";
	
	$data = $this->select($query, $parameters );

	$datos = array();
	$datos[1] = count($data);
	$datos[0] = array();

	if (count($data)!=0) {
      for ($i=0; $i < count($data); $i++) { 
      	$datos[0][$i] = $this->clearDummyData($data[$i],100);
      }
		
	}		

	echo json_encode($datos);
}

//Obtiene los documentos segun el tipo de documento que seleccione
function getTipoDocumentos() {
	$parameters[":IDC"] = $_GET["tipo"];
	$query = "SELECT * FROM v_Pagina_Documentos WHERE Extencion_Documento = :IDC ORDER BY ID DESC";
	
	$data = $this->select($query, $parameters );

	$datos = array();
	$datos[1] = count($data);
	$datos[0] = array();

	if (count($data)!=0) {
      for ($i=0; $i < count($data); $i++) { 
      	$datos[0][$i] = $this->clearDummyData($data[$i],100);
      }
		
	}		

	echo json_encode($datos);
}

//Insertar visualizacion pdf
function InsertVisualizacionPDF(){
	global $dbpw;
	$dbpw->beginTransaction();
	//Datos para insert
	$iddocumento = $_POST ['iddocumento'];
	$visitas = $_POST ['visitas'];

	$visitas = $visitas + 1;

	$q = "UPDATE TB_Pagina_Bitacora_Documentos set Total_Visualizaciones=:TV where ID_Documento=:IDD";
	$p = array(":IDD"=>$iddocumento, ":TV"=>$visitas);

	// echo json_encode($q);
	// 	echo json_encode($p);
	// 	return;

    if (!$this->insert($q,$p)) {
    	echo json_encode(array('status'=> 'Error Update Bitacora Visualizaciones'));
    	$dbpw->rollback();
    	return;
    }

    echo json_encode(array('status'=> 1));
	$dbpw->commit();
}

//Obtener URL Documentos
function getURLDocumentos() {
	
	$query = "SELECT ID_Documento,Nombre_Documento,DESC_Categoria FROM v_Pagina_Documentos WHERE Nombre_Documento = :NDN";
	$p = array(":NDN" => $_POST["nom"]);
	$data = $this->select($query, $p );

	$datos = array();
	$datos[1] = count($data);
	$datos[0] = array();

	if (count($data)!=0) {
      for ($i=0; $i < count($data); $i++) { 
      	$datos[0][$i] = $this->clearDummyData($data[$i],100);
      }
		
	}		

	echo json_encode($datos);
}

//Funcion para cargar la imagen de nueva publicacion
 function CargaImgPublicacion() {
 	global $dbpw;
	$dbpw->beginTransaction();

 	$nombreimg = $_POST ['nombreimg'];
 	$posimagen = $_POST ['posimagen'];

 	$nombre_archivo = $_FILES['EscaneoSolicitud']['name']; //Nombre completo con extencion
  	$Nombre_base = substr($nombre_archivo, 0, strripos($nombre_archivo, '.')); // nombre completo sin extencion
    $extencion_archivo = substr($nombre_archivo, strripos($nombre_archivo, '.')); // nombre extencion
    $filesize = $_FILES["EscaneoSolicitud"]["size"]; //Nombre original del pdf
    $tipos_archivos_permitidos = array('.png','.jpeg','.jpg'); //Validacion de tipos de extenciones permitidas
    $nuevo_nombre = $nombreimg . $extencion_archivo; //Nuevo nombre del archivo

    //Validaciones de la carga de documentos
  	if (in_array($extencion_archivo,$tipos_archivos_permitidos)) {
  		//Valida que no se puede subir un mismo tipo de documento con el mismo nombre
		if (file_exists("Documentos/Imagenes/Noticias/".$nuevo_nombre)) {
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


    $dirE = "Documentos/Imagenes/Noticias";
  	if (!is_dir($dirE)) {
	    mkdir($dirE, 0777, true);      
  	}

    if(isset($_FILES['EscaneoSolicitud'])) {
       move_uploaded_file($_FILES['EscaneoSolicitud']['tmp_name'], "Documentos/Imagenes/Noticias/".$nuevo_nombre);
    }


    //Creacion de la llave del documento
	$p=array();
	$datai = $this->select("SELECT top 1 * FROM [dbo].[TB_Pagina_Bitacora_Imagenes] ORDER BY [ID] DESC",$p);
	if(count($datai)==0) {
		$idimagen =  "IDI-1";
	}else{
		$rest = substr($datai[0]["ID_Imagen"],4);
	    $idimagen = "IDI-".(intval($rest)+1);
	}

    //Insert a la tabla de bitacora de los documentos
    $q="INSERT INTO [dbo].[TB_Pagina_Bitacora_Imagenes] (ID_Imagen, Nombre_Imagen, Size_Documento, Extencion_Documento, Tipo_Unidad, Posicion_Imagen, Sistema_Usuario, Sistema_Fecha) VALUES(:IDI,:NOM,:TA,:EXT,:TPU,:PIMG,:SU,:SF)";
	$p=array(":IDI"=>$idimagen,":NOM"=>$nuevo_nombre,":TA"=>$result,":EXT"=>$extencion_archivo,":TPU"=>$unidad,":PIMG"=>$posimagen,":SU"=>$_SESSION["user_name"],":SF"=>date("Y-m-d H:i:s"));

	// echo json_encode($q);
	// 			echo json_encode($p);
	// 			return;

	if (!$this->insert($q,$p)) {
		echo json_encode(array('result'=> 'Error Insert Bitacora Imagen'));
		$dbpw->rollback();
		return;
	}


    echo json_encode(array('result' => 1,'Nombre'=>$nuevo_nombre,'TBARCHIVO'=>'Noticias','IDI'=>$idimagen));
    $dbpw->commit();
}

//Funcion para cargar la imagen de nueva publicacion
function SavePublicacion() {
 	global $dbpw;
	$dbpw->beginTransaction();

	$nombreplu = $_POST ['nombreplu'];
 	$fechaplu = $_POST ['fechaplu'];
 	$descpublicacion = $_POST ['Data'];
 	$idimagen = $_POST ['idimagen'];
 	$catpublicacion = $_POST ['catpublicacion'];
 	$tipoinsert = $_POST ['tipoinsert'];


 	if ($tipoinsert==1) {

 		$tipopublicacion = $_POST ['tipopublicacion'];

 		//Creacion de la llave del documento
		$p=array();
		$datai = $this->select("SELECT top 1 * FROM [dbo].[TB_Pagina_Publicaciones] ORDER BY [ID] DESC",$p);
		if(count($datai)==0) {
			$idpublicacion =  "IDP-1";
		}else{
			$rest = substr($datai[0]["ID_Publicacion"],4);
		    $idpublicacion = "IDP-".(intval($rest)+1);
		}

		//Insert a la tabla de tb_pagina_publicaciones
	    $q="INSERT INTO [dbo].[TB_Pagina_Publicaciones] (ID_Publicacion, ID_Publicacion_Encrypted, Titulo_Publicacion, Fecha_Publicacion, Sistema_Usuario, Sistema_Fecha,ID_Imagen,ID_Categoria_Publicacion,ID_Tipo_Publicacion) VALUES(:IDP,:IDPE,:TP,:FP,:SU,:SF,:IDI,:ICP,:IDTP)";
		$p=array(":IDP"=>$idpublicacion,":IDPE"=>md5($idpublicacion),":TP"=>$nombreplu,":FP"=>date("Y-m-d H:i:s", strtotime($fechaplu)),":SU"=>$_SESSION["user_name"],":SF"=>date("Y-m-d H:i:s"),":IDI"=>$idimagen,":ICP"=>$catpublicacion,":IDTP"=>$tipopublicacion);

		// echo json_encode($q);
		// echo json_encode($p);
		// return;

		if (!$this->insert($q,$p)) {
			echo json_encode(array('status'=> 'Error Insert Nueva Publicación Digital'));
			$dbpw->rollback();
			return;
		}


 	} else {

 		//Creacion de la llave del documento
		$p=array();
		$datai = $this->select("SELECT top 1 * FROM [dbo].[TB_Pagina_Publicaciones] ORDER BY [ID] DESC",$p);
		if(count($datai)==0) {
			$idpublicacion =  "IDP-1";
		}else{
			$rest = substr($datai[0]["ID_Publicacion"],4);
		    $idpublicacion = "IDP-".(intval($rest)+1);
		}

		//Insert a la tabla de tb_pagina_publicaciones
	    $q="INSERT INTO [dbo].[TB_Pagina_Publicaciones] (ID_Publicacion, ID_Publicacion_Encrypted, Titulo_Publicacion, DESC_Publicacion, Fecha_Publicacion, Sistema_Usuario, Sistema_Fecha,ID_Imagen,ID_Categoria_Publicacion) VALUES(:IDP,:IDPE,:TP,:DP,:FP,:SU,:SF,:IDI,:ICP)";
		$p=array(":IDP"=>$idpublicacion,":IDPE"=>md5($idpublicacion),":TP"=>$nombreplu,":DP"=>$descpublicacion,":FP"=>date("Y-m-d H:i:s", strtotime($fechaplu)),":SU"=>$_SESSION["user_name"],":SF"=>date("Y-m-d H:i:s"),":IDI"=>$idimagen,":ICP"=>$catpublicacion);

		// echo json_encode($q);
		// echo json_encode($p);
		// return;

		if (!$this->insert($q,$p)) {
			echo json_encode(array('status'=> 'Error Insert Nueva Publicación'));
			$dbpw->rollback();
			return;
		}

 	}

    echo json_encode(array('status' => 1,"ID"=>MD5($idpublicacion)));
    $dbpw->commit();

}

//Funcin para eliminar la imagen seleccionada para la publicacion
function EliminarImagen(){
	global $dbpw;
	$dbpw->beginTransaction();

	$idimagen = $_POST ['Borrar'];
	$nombre_imagen = $_POST ['nombre_imagen'];
	$idpublicacion = $_POST ['idpublicacion'];

	if ($_POST ['tipo']==1) {
		//Borramos la imagen seleccionada de la bitacora
		$q = 'DELETE FROM TB_Pagina_Bitacora_Imagenes WHERE ID_Imagen=:IDI';
		$p = array(":IDI"=>$idimagen);

	    if (!$this->insert($q,$p)) {
	    	echo json_encode(array('status'=> 'Error delete bitacora imagen'));
	    	$dbpw->rollback();
	    	return;
	    }
		
		//Elimina el archivo seleccionado
		@unlink("Documentos/Imagenes/Noticias/".$nombre_imagen."");

	}else {

		//Borramos la imagen seleccionada de la bitacora
		$q = 'DELETE FROM TB_Pagina_Bitacora_Imagenes WHERE ID_Imagen=:IDI';
		$p = array(":IDI"=>$idimagen);

	    if (!$this->insert($q,$p)) {
	    	echo json_encode(array('status'=> 'Error delete bitacora imagen'));
	    	$dbpw->rollback();
	    	return;
	    }
		
		//Elimina el archivo seleccionado
		@unlink("Documentos/Imagenes/Noticias/".$nombre_imagen."");

		//Quitamos la imagen de la publicacion
		$q = "UPDATE TB_Pagina_Publicaciones set ID_Imagen=:IDI where ID_Publicacion=:IDP";
		$p = array(":IDP"=>$idpublicacion, ":IDI"=>"");

	    if (!$this->insert($q,$p)) {
	    	echo json_encode(array('status'=> 'Error Update Imagen Publicacion'));
	    	$dbpw->rollback();
	    	return;
	    }

	}

	echo json_encode(array('status' => 1));
	$dbpw->commit();
}

//Insert opiniones publicaciones
function InsertPublicaciones(){
	global $dbpw;
	$dbpw->beginTransaction();
	//Datos para insert
	$idpublicacion = $_POST ['idpublicacion'];
	$tipoopinion = $_POST ['tipoopinion'];

	if ($tipoopinion==1) {
		$eve = 'LIKE';
	}else {
		$eve = 'DISLIKE';
	}
	
	//Insert a la tabla de Bitacora_Opiniones
	$q="INSERT INTO [dbo].[TB_Pagina_Bitacora_Opiniones](ID_Documento, Tipo_Documento, Evento, Descripcion,Sistema_Fecha) VALUES(:IDD,:TD,:EVE,:DES,:SF)";
	$p=array(":IDD"=>$idpublicacion,":TD"=>'PUBLICACION',":EVE"=>$eve,":DES"=>'Me gusta la publicación',":SF"=>date("Y-m-d H:i:s"));

    if (!$this->insert($q,$p)) {
    	echo json_encode(array('status'=>'Error insert bitacora opinion'));
    	$dbpw->rollback();
    	return;
    }

    echo json_encode(array('status' => 1));
	$dbpw->commit();
}

//Funcion para busqueda de avisos de cobro
function SearchNoticias(){
  global $dbpw;

  	$CondicionParmetro = $_GET["Tipo"];

  	if ($CondicionParmetro=='Fechas') {
  		$parameters[":IDCOL"] = $_GET["fecha_inicio"];
  		$parameters[":IDCOL1"] = $_GET["fecha_final"];
  		$condicion =" WHERE ((CONVERT(DATE,Fecha_Publicacion_Normal) BETWEEN :IDCOL AND :IDCOL1) AND ID_Tipo_Publicacion IS NULL)";
  	}else {
  		$parameters[":IDCOL"] = "%".$_GET["col_name"]."%";
  		$condicion =" WHERE (ID_Publicacion LIKE :IDCOL AND ID_Tipo_Publicacion IS NULL)";
  	}
	$query= "SELECT * FROM ( SELECT *, ROW_NUMBER() OVER(ORDER BY ID DESC )ROWNUMBER FROM IHTT_PAGINA_WEB.dbo.v_Pagina_Publicaciones";
	$query .= $condicion. ") AS TABLAFILTRO";

 	    $Total = "SELECT count(*) as cantidad FROM IHTT_PAGINA_WEB.dbo.v_Pagina_Publicaciones";
 	    $Total .= $condicion;
 	    $stmt = $dbpw->prepare($Total);
 		$stmt->execute($parameters);
 		$data1 = $stmt->fetchAll();
 		$cantidad = $data1[0]["cantidad"];

	 	if (isset($_GET['Next'])){
	 		$hasta = $_GET['Next']+10;
	 		$desde = $_GET['Next']+1;
	 		$query .= " WHERE ROWNUMBER BETWEEN ".$desde." AND ".$hasta."";
	 	}
	 		$stmt = $dbpw->prepare($query);
	 		$stmt->execute($parameters);
	 		$data = $stmt->fetchAll();
	 		$datos = array();
	 		$datos[1]=count($data);
	 		$datos[0]=array();
	 		$datos[1]=array();
	 		$datos[2]=array();

	 		for($i=0;$i<count($data);$i++){
	 			$datos[2][] = /*$data[$i]['ROWNUMBER'] */$this->clearDummyData($data[$i],100);
	 			$last = $data[$i]["ROWNUMBER"];

	 		}
	 		
	 			if ($cantidad < 100) {
	 				$Cant = $cantidad;
	 			}else{
	 				$Cant = 100;
	 			}


	 			if ($_GET['Next']==0) {
	 				$d = 0; 
	 				$con = 1;
	 			}else{
	 				$d = $_GET['Next']-10;
	 				$con = $_GET['Next']/10;
	 			}

	 			for($i=$d; $i<$Cant+$d; $i=$i+10){
	 			  if ($_GET['Next']==$i) { $activo = 'active';}else{ $activo = '';}
	 			  $datos[1][]=array("Paginas"=>$i,'Nun'=>$con++,"Activo"=>$activo  );
	 			}

	 			if ($cantidad==0) {
	 			   $last= 0;
	 			}

	 			$datos[0]=array("conteo"=>10,"numPages"=>ceil($cantidad/10), "last"=>$last,"Total"=>$cantidad,'lastPage'=>$PagUlt=$cantidad/10);

	 			echo json_encode($datos);
}


//Funcin para eliminar la imagen seleccionada para la publicacion
function EliminarPublicacion(){
	global $dbpw;
	$dbpw->beginTransaction();

	$idpublicacion = $_POST ['idpublicacion'];
	$idimagen = $_POST ['idimagen'];
	$nombre_imagen = $_POST ['nombre_imagen'];
	$tipo = $_POST ['tipo'];


	//Borramos la imagen seleccionada de la bitacora
	$q = 'DELETE FROM TB_Pagina_Bitacora_Imagenes WHERE ID_Imagen=:IDI';
	$p = array(":IDI"=>$idimagen);

    if (!$this->insert($q,$p)) {
    	echo json_encode(array('status'=> 'Error delete bitacora imagen'));
    	$dbpw->rollback();
    	return;
    }
	
	//Elimina el archivo seleccionado
	if ($tipo==1) {
		@unlink("Documentos/Imagenes/Noticias/".$nombre_imagen."");
	}else {
		$desctipo = $_POST ['desctipo'];
		@unlink("Documentos/Imagenes/".$desctipo."/".$nombre_imagen."");
	}
	
	//Borramos la publiblicacion
	$q = 'DELETE FROM TB_Pagina_Publicaciones WHERE ID_Publicacion=:IDP';
	$p = array(":IDP"=>$idpublicacion);

    if (!$this->insert($q,$p)) {
    	echo json_encode(array('status'=> 'Error delete publicacion'));
    	$dbpw->rollback();
    	return;
    }

    //Borramos las opiniones
	$q = 'DELETE FROM TB_Pagina_Bitacora_Opiniones WHERE ID_Documento=:IDD';
	$p = array(":IDD"=>$idpublicacion);

    if (!$this->insert($q,$p)) {
    	echo json_encode(array('status'=> 'Error delete opinion'));
    	$dbpw->rollback();
    	return;
    }

    //Insert a la tabla de Bitacora_Opiniones
	$q="INSERT INTO [dbo].[TB_Pagina_Bitacora_Modificaciones](Evento, ID_Documento, Descripcion, Sistema_Usuario, Sistema_Fecha, Tipo_Documento) VALUES(:EVE,:IDD,:DES,:SU,:SF,:TD)";
	$p=array(":EVE"=>'ELIMINACIÓN',":IDD"=>$idpublicacion,":DES"=>'Eliminacion de plublicación',":SU"=>$_SESSION["user_name"],":SF"=>date("Y-m-d H:i:s"),":TD"=>'PUBLICACIÓN');

    if (!$this->insert($q,$p)) {
    	echo json_encode(array('status'=>'Error insert bitacora modificacion'));
    	$dbpw->rollback();
    	return;
    }

	echo json_encode(array('status' => 1));
	$dbpw->commit();
}

//Insertar visualizacion pdf
function InsertVisualizacionPublicacion(){
	
	global $dbpw;
	$dbpw->beginTransaction();
	//Datos para insert
	$idpublicacion = $_POST ['idpublicacion'];

	//Insert bitacora
	$q="INSERT INTO [dbo].[TB_Pagina_Bitacora_Visualizaciones](Evento, ID_Documento, Sistema_Fecha) VALUES(:EVE,:IDP,:SF)";
	$p=array(":EVE"=>'PUBLICACION',":IDP"=>$idpublicacion,":SF"=>date("Y-m-d H:i:s"));

    if (!$this->insert($q,$p)) {
    	echo json_encode(array('status'=>'Error insert bitacora visualizacion'));
    	$dbpw->rollback();
    	return;
    }

    echo json_encode(array('status'=> 1));
	$dbpw->commit();

}

//Funcion para obtener los parametros de busqueda segun el tipo de busqueda
function getParametro_Busqueda(){
    $q="SELECT * FROM [IHTT_PAGINA_WEB].[dbo].[v_Pagina_Tipos_x_Parametros_Busquedas]";
    $q.= "WHERE ID_Tipo_Busqueda = :TIPO ORDER BY DESC_Parametro ASC";
    $p = array(":TIPO" => $_POST["tipo"]);
    $data = $this->select($q, $p);
    $datos[1]=count($data);
    $datos[0]=array();
      for($i=0;$i<count($data);$i++){
        $datos[0][] = array("TipoBusqueda" => "<option value='".$data[$i]["ID_Parametro_Busqueda"]."' >".$data[$i]["DESC_Parametro"]."</option>");
      }
    echo json_encode($datos);
}

//Funcion para busqueda de censos
function SearchCenso(){
  global $dbpw;

  	$CondicionParmetro = $_GET["Tipo"];

  	if ($CondicionParmetro == 'CodigoCenso') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}else if ($CondicionParmetro == 'Certificado') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}else if ($CondicionParmetro == 'Concesionario') {
  		$parameters[":IDCOL"] = "%".$_GET["col_name"]."%";
  		$signo = 'like';
  	}else if ($CondicionParmetro == 'Expediente') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}else if ($CondicionParmetro == 'PermisoExplotacion') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}else if ($CondicionParmetro == 'Placa') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}else if ($CondicionParmetro == 'RTN_Concesionario') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}

	$condicion =" WHERE ($CondicionParmetro $signo :IDCOL)";

	$query= "SELECT * FROM ( SELECT *, ROW_NUMBER() OVER(ORDER BY ID DESC )ROWNUMBER FROM IHTT_Censo.dbo.v_Consulta_Certificado_Pasajero";
	$query .= $condicion. ") AS TABLAFILTRO";

 	    $Total = "SELECT count(*) as cantidad FROM IHTT_Censo.dbo.v_Consulta_Certificado_Pasajero";
 	    $Total .= $condicion;
 	    $stmt = $dbpw->prepare($Total);
 		$stmt->execute($parameters);
 		$data1 = $stmt->fetchAll();
 		$cantidad = $data1[0]["cantidad"];

	 	if (isset($_GET['Next'])){
	 		$hasta = $_GET['Next']+10;
	 		$desde = $_GET['Next']+1;
	 		$query .= " WHERE ROWNUMBER BETWEEN ".$desde." AND ".$hasta."";
	 	}
	 		$stmt = $dbpw->prepare($query);
	 		$stmt->execute($parameters);
	 		$data = $stmt->fetchAll();
	 		$datos = array();
	 		$datos[1]=count($data);
	 		$datos[0]=array();
	 		$datos[1]=array();
	 		$datos[2]=array();

	 		for($i=0;$i<count($data);$i++){
	 			$datos[2][] = /*$data[$i]['ROWNUMBER'] */$this->clearDummyData($data[$i],100);
	 			$last = $data[$i]["ROWNUMBER"];

	 		}
	 		
	 			if ($cantidad < 100) {
	 				$Cant = $cantidad;
	 			}else{
	 				$Cant = 100;
	 			}


	 			if ($_GET['Next']==0) {
	 				$d = 0; 
	 				$con = 1;
	 			}else{
	 				$d = $_GET['Next']-10;
	 				$con = $_GET['Next']/10;
	 			}

	 			for($i=$d; $i<$Cant+$d; $i=$i+10){
	 			  if ($_GET['Next']==$i) { $activo = 'active';}else{ $activo = '';}
	 			  $datos[1][]=array("Paginas"=>$i,'Nun'=>$con++,"Activo"=>$activo  );
	 			}

	 			if ($cantidad==0) {
	 			   $last= 0;
	 			}

	 			$datos[0]=array("conteo"=>10,"numPages"=>ceil($cantidad/10), "last"=>$last,"Total"=>$cantidad,'lastPage'=>$PagUlt=$cantidad/10);

	 			echo json_encode($datos);
}

//Funcion para busqueda de conductores
function SearchConductores(){
  global $dbpw;

  	$CondicionParmetro = $_GET["Tipo"];

  	if ($CondicionParmetro == 'Nombre_Completo') {
  		$parameters[":IDCOL"] = "%".$_GET["col_name"]."%";
  		$signo = 'like';
  	}else if ($CondicionParmetro == 'ID_Persona') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}else if ($CondicionParmetro == 'ID_Placa') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}

	$condicion =" WHERE ($CondicionParmetro $signo :IDCOL)";

	$query= "SELECT * FROM ( SELECT *, ROW_NUMBER() OVER(ORDER BY ID DESC )ROWNUMBER FROM IHTT_RCB.dbo.V_busq_Registros";
	$query .= $condicion. ") AS TABLAFILTRO";

 	    $Total = "SELECT count(*) as cantidad FROM IHTT_RCB.dbo.V_busq_Registros";
 	    $Total .= $condicion;
 	    $stmt = $dbpw->prepare($Total);
 		$stmt->execute($parameters);
 		$data1 = $stmt->fetchAll();
 		$cantidad = $data1[0]["cantidad"];

	 	if (isset($_GET['Next'])){
	 		$hasta = $_GET['Next']+10;
	 		$desde = $_GET['Next']+1;
	 		$query .= " WHERE ROWNUMBER BETWEEN ".$desde." AND ".$hasta."";
	 	}
	 		$stmt = $dbpw->prepare($query);
	 		$stmt->execute($parameters);
	 		$data = $stmt->fetchAll();
	 		$datos = array();
	 		$datos[1]=count($data);
	 		$datos[0]=array();
	 		$datos[1]=array();
	 		$datos[2]=array();

	 		for($i=0;$i<count($data);$i++){
	 			$datos[2][] = /*$data[$i]['ROWNUMBER'] */$this->clearDummyData($data[$i],100);
	 			$last = $data[$i]["ROWNUMBER"];

	 		}
	 		
	 			if ($cantidad < 100) {
	 				$Cant = $cantidad;
	 			}else{
	 				$Cant = 100;
	 			}


	 			if ($_GET['Next']==0) {
	 				$d = 0; 
	 				$con = 1;
	 			}else{
	 				$d = $_GET['Next']-10;
	 				$con = $_GET['Next']/10;
	 			}

	 			for($i=$d; $i<$Cant+$d; $i=$i+10){
	 			  if ($_GET['Next']==$i) { $activo = 'active';}else{ $activo = '';}
	 			  $datos[1][]=array("Paginas"=>$i,'Nun'=>$con++,"Activo"=>$activo  );
	 			}

	 			if ($cantidad==0) {
	 			   $last= 0;
	 			}

	 			$datos[0]=array("conteo"=>10,"numPages"=>ceil($cantidad/10), "last"=>$last,"Total"=>$cantidad,'lastPage'=>$PagUlt=$cantidad/10);

	 			echo json_encode($datos);
}

//Funcion para busqueda de certificados
function SearchCertificados(){
  global $dbpw;

  	$CondicionParmetro = $_GET["Tipo"];

  	if ($CondicionParmetro == 'DESC_Categoria') {
  		$parameters[":IDCOL"] = "%".$_GET["col_name"]."%";
  		$signo = 'like';
  	}else if ($CondicionParmetro == 'N_Certificado') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}else if ($CondicionParmetro == 'ID_Expediente') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}else if ($CondicionParmetro == 'ID_Placa') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}else if ($CondicionParmetro == 'RTN_Concesionario') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}

	$condicion =" WHERE ($CondicionParmetro $signo :IDCOL)";

	$query= "SELECT * FROM ( SELECT *, ROW_NUMBER() OVER(ORDER BY ID DESC )ROWNUMBER FROM IHTT_SGCERP.dbo.v_Certificados_Notificados";
	$query .= $condicion. ") AS TABLAFILTRO";

 	    $Total = "SELECT count(*) as cantidad FROM IHTT_SGCERP.dbo.v_Certificados_Notificados";
 	    $Total .= $condicion;
 	    $stmt = $dbpw->prepare($Total);
 		$stmt->execute($parameters);
 		$data1 = $stmt->fetchAll();
 		$cantidad = $data1[0]["cantidad"];

	 	if (isset($_GET['Next'])){
	 		$hasta = $_GET['Next']+10;
	 		$desde = $_GET['Next']+1;
	 		$query .= " WHERE ROWNUMBER BETWEEN ".$desde." AND ".$hasta."";
	 	}
	 		$stmt = $dbpw->prepare($query);
	 		$stmt->execute($parameters);
	 		$data = $stmt->fetchAll();
	 		$datos = array();
	 		$datos[1]=count($data);
	 		$datos[0]=array();
	 		$datos[1]=array();
	 		$datos[2]=array();

	 		for($i=0;$i<count($data);$i++){
	 			$datos[2][] = /*$data[$i]['ROWNUMBER'] */$this->clearDummyData($data[$i],100);
	 			$last = $data[$i]["ROWNUMBER"];

	 		}
	 		
	 			if ($cantidad < 100) {
	 				$Cant = $cantidad;
	 			}else{
	 				$Cant = 100;
	 			}


	 			if ($_GET['Next']==0) {
	 				$d = 0; 
	 				$con = 1;
	 			}else{
	 				$d = $_GET['Next']-10;
	 				$con = $_GET['Next']/10;
	 			}

	 			for($i=$d; $i<$Cant+$d; $i=$i+10){
	 			  if ($_GET['Next']==$i) { $activo = 'active';}else{ $activo = '';}
	 			  $datos[1][]=array("Paginas"=>$i,'Nun'=>$con++,"Activo"=>$activo  );
	 			}

	 			if ($cantidad==0) {
	 			   $last= 0;
	 			}

	 			$datos[0]=array("conteo"=>10,"numPages"=>ceil($cantidad/10), "last"=>$last,"Total"=>$cantidad,'lastPage'=>$PagUlt=$cantidad/10);

	 			echo json_encode($datos);
}

//Funcion para busqueda de permisos eventuales
function SearchPermisosEventuales(){
  global $dbpw;

  	$CondicionParmetro = $_GET["Tipo"];

  	if ($CondicionParmetro == 'CodigoCenso') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}else if ($CondicionParmetro == 'ConductorIdentidad') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}else if ($CondicionParmetro == 'PermisoCodigo') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}

	$condicion =" WHERE ($CondicionParmetro $signo :IDCOL)";

	$query= "SELECT * FROM ( SELECT *, ROW_NUMBER() OVER(ORDER BY SistemaFecha DESC )ROWNUMBER FROM IHTT_PAGINA_WEB.dbo.v_Permisos_Eventuales_Generales";
	$query .= $condicion. ") AS TABLAFILTRO";

 	    $Total = "SELECT count(*) as cantidad FROM IHTT_PAGINA_WEB.dbo.v_Permisos_Eventuales_Generales";
 	    $Total .= $condicion;
 	    $stmt = $dbpw->prepare($Total);
 		$stmt->execute($parameters);
 		$data1 = $stmt->fetchAll();
 		$cantidad = $data1[0]["cantidad"];

	 	if (isset($_GET['Next'])){
	 		$hasta = $_GET['Next']+10;
	 		$desde = $_GET['Next']+1;
	 		$query .= " WHERE ROWNUMBER BETWEEN ".$desde." AND ".$hasta."";
	 	}
	 		$stmt = $dbpw->prepare($query);
	 		$stmt->execute($parameters);
	 		$data = $stmt->fetchAll();
	 		$datos = array();
	 		$datos[1]=count($data);
	 		$datos[0]=array();
	 		$datos[1]=array();
	 		$datos[2]=array();

	 		for($i=0;$i<count($data);$i++){
	 			$datos[2][] = /*$data[$i]['ROWNUMBER'] */$this->clearDummyData($data[$i],100);
	 			$last = $data[$i]["ROWNUMBER"];

	 		}
	 		
	 			if ($cantidad < 100) {
	 				$Cant = $cantidad;
	 			}else{
	 				$Cant = 100;
	 			}


	 			if ($_GET['Next']==0) {
	 				$d = 0; 
	 				$con = 1;
	 			}else{
	 				$d = $_GET['Next']-10;
	 				$con = $_GET['Next']/10;
	 			}

	 			for($i=$d; $i<$Cant+$d; $i=$i+10){
	 			  if ($_GET['Next']==$i) { $activo = 'active';}else{ $activo = '';}
	 			  $datos[1][]=array("Paginas"=>$i,'Nun'=>$con++,"Activo"=>$activo  );
	 			}

	 			if ($cantidad==0) {
	 			   $last= 0;
	 			}

	 			$datos[0]=array("conteo"=>10,"numPages"=>ceil($cantidad/10), "last"=>$last,"Total"=>$cantidad,'lastPage'=>$PagUlt=$cantidad/10);

	 			echo json_encode($datos);
}

//Funcion para busqueda de registro conductores
function SearchRegistroConductores(){
  global $dbpw;

  	$CondicionParmetro = $_GET["Tipo"];

  	if ($CondicionParmetro == 'ID_Certificado_Operacion') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}else if ($CondicionParmetro == 'Nombre_Completo') {
  		$parameters[":IDCOL"] = "%".$_GET["col_name"]."%";
  		$signo = 'like';
  	}else if ($CondicionParmetro == 'DESC_Empresa') {
  		$parameters[":IDCOL"] = "%".$_GET["col_name"]."%";
  		$signo = 'like';
  	}else if ($CondicionParmetro == 'ID_Persona') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}else if ($CondicionParmetro == 'ID_Placa') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}else if ($CondicionParmetro == 'ID_Ingreso') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}else if ($CondicionParmetro == 'ID_Numero_Registro') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}

	$condicion =" WHERE ($CondicionParmetro $signo :IDCOL)";

	$query= "SELECT * FROM ( SELECT *, ROW_NUMBER() OVER(ORDER BY ID DESC )ROWNUMBER FROM IHTT_REGISTRO_CONDUCTORES.dbo.V_Busq_Formulario_Web";
	$query .= $condicion. ") AS TABLAFILTRO";

 	    $Total = "SELECT count(*) as cantidad FROM IHTT_REGISTRO_CONDUCTORES.dbo.V_Busq_Formulario_Web";
 	    $Total .= $condicion;
 	    $stmt = $dbpw->prepare($Total);
 		$stmt->execute($parameters);
 		$data1 = $stmt->fetchAll();
 		$cantidad = $data1[0]["cantidad"];

	 	if (isset($_GET['Next'])){
	 		$hasta = $_GET['Next']+10;
	 		$desde = $_GET['Next']+1;
	 		$query .= " WHERE ROWNUMBER BETWEEN ".$desde." AND ".$hasta."";
	 	}
	 		$stmt = $dbpw->prepare($query);
	 		$stmt->execute($parameters);
	 		$data = $stmt->fetchAll();
	 		$datos = array();
	 		$datos[1]=count($data);
	 		$datos[0]=array();
	 		$datos[1]=array();
	 		$datos[2]=array();

	 		for($i=0;$i<count($data);$i++){
	 			$datos[2][] = /*$data[$i]['ROWNUMBER'] */$this->clearDummyData($data[$i],100);
	 			$last = $data[$i]["ROWNUMBER"];

	 		}
	 		
	 			if ($cantidad < 100) {
	 				$Cant = $cantidad;
	 			}else{
	 				$Cant = 100;
	 			}


	 			if ($_GET['Next']==0) {
	 				$d = 0; 
	 				$con = 1;
	 			}else{
	 				$d = $_GET['Next']-10;
	 				$con = $_GET['Next']/10;
	 			}

	 			for($i=$d; $i<$Cant+$d; $i=$i+10){
	 			  if ($_GET['Next']==$i) { $activo = 'active';}else{ $activo = '';}
	 			  $datos[1][]=array("Paginas"=>$i,'Nun'=>$con++,"Activo"=>$activo  );
	 			}

	 			if ($cantidad==0) {
	 			   $last= 0;
	 			}

	 			$datos[0]=array("conteo"=>10,"numPages"=>ceil($cantidad/10), "last"=>$last,"Total"=>$cantidad,'lastPage'=>$PagUlt=$cantidad/10);

	 			echo json_encode($datos);
}

//Funcion para busqueda de resoluciones
function SearchResoluciones(){
  global $dbpw;

  	$CondicionParmetro = $_GET["Tipo"];

  	if ($CondicionParmetro == 'ID_ColegiacionAPL') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}else if ($CondicionParmetro == 'NombreSolicitante') {
  		$parameters[":IDCOL"] = "%".$_GET["col_name"]."%";
  		$signo = 'like';
  	}else if ($CondicionParmetro == 'ID_Expediente') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}else if ($CondicionParmetro == 'CodigoDocumentoNotificacion') {
  		$parameters[":IDCOL"] = $_GET["col_name"];
  		$signo = '=';
  	}

	$condicion =" WHERE ($CondicionParmetro $signo :IDCOL)";

	$query= "SELECT * FROM ( SELECT *, ROW_NUMBER() OVER(ORDER BY FechaNotificacion DESC )ROWNUMBER FROM IHTT_PAGINA_WEB.dbo.v_Resoluciones";
	$query .= $condicion. ") AS TABLAFILTRO";

 	    $Total = "SELECT count(*) as cantidad FROM IHTT_PAGINA_WEB.dbo.v_Resoluciones";
 	    $Total .= $condicion;
 	    $stmt = $dbpw->prepare($Total);
 		$stmt->execute($parameters);
 		$data1 = $stmt->fetchAll();
 		$cantidad = $data1[0]["cantidad"];

	 	if (isset($_GET['Next'])){
	 		$hasta = $_GET['Next']+10;
	 		$desde = $_GET['Next']+1;
	 		$query .= " WHERE ROWNUMBER BETWEEN ".$desde." AND ".$hasta."";
	 	}
	 		$stmt = $dbpw->prepare($query);
	 		$stmt->execute($parameters);
	 		$data = $stmt->fetchAll();
	 		$datos = array();
	 		$datos[1]=count($data);
	 		$datos[0]=array();
	 		$datos[1]=array();
	 		$datos[2]=array();

	 		for($i=0;$i<count($data);$i++){
	 			$datos[2][] = /*$data[$i]['ROWNUMBER'] */$this->clearDummyData($data[$i],100);
	 			$last = $data[$i]["ROWNUMBER"];

	 		}
	 		
	 			if ($cantidad < 100) {
	 				$Cant = $cantidad;
	 			}else{
	 				$Cant = 100;
	 			}


	 			if ($_GET['Next']==0) {
	 				$d = 0; 
	 				$con = 1;
	 			}else{
	 				$d = $_GET['Next']-10;
	 				$con = $_GET['Next']/10;
	 			}

	 			for($i=$d; $i<$Cant+$d; $i=$i+10){
	 			  if ($_GET['Next']==$i) { $activo = 'active';}else{ $activo = '';}
	 			  $datos[1][]=array("Paginas"=>$i,'Nun'=>$con++,"Activo"=>$activo  );
	 			}

	 			if ($cantidad==0) {
	 			   $last= 0;
	 			}

	 			$datos[0]=array("conteo"=>10,"numPages"=>ceil($cantidad/10), "last"=>$last,"Total"=>$cantidad,'lastPage'=>$PagUlt=$cantidad/10);

	 			echo json_encode($datos);
}


//Funcion para busqueda de validaicon ip
function SearchValidacionIP(){

	$tipobusqueda = $_GET["Tipo"];
	$parametro = $_GET["col_name"];

	$data = file_get_contents("https://satt.transporte.gob.hn:184/api/ConsultasVarias/validacionDocumentosIP/".$tipobusqueda."/".$parametro);

    $products = json_decode($data, true);

    //Datos de la Concesion
    $solicitud = $products["ExpedientePrimario"]["IdSolicitud"];
    $expediente = $products["ExpedientePrimario"]["IdExpediente"];
    $numero_documento = $products["Numero"];
    $concesionario = $products["ExpedientePrimario"]["PermisoExplotacion"]["Concesionario"]["Nombre"];
    $permiso = $products["ExpedientePrimario"]["PermisoExplotacion"]["NumeroPermiso"];
    $certificado = $products["ExpedientePrimario"]["PermisoExplotacion"]["Certificados"][0]["NumeroCertificado"];
    //Datos de Unidad
    //Unidad Actual
    $marcaunidadactual = $products["ExpedientePrimario"]["PermisoExplotacion"]["Certificados"][0]["UnidadActual"]["Marca"];
    $modelounidadactual = $products["ExpedientePrimario"]["PermisoExplotacion"]["Certificados"][0]["UnidadActual"]["Modelo"];
    $colorunidadactual = $products["ExpedientePrimario"]["PermisoExplotacion"]["Certificados"][0]["UnidadActual"]["Color"];
    $motorunidadactual = $products["ExpedientePrimario"]["PermisoExplotacion"]["Certificados"][0]["UnidadActual"]["Motor"];
    $chasisunidadactual = $products["ExpedientePrimario"]["PermisoExplotacion"]["Certificados"][0]["UnidadActual"]["VIN"];
    $tipounidadactual = $products["ExpedientePrimario"]["PermisoExplotacion"]["Certificados"][0]["UnidadActual"]["TipoUnidad"]["Descripcion"];
    //Unidad Nueva
    $unidadnueva = $products["ExpedientePrimario"]["PermisoExplotacion"]["Certificados"][0]["UnidadNueva"];
    $marcaunidadnueva = $products["ExpedientePrimario"]["PermisoExplotacion"]["Certificados"][0]["UnidadNueva"]["Marca"];
    $modelounidadnueva = $products["ExpedientePrimario"]["PermisoExplotacion"]["Certificados"][0]["UnidadNueva"]["Modelo"];
    $colorunidadnueva = $products["ExpedientePrimario"]["PermisoExplotacion"]["Certificados"][0]["UnidadNueva"]["Color"];
    $motorunidadnueva = $products["ExpedientePrimario"]["PermisoExplotacion"]["Certificados"][0]["UnidadNueva"]["Motor"];
    $chasisunidadnueva = $products["ExpedientePrimario"]["PermisoExplotacion"]["Certificados"][0]["UnidadNueva"]["VIN"];
    $tipounidadnueva = $products["ExpedientePrimario"]["PermisoExplotacion"]["Certificados"][0]["UnidadNueva"]["TipoUnidad"]["Descripcion"];

	$datos[0][0] = array("Solicitud" =>$solicitud,"Expediente" =>$expediente,"Numero_Documento" =>$numero_documento,"Concesionario" =>$concesionario,"Permiso_Explotacion" =>$permiso,"Certificado_Operacion" =>$certificado,"Marca_Unidad_Actual" =>$marcaunidadactual,"Modelo_Unidad_Actual" =>$modelounidadactual,"Color_Unidad_Actual" =>$colorunidadactual,"Motor_Unidad_Actual" =>$motorunidadactual,"Chasis_Unidad_Actual" =>$chasisunidadactual,"Tipo_Unidad_Actual" =>$tipounidadactual,"Marca_Unidad_Nueva" =>$marcaunidadnueva,"Modelo_Unidad_Nueva" =>$modelounidadnueva,"Color_Unidad_Nueva" =>$colorunidadnueva,"Motor_Unidad_Nueva" =>$motorunidadnueva,"Chasis_Unidad_Nueva" =>$chasisunidadnueva,"Tipo_Unidad_Nueva" =>$tipounidadnueva,"Validacion_Unidad_Nueva" =>$unidadnueva);
	
	echo json_encode($datos);
    
}

//Salvar la cantidad de busquedas
function InsertVisitasConsultas(){
	global $dbpw;
	$dbpw->beginTransaction();
	//Datos para insert
	$tipobusqueda = $_POST ['tipobusqueda'];
	$parbusqueda = $_POST ['parbusqueda'];
	
	//Insert a la tabla de Bitacora_Preforma inadmitida
	$q="INSERT INTO [IHTT_PAGINA_WEB].[dbo].[TB_Pagina_Bitacora_Consultas_Generales](ID_Tipo_Busqueda, ID_Parametro_Busqueda,Evento,Sistema_Fecha) VALUES(:IDTB,:IDPB,:EVE,:SF)";
	$p=array(":IDTB"=>$tipobusqueda,":IDPB"=>$parbusqueda,":EVE"=>'Busqueda Consulta',":SF"=>date("Y-m-d H:i:s"));

	// echo json_encode($q);
 //    echo json_encode($p);
 //    return;

    if (!$this->insert($q,$p)) {
    	echo json_encode(array('status'=> 'Error Insert Bitacora Consulta'));
    	$dbpw->rollback();
    	return;
    }

    echo json_encode(array('status'=> 1));
	$dbpw->commit();
}

//Obtiene el total vistas de la consultas
function getTotal_Vistas_General() {
	$query = "SELECT COUNT(*) AS Total_Vistas FROM TB_Pagina_Bitacora_Consultas_Generales WHERE ID_Tipo_Busqueda= :IDTB";
	$p = array(":IDTB" => $_POST["tipo"]);
	$data = $this->select($query, $p );

	$datos = array();
	$datos[1] = count($data);
	$datos[0] = array();

	if (count($data)!=0) {
      for ($i=0; $i < count($data); $i++) { 
      	$datos[0][$i] = $this->clearDummyData($data[$i],100);
      }
		
	}		
	echo json_encode($datos);
}

//Update Titulo publicacion
function UpdateTituloPublicacion(){
	global $dbpw;
	$dbpw->beginTransaction();
	//Datos para insert
	$idpublicacion = $_POST ['idpublicacion'];
	$titulo = $_POST ['titulo'];

	$q = "UPDATE TB_Pagina_Publicaciones set Titulo_Publicacion=:TP where ID_Publicacion=:IDP";
	$p = array(":IDP"=>$idpublicacion, ":TP"=>$titulo);

	// echo json_encode($q);
 //    echo json_encode($p);
 //    return;

    if (!$this->insert($q,$p)) {
    	echo json_encode(array('status'=> 'Error Update Titulo Pagina Publicacion'));
    	$dbpw->rollback();
    	return;
    }

    echo json_encode(array('status'=> 1));
	$dbpw->commit();
}

//Update Fecha publicacion
function UpdateFechaPublicacion(){
	global $dbpw;
	$dbpw->beginTransaction();
	//Datos para insert
	$idpublicacion = $_POST ['idpublicacion'];
	$fecha_plublicacion = $_POST ['fecha_plublicacion'];

	$q = "UPDATE TB_Pagina_Publicaciones set Fecha_Publicacion=:FP where ID_Publicacion=:IDP";
	$p = array(":IDP"=>$idpublicacion, ":FP"=>$fecha_plublicacion);

	// echo json_encode($q);
 //    echo json_encode($p);
 //    return;

    if (!$this->insert($q,$p)) {
    	echo json_encode(array('status'=> 'Error Update Fecha Pagina Publicacion'));
    	$dbpw->rollback();
    	return;
    }

    echo json_encode(array('status'=> 1));
	$dbpw->commit();
}

//Update Imagen publicacion
function UpdateImagenPublicacion(){
	global $dbpw;
	$dbpw->beginTransaction();
	//Datos para insert
	$idpublicacion = $_POST ['idpublicacion'];
	$idimagen = $_POST ['idimagen'];
	

	$q = "UPDATE TB_Pagina_Publicaciones set ID_Imagen=:IDI where ID_Publicacion=:IDP";
	$p = array(":IDP"=>$idpublicacion, ":IDI"=>$idimagen);

	// echo json_encode($q);
 //    echo json_encode($p);
 //    return;

    if (!$this->insert($q,$p)) {
    	echo json_encode(array('status'=> 'Error Update Imagen Pagina Bitacora Imagenes'));
    	$dbpw->rollback();
    	return;
    }

    echo json_encode(array('status'=> 1));
	$dbpw->commit();
}

//Funcion para busqueda de censos
function SearchCitas(){
  global $dbpw;

  	$parameters[":IDCOL"] = $_GET["col_name"];
  	
	$condicion =" WHERE (ID_Solicitante LIKE :IDCOL)";

	$query= "SELECT * FROM ( SELECT *, ROW_NUMBER() OVER(ORDER BY ID DESC )ROWNUMBER FROM IHTT_VISITANTES.dbo.v_Consultas_Generales";
	$query .= $condicion. ") AS TABLAFILTRO";

 	    $Total = "SELECT count(*) as cantidad FROM IHTT_VISITANTES.dbo.v_Consultas_Generales";
 	    $Total .= $condicion;
 	    $stmt = $dbpw->prepare($Total);
 		$stmt->execute($parameters);
 		$data1 = $stmt->fetchAll();
 		$cantidad = $data1[0]["cantidad"];

	 	if (isset($_GET['Next'])){
	 		$hasta = $_GET['Next']+10;
	 		$desde = $_GET['Next']+1;
	 		$query .= " WHERE ROWNUMBER BETWEEN ".$desde." AND ".$hasta."";
	 	}
	 		$stmt = $dbpw->prepare($query);
	 		$stmt->execute($parameters);
	 		$data = $stmt->fetchAll();
	 		$datos = array();
	 		$datos[1]=count($data);
	 		$datos[0]=array();
	 		$datos[1]=array();
	 		$datos[2]=array();

	 		for($i=0;$i<count($data);$i++){
	 			$datos[2][] = /*$data[$i]['ROWNUMBER'] */$this->clearDummyData($data[$i],100);
	 			$last = $data[$i]["ROWNUMBER"];

	 		}
	 		
	 			if ($cantidad < 100) {
	 				$Cant = $cantidad;
	 			}else{
	 				$Cant = 100;
	 			}


	 			if ($_GET['Next']==0) {
	 				$d = 0; 
	 				$con = 1;
	 			}else{
	 				$d = $_GET['Next']-10;
	 				$con = $_GET['Next']/10;
	 			}

	 			for($i=$d; $i<$Cant+$d; $i=$i+10){
	 			  if ($_GET['Next']==$i) { $activo = 'active';}else{ $activo = '';}
	 			  $datos[1][]=array("Paginas"=>$i,'Nun'=>$con++,"Activo"=>$activo  );
	 			}

	 			if ($cantidad==0) {
	 			   $last= 0;
	 			}

	 			$datos[0]=array("conteo"=>10,"numPages"=>ceil($cantidad/10), "last"=>$last,"Total"=>$cantidad,'lastPage'=>$PagUlt=$cantidad/10);

	 			echo json_encode($datos);
}

//Obtiene la descripcion del tipo de publicacion
function getDesc_Tipo_Publicacion() {
	$query = "SELECT DESC_Tipo_Publicacion FROM TB_Pagina_Tipo_Publicacion WHERE ID_Tipo_Publicacion= :ITP";
	$p = array(":ITP" => $_POST["tipo"]);
	$data = $this->select($query, $p );

	$datos = array();
	$datos[1] = count($data);
	$datos[0] = array();

	if (count($data)!=0) {
      for ($i=0; $i < count($data); $i++) { 
      	$datos[0][$i] = $this->clearDummyData($data[$i],100);
      }
		
	}		
	echo json_encode($datos);
}

//Funcion para cargar la imagen de nueva publicacion digital
 function CargaImgPublicacionDigital() {
 	global $dbpw;
	$dbpw->beginTransaction();

 	$nombreimg = $_POST ['nombreimg'];
 	$tipopublicacion = $_POST ['tipopublicacion'];
 	$desctipo = $_POST ['desctipo'];

 	$nombre_archivo = $_FILES['EscaneoSolicitud']['name']; //Nombre completo con extencion
  	$Nombre_base = substr($nombre_archivo, 0, strripos($nombre_archivo, '.')); // nombre completo sin extencion
    $extencion_archivo = substr($nombre_archivo, strripos($nombre_archivo, '.')); // nombre extencion
    $filesize = $_FILES["EscaneoSolicitud"]["size"]; //Nombre original del pdf
    $tipos_archivos_permitidos = array('.png','.jpeg','.jpg'); //Validacion de tipos de extenciones permitidas
    $nuevo_nombre = $nombreimg . $extencion_archivo; //Nuevo nombre del archivo

    //Validaciones de la carga de documentos
  	if (in_array($extencion_archivo,$tipos_archivos_permitidos)) {
  		//Valida que no se puede subir un mismo tipo de documento con el mismo nombre
		if (file_exists("Documentos/Imagenes/".$desctipo."/".$nuevo_nombre)) {
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


    $dirE = "Documentos/Imagenes/".$desctipo;
  	if (!is_dir($dirE)) {
	    mkdir($dirE, 0777, true);      
  	}

    if(isset($_FILES['EscaneoSolicitud'])) {
       move_uploaded_file($_FILES['EscaneoSolicitud']['tmp_name'], "Documentos/Imagenes/".$desctipo."/".$nuevo_nombre);
    }


    //Creacion de la llave del documento
	$p=array();
	$datai = $this->select("SELECT top 1 * FROM [dbo].[TB_Pagina_Bitacora_Imagenes] ORDER BY [ID] DESC",$p);
	if(count($datai)==0) {
		$idimagen =  "IDI-1";
	}else{
		$rest = substr($datai[0]["ID_Imagen"],4);
	    $idimagen = "IDI-".(intval($rest)+1);
	}

    //Insert a la tabla de bitacora de los documentos
    $q="INSERT INTO [dbo].[TB_Pagina_Bitacora_Imagenes] (ID_Imagen, Nombre_Imagen, Size_Documento, Extencion_Documento, Tipo_Unidad, Posicion_Imagen, Sistema_Usuario, Sistema_Fecha) VALUES(:IDI,:NOM,:TA,:EXT,:TPU,:PIMG,:SU,:SF)";
	$p=array(":IDI"=>$idimagen,":NOM"=>$nuevo_nombre,":TA"=>$result,":EXT"=>$extencion_archivo,":TPU"=>$unidad,":PIMG"=>'',":SU"=>$_SESSION["user_name"],":SF"=>date("Y-m-d H:i:s"));

	// echo json_encode($q);
	// 			echo json_encode($p);
	// 			return;

	if (!$this->insert($q,$p)) {
		echo json_encode(array('result'=> 'Error Insert Bitacora Imagen'));
		$dbpw->rollback();
		return;
	}

    echo json_encode(array('result' => 1,'Nombre'=>$nuevo_nombre,'TBARCHIVO'=>'Noticias','IDI'=>$idimagen,'Tipo'=>$desctipo));
    $dbpw->commit();
}

//Funcin para eliminar la imagen de publicaciones digitales
function EliminarImagenPublicacionDigital(){
	global $dbpw;
	$dbpw->beginTransaction();

	$idimagen = $_POST ['Borrar'];
	$desctipo = $_POST ['desctipo'];
	$nombre_imagen = $_POST ['nombre_imagen'];
	$idpublicacion = $_POST ['idpublicacion'];

	
		//Borramos la imagen seleccionada de la bitacora
		$q = 'DELETE FROM TB_Pagina_Bitacora_Imagenes WHERE ID_Imagen=:IDI';
		$p = array(":IDI"=>$idimagen);

	    if (!$this->insert($q,$p)) {
	    	echo json_encode(array('status'=> 'Error delete bitacora imagen'));
	    	$dbpw->rollback();
	    	return;
	    }

		//Elimina el archivo seleccionado de la carpeta Bitacora
		@unlink("Documentos/Imagenes/".$desctipo."/".$nombre_imagen."");


	echo json_encode(array('status' => 1));
	$dbpw->commit();
}

//Funcion para busqueda de Portadas Informativas
function SearchPortadas(){
  global $dbpw;

  	$CondicionParmetro = $_GET["Tipo"];

  	if ($CondicionParmetro=='Fechas') {
  		$parameters[":IDCOL"] = $_GET["fecha_inicio"];
  		$parameters[":IDCOL1"] = $_GET["fecha_final"];
  		$condicion =" WHERE ((CONVERT(DATE,Fecha_Publicacion_Normal) BETWEEN :IDCOL AND :IDCOL1) AND ID_Tipo_Publicacion='ITP-4')";
  	}else {
  		$parameters[":IDCOL"] = "%".$_GET["col_name"]."%";
  		$condicion =" WHERE (ID_Publicacion LIKE :IDCOL AND ID_Tipo_Publicacion='ITP-4')";
  	}
	$query= "SELECT * FROM ( SELECT *, ROW_NUMBER() OVER(ORDER BY ID DESC )ROWNUMBER FROM IHTT_PAGINA_WEB.dbo.v_Pagina_Publicaciones";
	$query .= $condicion. ") AS TABLAFILTRO";

 	    $Total = "SELECT count(*) as cantidad FROM IHTT_PAGINA_WEB.dbo.v_Pagina_Publicaciones";
 	    $Total .= $condicion;
 	    $stmt = $dbpw->prepare($Total);
 		$stmt->execute($parameters);
 		$data1 = $stmt->fetchAll();
 		$cantidad = $data1[0]["cantidad"];

	 	if (isset($_GET['Next'])){
	 		$hasta = $_GET['Next']+10;
	 		$desde = $_GET['Next']+1;
	 		$query .= " WHERE ROWNUMBER BETWEEN ".$desde." AND ".$hasta."";
	 	}
	 		$stmt = $dbpw->prepare($query);
	 		$stmt->execute($parameters);
	 		$data = $stmt->fetchAll();
	 		$datos = array();
	 		$datos[1]=count($data);
	 		$datos[0]=array();
	 		$datos[1]=array();
	 		$datos[2]=array();

	 		for($i=0;$i<count($data);$i++){
	 			$datos[2][] = /*$data[$i]['ROWNUMBER'] */$this->clearDummyData($data[$i],100);
	 			$last = $data[$i]["ROWNUMBER"];

	 		}
	 		
	 			if ($cantidad < 100) {
	 				$Cant = $cantidad;
	 			}else{
	 				$Cant = 100;
	 			}


	 			if ($_GET['Next']==0) {
	 				$d = 0; 
	 				$con = 1;
	 			}else{
	 				$d = $_GET['Next']-10;
	 				$con = $_GET['Next']/10;
	 			}

	 			for($i=$d; $i<$Cant+$d; $i=$i+10){
	 			  if ($_GET['Next']==$i) { $activo = 'active';}else{ $activo = '';}
	 			  $datos[1][]=array("Paginas"=>$i,'Nun'=>$con++,"Activo"=>$activo  );
	 			}

	 			if ($cantidad==0) {
	 			   $last= 0;
	 			}

	 			$datos[0]=array("conteo"=>10,"numPages"=>ceil($cantidad/10), "last"=>$last,"Total"=>$cantidad,'lastPage'=>$PagUlt=$cantidad/10);

	 			echo json_encode($datos);
}

//Funcion para busqueda de Comunicados
function SearchComunicados(){
  global $dbpw;

  	$CondicionParmetro = $_GET["Tipo"];

  	if ($CondicionParmetro=='Fechas') {
  		$parameters[":IDCOL"] = $_GET["fecha_inicio"];
  		$parameters[":IDCOL1"] = $_GET["fecha_final"];
  		$condicion =" WHERE ((CONVERT(DATE,Fecha_Publicacion_Normal) BETWEEN :IDCOL AND :IDCOL1) AND ID_Tipo_Publicacion='ITP-2')";
  	}else {
  		$parameters[":IDCOL"] = "%".$_GET["col_name"]."%";
  		$condicion =" WHERE (ID_Publicacion LIKE :IDCOL AND ID_Tipo_Publicacion='ITP-2')";
  	}
	$query= "SELECT * FROM ( SELECT *, ROW_NUMBER() OVER(ORDER BY ID DESC )ROWNUMBER FROM IHTT_PAGINA_WEB.dbo.v_Pagina_Publicaciones";
	$query .= $condicion. ") AS TABLAFILTRO";

 	    $Total = "SELECT count(*) as cantidad FROM IHTT_PAGINA_WEB.dbo.v_Pagina_Publicaciones";
 	    $Total .= $condicion;
 	    $stmt = $dbpw->prepare($Total);
 		$stmt->execute($parameters);
 		$data1 = $stmt->fetchAll();
 		$cantidad = $data1[0]["cantidad"];

	 	if (isset($_GET['Next'])){
	 		$hasta = $_GET['Next']+9;
	 		$desde = $_GET['Next']+1;
	 		$query .= " WHERE ROWNUMBER BETWEEN ".$desde." AND ".$hasta."";
	 	}
	 		$stmt = $dbpw->prepare($query);
	 		$stmt->execute($parameters);
	 		$data = $stmt->fetchAll();
	 		$datos = array();
	 		$datos[1]=count($data);
	 		$datos[0]=array();
	 		$datos[1]=array();
	 		$datos[2]=array();

	 		for($i=0;$i<count($data);$i++){
	 			$datos[2][] = /*$data[$i]['ROWNUMBER'] */$this->clearDummyData($data[$i],100);
	 			$last = $data[$i]["ROWNUMBER"];

	 		}
	 		
	 			if ($cantidad < 100) {
	 				$Cant = $cantidad;
	 			}else{
	 				$Cant = 100;
	 			}


	 			if ($_GET['Next']==0) {
	 				$d = 0; 
	 				$con = 1;
	 			}else{
	 				$d = $_GET['Next']-9;
	 				$con = $_GET['Next']/9;
	 			}

	 			for($i=$d; $i<$Cant+$d; $i=$i+9){
	 			  if ($_GET['Next']==$i) { $activo = 'active';}else{ $activo = '';}
	 			  $datos[1][]=array("Paginas"=>$i,'Nun'=>$con++,"Activo"=>$activo  );
	 			}

	 			if ($cantidad==0) {
	 			   $last= 0;
	 			}

	 			$datos[0]=array("conteo"=>10,"numPages"=>ceil($cantidad/10), "last"=>$last,"Total"=>$cantidad,'lastPage'=>$PagUlt=$cantidad/9);

	 			echo json_encode($datos);
}

//Funcion para busqueda de Campañas
function SearchCampañas(){
  global $dbpw;

  	$CondicionParmetro = $_GET["Tipo"];

  	if ($CondicionParmetro=='Fechas') {
  		$parameters[":IDCOL"] = $_GET["fecha_inicio"];
  		$parameters[":IDCOL1"] = $_GET["fecha_final"];
  		$condicion =" WHERE ((CONVERT(DATE,Fecha_Publicacion_Normal) BETWEEN :IDCOL AND :IDCOL1) AND ID_Tipo_Publicacion='ITP-3')";
  	}else {
  		$parameters[":IDCOL"] = "%".$_GET["col_name"]."%";
  		$condicion =" WHERE (ID_Publicacion LIKE :IDCOL AND ID_Tipo_Publicacion='ITP-3')";
  	}
	$query= "SELECT * FROM ( SELECT *, ROW_NUMBER() OVER(ORDER BY ID DESC )ROWNUMBER FROM IHTT_PAGINA_WEB.dbo.v_Pagina_Publicaciones";
	$query .= $condicion. ") AS TABLAFILTRO";

 	    $Total = "SELECT count(*) as cantidad FROM IHTT_PAGINA_WEB.dbo.v_Pagina_Publicaciones";
 	    $Total .= $condicion;
 	    $stmt = $dbpw->prepare($Total);
 		$stmt->execute($parameters);
 		$data1 = $stmt->fetchAll();
 		$cantidad = $data1[0]["cantidad"];

	 	if (isset($_GET['Next'])){
	 		$hasta = $_GET['Next']+10;
	 		$desde = $_GET['Next']+1;
	 		$query .= " WHERE ROWNUMBER BETWEEN ".$desde." AND ".$hasta."";
	 	}
	 		$stmt = $dbpw->prepare($query);
	 		$stmt->execute($parameters);
	 		$data = $stmt->fetchAll();
	 		$datos = array();
	 		$datos[1]=count($data);
	 		$datos[0]=array();
	 		$datos[1]=array();
	 		$datos[2]=array();

	 		for($i=0;$i<count($data);$i++){
	 			$datos[2][] = /*$data[$i]['ROWNUMBER'] */$this->clearDummyData($data[$i],100);
	 			$last = $data[$i]["ROWNUMBER"];

	 		}
	 		
	 			if ($cantidad < 100) {
	 				$Cant = $cantidad;
	 			}else{
	 				$Cant = 100;
	 			}


	 			if ($_GET['Next']==0) {
	 				$d = 0; 
	 				$con = 1;
	 			}else{
	 				$d = $_GET['Next']-10;
	 				$con = $_GET['Next']/10;
	 			}

	 			for($i=$d; $i<$Cant+$d; $i=$i+10){
	 			  if ($_GET['Next']==$i) { $activo = 'active';}else{ $activo = '';}
	 			  $datos[1][]=array("Paginas"=>$i,'Nun'=>$con++,"Activo"=>$activo  );
	 			}

	 			if ($cantidad==0) {
	 			   $last= 0;
	 			}

	 			$datos[0]=array("conteo"=>10,"numPages"=>ceil($cantidad/10), "last"=>$last,"Total"=>$cantidad,'lastPage'=>$PagUlt=$cantidad/10);

	 			echo json_encode($datos);
}

//Funcion para busqueda de Boletines
function SearchBoletines(){
  global $dbpw;

  	$CondicionParmetro = $_GET["Tipo"];

  	if ($CondicionParmetro=='Fechas') {
  		$parameters[":IDCOL"] = $_GET["fecha_inicio"];
  		$parameters[":IDCOL1"] = $_GET["fecha_final"];
  		$condicion =" WHERE ((CONVERT(DATE,Fecha_Publicacion_Normal) BETWEEN :IDCOL AND :IDCOL1) AND ID_Tipo_Publicacion='ITP-1')";
  	}else {
  		$parameters[":IDCOL"] = "%".$_GET["col_name"]."%";
  		$condicion =" WHERE (ID_Publicacion LIKE :IDCOL AND ID_Tipo_Publicacion='ITP-1')";
  	}
	$query= "SELECT * FROM ( SELECT *, ROW_NUMBER() OVER(ORDER BY ID DESC )ROWNUMBER FROM IHTT_PAGINA_WEB.dbo.v_Pagina_Publicaciones";
	$query .= $condicion. ") AS TABLAFILTRO";

 	    $Total = "SELECT count(*) as cantidad FROM IHTT_PAGINA_WEB.dbo.v_Pagina_Publicaciones";
 	    $Total .= $condicion;
 	    $stmt = $dbpw->prepare($Total);
 		$stmt->execute($parameters);
 		$data1 = $stmt->fetchAll();
 		$cantidad = $data1[0]["cantidad"];

	 	if (isset($_GET['Next'])){
	 		$hasta = $_GET['Next']+9;
	 		$desde = $_GET['Next']+1;
	 		$query .= " WHERE ROWNUMBER BETWEEN ".$desde." AND ".$hasta."";
	 	}
	 		$stmt = $dbpw->prepare($query);
	 		$stmt->execute($parameters);
	 		$data = $stmt->fetchAll();
	 		$datos = array();
	 		$datos[1]=count($data);
	 		$datos[0]=array();
	 		$datos[1]=array();
	 		$datos[2]=array();

	 		for($i=0;$i<count($data);$i++){
	 			$datos[2][] = /*$data[$i]['ROWNUMBER'] */$this->clearDummyData($data[$i],100);
	 			$last = $data[$i]["ROWNUMBER"];

	 		}
	 		
	 			if ($cantidad < 100) {
	 				$Cant = $cantidad;
	 			}else{
	 				$Cant = 100;
	 			}


	 			if ($_GET['Next']==0) {
	 				$d = 0; 
	 				$con = 1;
	 			}else{
	 				$d = $_GET['Next']-9;
	 				$con = $_GET['Next']/9;
	 			}

	 			for($i=$d; $i<$Cant+$d; $i=$i+9){
	 			  if ($_GET['Next']==$i) { $activo = 'active';}else{ $activo = '';}
	 			  $datos[1][]=array("Paginas"=>$i,'Nun'=>$con++,"Activo"=>$activo  );
	 			}

	 			if ($cantidad==0) {
	 			   $last= 0;
	 			}

	 			$datos[0]=array("conteo"=>9,"numPages"=>ceil($cantidad/9), "last"=>$last,"Total"=>$cantidad,'lastPage'=>$PagUlt=$cantidad/10);

	 			echo json_encode($datos);
}

//Funcion para cargar la imagen de nueva publicacion digital
 function CargaImgSlider() {
 	global $dbpw;
	$dbpw->beginTransaction();

 	$nombreimg = $_POST ['nombreimg'];

 	$nombre_archivo = $_FILES['EscaneoSolicitud']['name']; //Nombre completo con extencion
  	$Nombre_base = substr($nombre_archivo, 0, strripos($nombre_archivo, '.')); // nombre completo sin extencion
    $extencion_archivo = substr($nombre_archivo, strripos($nombre_archivo, '.')); // nombre extencion
    $filesize = $_FILES["EscaneoSolicitud"]["size"]; //Nombre original del pdf
    $tipos_archivos_permitidos = array('.png','.jpeg','.jpg'); //Validacion de tipos de extenciones permitidas
    $nuevo_nombre = $nombreimg . $extencion_archivo; //Nuevo nombre del archivo

    //Validaciones de la carga de documentos
  	if (in_array($extencion_archivo,$tipos_archivos_permitidos)) {
  		//Valida que no se puede subir un mismo tipo de documento con el mismo nombre
		if (file_exists("Documentos/Imagenes/Slider/".$nuevo_nombre)) {
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

    $dirE = "Documentos/Imagenes/Slider";
  	if (!is_dir($dirE)) {
	    mkdir($dirE, 0777, true);      
  	}

    if(isset($_FILES['EscaneoSolicitud'])) {
       move_uploaded_file($_FILES['EscaneoSolicitud']['tmp_name'], "Documentos/Imagenes/Slider/".$nuevo_nombre);
    }

    //Insert a la tabla de bitacora de los documentos
    $q="INSERT INTO [dbo].[TB_Pagina_Imagenes_Slider] (Nombre_Imagen, Size_Documento, Extencion_Documento, Sistema_Usuario, Sistema_Fecha) VALUES(:NOM,:TA,:EXT,:SU,:SF)";
	$p=array(":NOM"=>$nuevo_nombre,":TA"=>$result,":EXT"=>$extencion_archivo,":SU"=>$_SESSION["user_name"],":SF"=>date("Y-m-d H:i:s"));

	// echo json_encode($q);
	// 			echo json_encode($p);
	// 			return;

	if (!$this->insert($q,$p)) {
		echo json_encode(array('result'=> 'Error Insert Imagen slider Imagen'));
		$dbpw->rollback();
		return;
	}

    echo json_encode(array('result' => 1,'Nombre'=>$nuevo_nombre,'TBARCHIVO'=>'Noticias'));
    $dbpw->commit();
}

//Funcin para eliminar la imagen del slider
function EliminarImagenSlider(){
	global $dbpw;
	$dbpw->beginTransaction();

	$nombre_imagen = $_POST ['nombre_imagen'];

	//Borramos la imagen seleccionada de la bitacora
	$q = 'DELETE FROM TB_Pagina_Imagenes_Slider WHERE Nombre_Imagen =:NOM';
	$p = array(":NOM"=>$nombre_imagen);

    if (!$this->insert($q,$p)) {
    	echo json_encode(array('status'=> 'Error delete bitacora imagen'));
    	$dbpw->rollback();
    	return;
    }

	//Elimina el archivo seleccionado de la carpeta Bitacora
	@unlink("Documentos/Imagenes/Slider/".$nombre_imagen."");

	echo json_encode(array('status' => 1));
	$dbpw->commit();
}

//Funcion para busqueda de validaicon ip
function SearchImagenesSlider(){
  global $dbpw;

  	$parameters[":IDCOL"] = "%".$_GET["col_name"]."%";

  	$condicion =" WHERE (ID LIKE :IDCOL)";

	$query= "SELECT * FROM ( SELECT *, ROW_NUMBER() OVER(ORDER BY ID ASC )ROWNUMBER FROM IHTT_PAGINA_WEB.dbo.TB_Pagina_Imagenes_Slider";
	$query .= $condicion. ") AS TABLAFILTRO";

 	    $Total = "SELECT count(*) as cantidad FROM IHTT_PAGINA_WEB.dbo.TB_Pagina_Imagenes_Slider";
 	    $Total .= $condicion;
 	    $stmt = $dbpw->prepare($Total);
 		$stmt->execute($parameters);
 		$data1 = $stmt->fetchAll();
 		$cantidad = $data1[0]["cantidad"];

	 	if (isset($_GET['Next'])){
	 		$hasta = $_GET['Next']+10;
	 		$desde = $_GET['Next']+1;
	 		$query .= " WHERE ROWNUMBER BETWEEN ".$desde." AND ".$hasta."";
	 	}
	 		$stmt = $dbpw->prepare($query);
	 		$stmt->execute($parameters);
	 		$data = $stmt->fetchAll();
	 		$datos = array();
	 		$datos[1]=count($data);
	 		$datos[0]=array();
	 		$datos[1]=array();
	 		$datos[2]=array();

	 		for($i=0;$i<count($data);$i++){
	 			$datos[2][] = /*$data[$i]['ROWNUMBER'] */$this->clearDummyData($data[$i],100);
	 			$last = $data[$i]["ROWNUMBER"];

	 		}
	 		
	 			if ($cantidad < 100) {
	 				$Cant = $cantidad;
	 			}else{
	 				$Cant = 100;
	 			}


	 			if ($_GET['Next']==0) {
	 				$d = 0; 
	 				$con = 1;
	 			}else{
	 				$d = $_GET['Next']-10;
	 				$con = $_GET['Next']/10;
	 			}

	 			for($i=$d; $i<$Cant+$d; $i=$i+10){
	 			  if ($_GET['Next']==$i) { $activo = 'active';}else{ $activo = '';}
	 			  $datos[1][]=array("Paginas"=>$i,'Nun'=>$con++,"Activo"=>$activo  );
	 			}

	 			if ($cantidad==0) {
	 			   $last= 0;
	 			}

	 			$datos[0]=array("conteo"=>10,"numPages"=>ceil($cantidad/10), "last"=>$last,"Total"=>$cantidad,'lastPage'=>$PagUlt=$cantidad/10);

	 			echo json_encode($datos);
}

function clearDummyData($data, $number){
	for($i=0;$i<$number;$i++){
		unset($data[$i]);
	}
	return $data;
}


function select($q,$p) {
	global $dbpw;
	$stmt = $dbpw->prepare($q);
	$stmt->execute( $p ) or die(print_r($stmt->errorInfo(), true));
	$datos = $stmt->fetchAll();
	return $datos;
}

function insert($q, $p) {
	global $dbpw;
	$stmt = $dbpw->prepare($q);
	return $stmt->execute($p);
}


}

$api = new Api_PW();



?>
