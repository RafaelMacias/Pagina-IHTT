<?php
session_start();
header('Access-Control-Allow-Origin: *');
date_default_timezone_set("America/Tegucigalpa");
require_once("config/conexion_usuarios.php");
require_once("global_functions.php");

class login{
  private $info;
  private $script = "";
  private $modulo=2;
  function login(){
    global $dbu;
    if(isset($_GET['logout'])){
      session_destroy();
      //return;
    }
    if( isset($_SESSION['usuario']) && isset($_SESSION["roles"][$this->modulo]) ) {
      $gf = new global_functions($dbu);
      $gf->saveEvent("Login",$_SESSION["user_name"],$this->modulo);
      header("Location: index.php");
    }
    if (isset ($_GET ['error'])){
        $error = $_GET['error'];
        if ($error  == 'login'){
        $this->script .="$(document).ready(function(e) { var n = noty({ text : 'Usted A ingresado Incorrectamente Su Nombre de Usuario o Contraseña', type : 'error', dismissQueue: true, closeWith : ['click', 'backdrop'], modal : true, layout : 'top', theme : 'defaultTheme', maxVisible : 10 }); });";
        }
    }

    $this->printHTML();
  }

  function printHTML(){
    $file = file_get_contents("template/login.html");

   $file = str_replace("@@SCRIPT@@", $this->script, $file);
    echo $file;
  }

}

$l = new login();

?>
