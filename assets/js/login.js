$(document).ready(function(){
	 checkSession();
	// $("#btnIngresar").click(function(){
	// 	$(this).hide();
	// 	doLogin();
	// })
});

//EL LOGIN DEBE ENVIARSE EL APPID, el ID del MODULO, ACCION, el nombre y el password
//Se guarda en local storage el session_key y el usuario

function doLogin(){
	
	$("#spinnerLogin").show();
	var parameter = "";
	console.log("api_login.php?action=do-login-web"+parameter);
	console.log( {appid : "89b473b3ea9d5b6719c8ee8ce0c247d5", "modulo":modulo, action:"do-login-web", "nombre": $("#nombre").val(), "password":$("#password").val()});
	$.ajax({
		dataType:"json",
		timeout:10000,
		method:'POST',
		data: {appid : "89b473b3ea9d5b6719c8ee8ce0c247d5", "modulo":modulo, action:"do-login-web", "nombre": $("#nombre").val(), "password":$("#password").val()},
		url:"api_login.php", 
		success:function( dataserver ) {
			$("#spinnerLogin").hide();
			$("#btnIngresar").show();
			console.log(dataserver)
			console.log(dataserver[0].result=="1" +""+ checkRol(dataserver[1].roles));
			if(dataserver[0].result=="1" && checkRol(dataserver[1].roles)){
				
				cookiesession("usuario",dataserver[1].usuario);
				cookiesession("session_key", dataserver[1].session_key);
				window.location.href="index.php";
			} else {
				var n = noty({ text : 'Error en autenticación, es posible que no tenga los permisos necesarios para acceder a este sistema o el usuario y/o contraseña sean incorrectos.', type : 'error', dismissQueue: true, closeWith : ['click', 'backdrop'], modal : true, layout : 'top', theme : 'defaultTheme', maxVisible : 10 });
			}
		}
	}).error(function(jqXHR, textStatus){
		console.log("error->"+JSON.stringify(jqXHR));
		$("#result").html('<tr> <td colspan="6" class="red-text"  style="text-align:center">OCURRIO UN ERROR DURANTE LA BUSQUEDA, POR FAVOR INTENTA NUEVAMENTE.</td></tr>');
	});
}

function checkSession() {
	if( obtenerCookie('usuario') !== null && obtenerCookie("usuario") !== '0' ){

		$("#btnIngresar").hide();
		$("#spinnerLogin").show();
		$.ajax({
			dataType:"json",
			timeout:10000,
			method:'POST',
			data: {appid : "89b473b3ea9d5b6719c8ee8ce0c247d5", "modulo":modulo, action:"check-login-web", "nombre": obtenerCookie("usuario"), session_key: obtenerCookie("session_key") },
			url:"api_login.php", 
			success:function( dataserver ) {
				if(dataserver[0].result=="1" && checkRol(dataserver[1].roles)){
					
					cookiesession("usuario",dataserver[1].usuario);
					cookiesession("session_key", dataserver[1].session_key);
					window.location.href="index.php";
				} else {
					$("#spinnerLogin").hide();
					$("#btnIngresar").show();
				}
			}
		}).error(function(){
			console.log("error");
					$("#spinnerLogin").hide();
					$("#btnIngresar").show();
		});
	}
}

function checkRol(r){
	var roles = r;
	for(var i=0;i<roles.length;i++){
		if(roles[i].modulo==modulo){
			return true;
		}
	}
	return false;
}

function setVar(name, data){
	window.localStorage.setItem(name, data);
}

function getVar(name){
	return window.localStorage.getItem(name);
}

function removeVars(){
	window.localStorage.removeItem("usuario");
	window.localStorage.removeItem("session_key");
}