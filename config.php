<?php 
	
	/*DEFINICION DE VARIABLES
	1). header = modifica el header de la pagina
	2). eliminar = variable del boton de eliminar dentro del dropdown de la pagina de Listado_Noticias.php
	3). Dpublicacion = varibale del boton de eliminar dentro de la pagina de Nueva_Publicacion.php
	  a). $Epublicacion = variable del boton de enviar correo.
	4)admin = varible la cual se utiliza para validar el boton de eliminar en Centro de Documentos, siendo 1 administrador y 0 usuario.
	*/
	
	if($_SESSION["roles"][$this->modulo]==1 ) {
		$header = preg_replace('{{ENCARGADO}}',file_get_contents("template/Menu_Administrador.html"),$header);
		/* 2). Variables Listado_Noticias.php*/
		$eliminar = '<button class="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span class="icon icon-sm"><span class="fas fa-ellipsis-h icon-secondary"></span> </span><span class="sr-only">Toggle Dropdown</span> </button>';
		/* 3). Variable Nueva_Publicacion.php*/
		$Dpublicacion = '<div id="valchecksi" class="text-center border-top border-bottom border-light my-6 py-6"> <h4 class="h4 mb-5"><span class="mr-1"><i class="fas fa-exclamation-circle"></i></span> ¡Puedes eliminar la publicación si no la encuentras de tu gusto!</h4> <button id="btnborrar" onclick="confirmarEliminar()" type="button" class="btn btn-danger animate-down-2"> <span class="mr-2"><i class="far fa-trash-alt"></i></span>Eliminar</button> </div>';
		$modtitulo = 'class="fas fa-edit mr-2 edit-icon" onclick="modificarTitulo();"';
		$modfecha = 'class="fas fa-edit mr-2 edit-icon-2" onclick="modificarFecha();"';
		$Epublicacion ='';
		$admin = 1;

	}else {
		$header = preg_replace('{{ENCARGADO}}',file_get_contents("template/Menu_Normal.html"),$header);
		/* 2). Variables Listado_Noticias.php
		$eliminar = '';
		/* 3) .Variable Nueva_Publicacion.php*/
		$Dpublicacion = '<div id="valchecksi" class="text-center border-top border-bottom border-light my-6 py-6"> <h4 class="h4 mb-5"><span class="mr-1"><i class="far fa-newspaper" style="color: #9e9e9e;"></i></span> ¿Te resultó útil este artículo?</h4> <button id="btnsi" onclick="opinionSi()" type="button" class="btn btn-success mr-sm-3 animate-up-2"> <span class="mr-2"><i class="far fa-thumbs-up"></i></span>Si, gracias!</button> <button id="btnno" onclick="opinionNo()" type="button" class="btn btn-danger animate-down-2"> <span class="mr-2"><i class="far fa-thumbs-down"></i></span>Realmento no</button> </div>';
		$modtitulo = '';
		$Epublicacion ='<a class="btn btn-sm btn-outline-primary" data-toggle="modal" data-target="#modal-form">Enviar correo <span class="fas fa-paper-plane ml-2"></span></a>';
		$admin = 0;
	}

 ?>