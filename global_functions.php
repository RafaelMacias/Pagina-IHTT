<?php

Class global_functions{
	private $dbu;
	function global_functions($db){
		$this->dbu = $db;
	}
	function saveEvent($event, $user, $module){
		$this->dbu->beginTransaction();
		$stmt = $this->dbu->prepare("INSERT INTO TB_Actividad_Usuario(ID_Actividad,Fecha_Actividad,DESC_Actividad, Usuario_Nombre, ID_Modulo, SistemaUsuario) VALUES( ((SELECT MAX(TBAU.ID_Actividad) FROM TB_Actividad_Usuario AS TBAU)+1), :FECHA, :EVENT, :USER,:MODULE, :SU)");
		$stmt->execute( array(":FECHA"=>date("Y-m-d H:i:s"), ":EVENT"=>$event, ":USER"=>$user, ":MODULE"=>$module, ":SU"=>$_SESSION["user_name"]) );
		$this->dbu->commit();
	}
}

?>
