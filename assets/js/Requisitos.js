$(document).ready(function(){
Requisitos();

});

//Validacion pestañas carpetas
//Validacion tarjeta buscar
function Buscar() {
  //Validaciones acuerdos
  $("#acuerdo").removeClass('active'); 
  $("#acufolder").removeClass('fas fa-folder-open');
  $("#acufolder").addClass('fas fa-folder'); 
  //Validaciones boletines
  $("#boletines").removeClass('active');
  $("#bolfolder").removeClass('fas fa-folder-open'); 
  $("#bolfolder").addClass('fas fa-folder');
  //Validaciones comunicados
  $("#comunicados").removeClass('active');
  $("#comfolder").removeClass('fas fa-folder-open'); 
  $("#comfolder").addClass('fas fa-folder');
  //Validaciones contrato
  $("#contrato").removeClass('active');
  $("#confolder").removeClass('fas fa-folder-open'); 
  $("#confolder").addClass('fas fa-folder');
  //Validaciones decretos
  $("#decretos").removeClass('active');
  $("#decfolder").removeClass('fas fa-folder-open'); 
  $("#decfolder").addClass('fas fa-folder');
  //Guias
  $("#guias").removeClass('active');
  $("#guifolder").removeClass('fas fa-folder-open'); 
  $("#guifolder").addClass('fas fa-folder');
  //Manuales
  $("#manuales").removeClass('active'); 
  $("#manfolder").removeClass('fas fa-folder-open');
  $("#manfolder").addClass('fas fa-folder');
   //Normativas
  $("#normativas").removeClass('active'); 
  $("#norfolder").removeClass('fas fa-folder-open');
  $("#norfolder").addClass('fas fa-folder');
  //ORP-IHTT
  $("#orpihtt").removeClass('active'); 
  $("#orpfolder").removeClass('fas fa-folder-open');
  $("#orpfolder").addClass('fas fa-folder');
  //Requistos
  $("#requisitos").removeClass('active'); 
  $("#reqfolder").removeClass('fas fa-folder-open');
  $("#reqfolder").addClass('fas fa-folder');

  $("#tarconsulta").show();
  $("#tarcarpetas").hide();
  
}
//Validacion tarjeta de documentos word
function Word() {
  //Validaciones acuerdos
  $("#acuerdo").removeClass('active'); 
  $("#acufolder").removeClass('fas fa-folder-open');
  $("#acufolder").addClass('fas fa-folder'); 
  //Validaciones boletines
  $("#boletines").removeClass('active');
  $("#bolfolder").removeClass('fas fa-folder-open'); 
  $("#bolfolder").addClass('fas fa-folder');
  //Validaciones comunicados
  $("#comunicados").removeClass('active');
  $("#comfolder").removeClass('fas fa-folder-open'); 
  $("#comfolder").addClass('fas fa-folder');
  //Validaciones contrato
  $("#contrato").removeClass('active');
  $("#confolder").removeClass('fas fa-folder-open'); 
  $("#confolder").addClass('fas fa-folder');
  //Validaciones decretos
  $("#decretos").removeClass('active');
  $("#decfolder").removeClass('fas fa-folder-open'); 
  $("#decfolder").addClass('fas fa-folder');
  //Guias
  $("#guias").removeClass('active');
  $("#guifolder").removeClass('fas fa-folder-open'); 
  $("#guifolder").addClass('fas fa-folder');
  //Manuales
  $("#manuales").removeClass('active'); 
  $("#manfolder").removeClass('fas fa-folder-open');
  $("#manfolder").addClass('fas fa-folder');
   //Normativas
  $("#normativas").removeClass('active'); 
  $("#norfolder").removeClass('fas fa-folder-open');
  $("#norfolder").addClass('fas fa-folder');
  //ORP-IHTT
  $("#orpihtt").removeClass('active'); 
  $("#orpfolder").removeClass('fas fa-folder-open');
  $("#orpfolder").addClass('fas fa-folder');
  //Requistos
  $("#requisitos").removeClass('active'); 
  $("#reqfolder").removeClass('fas fa-folder-open');
  $("#reqfolder").addClass('fas fa-folder');

  $("#tarconsulta").hide();
  getTipoDocumentos('.docx');
  
}

//Validacion tarjeta de documentos excel
function Excel() {
  //Validaciones acuerdos
  $("#acuerdo").removeClass('active'); 
  $("#acufolder").removeClass('fas fa-folder-open');
  $("#acufolder").addClass('fas fa-folder'); 
  //Validaciones boletines
  $("#boletines").removeClass('active');
  $("#bolfolder").removeClass('fas fa-folder-open'); 
  $("#bolfolder").addClass('fas fa-folder');
  //Validaciones comunicados
  $("#comunicados").removeClass('active');
  $("#comfolder").removeClass('fas fa-folder-open'); 
  $("#comfolder").addClass('fas fa-folder');
  //Validaciones contrato
  $("#contrato").removeClass('active');
  $("#confolder").removeClass('fas fa-folder-open'); 
  $("#confolder").addClass('fas fa-folder');
  //Validaciones decretos
  $("#decretos").removeClass('active');
  $("#decfolder").removeClass('fas fa-folder-open'); 
  $("#decfolder").addClass('fas fa-folder');
  //Guias
  $("#guias").removeClass('active');
  $("#guifolder").removeClass('fas fa-folder-open'); 
  $("#guifolder").addClass('fas fa-folder');
  //Manuales
  $("#manuales").removeClass('active'); 
  $("#manfolder").removeClass('fas fa-folder-open');
  $("#manfolder").addClass('fas fa-folder');
   //Normativas
  $("#normativas").removeClass('active'); 
  $("#norfolder").removeClass('fas fa-folder-open');
  $("#norfolder").addClass('fas fa-folder');
  //ORP-IHTT
  $("#orpihtt").removeClass('active'); 
  $("#orpfolder").removeClass('fas fa-folder-open');
  $("#orpfolder").addClass('fas fa-folder');
  //Requistos
  $("#requisitos").removeClass('active'); 
  $("#reqfolder").removeClass('fas fa-folder-open');
  $("#reqfolder").addClass('fas fa-folder');

  $("#tarconsulta").hide();
  getTipoDocumentos('.xlsx');
  
}

//Validacion tarjeta de documentos PDF
function PDF() {
  //Validaciones acuerdos
  $("#acuerdo").removeClass('active'); 
  $("#acufolder").removeClass('fas fa-folder-open');
  $("#acufolder").addClass('fas fa-folder'); 
  //Validaciones boletines
  $("#boletines").removeClass('active');
  $("#bolfolder").removeClass('fas fa-folder-open'); 
  $("#bolfolder").addClass('fas fa-folder');
  //Validaciones comunicados
  $("#comunicados").removeClass('active');
  $("#comfolder").removeClass('fas fa-folder-open'); 
  $("#comfolder").addClass('fas fa-folder');
  //Validaciones contrato
  $("#contrato").removeClass('active');
  $("#confolder").removeClass('fas fa-folder-open'); 
  $("#confolder").addClass('fas fa-folder');
  //Validaciones decretos
  $("#decretos").removeClass('active');
  $("#decfolder").removeClass('fas fa-folder-open'); 
  $("#decfolder").addClass('fas fa-folder');
  //Guias
  $("#guias").removeClass('active');
  $("#guifolder").removeClass('fas fa-folder-open'); 
  $("#guifolder").addClass('fas fa-folder');
  //Manuales
  $("#manuales").removeClass('active'); 
  $("#manfolder").removeClass('fas fa-folder-open');
  $("#manfolder").addClass('fas fa-folder');
   //Normativas
  $("#normativas").removeClass('active'); 
  $("#norfolder").removeClass('fas fa-folder-open');
  $("#norfolder").addClass('fas fa-folder');
  //ORP-IHTT
  $("#orpihtt").removeClass('active'); 
  $("#orpfolder").removeClass('fas fa-folder-open');
  $("#orpfolder").addClass('fas fa-folder');
  //Requistos
  $("#requisitos").removeClass('active'); 
  $("#reqfolder").removeClass('fas fa-folder-open');
  $("#reqfolder").addClass('fas fa-folder');

  $("#tarconsulta").hide();
  getTipoDocumentos('.pdf');
  
}

//Validacion tarjeta de documentos archivos texto
function Archivos_Texto() {
  //Validaciones acuerdos
  $("#acuerdo").removeClass('active'); 
  $("#acufolder").removeClass('fas fa-folder-open');
  $("#acufolder").addClass('fas fa-folder'); 
  //Validaciones boletines
  $("#boletines").removeClass('active');
  $("#bolfolder").removeClass('fas fa-folder-open'); 
  $("#bolfolder").addClass('fas fa-folder');
  //Validaciones comunicados
  $("#comunicados").removeClass('active');
  $("#comfolder").removeClass('fas fa-folder-open'); 
  $("#comfolder").addClass('fas fa-folder');
  //Validaciones contrato
  $("#contrato").removeClass('active');
  $("#confolder").removeClass('fas fa-folder-open'); 
  $("#confolder").addClass('fas fa-folder');
  //Validaciones decretos
  $("#decretos").removeClass('active');
  $("#decfolder").removeClass('fas fa-folder-open'); 
  $("#decfolder").addClass('fas fa-folder');
  //Guias
  $("#guias").removeClass('active');
  $("#guifolder").removeClass('fas fa-folder-open'); 
  $("#guifolder").addClass('fas fa-folder');
  //Manuales
  $("#manuales").removeClass('active'); 
  $("#manfolder").removeClass('fas fa-folder-open');
  $("#manfolder").addClass('fas fa-folder');
   //Normativas
  $("#normativas").removeClass('active'); 
  $("#norfolder").removeClass('fas fa-folder-open');
  $("#norfolder").addClass('fas fa-folder');
  //ORP-IHTT
  $("#orpihtt").removeClass('active'); 
  $("#orpfolder").removeClass('fas fa-folder-open');
  $("#orpfolder").addClass('fas fa-folder');
  //Requistos
  $("#requisitos").removeClass('active'); 
  $("#reqfolder").removeClass('fas fa-folder-open');
  $("#reqfolder").addClass('fas fa-folder');

  $("#tarconsulta").hide();
  getTipoDocumentos('.rtf');
  
}
//Validacion documentos Acuerdo
function Acuerdo() {
  //Validaciones boletines
  $("#boletines").removeClass('active');
  $("#bolfolder").removeClass('fas fa-folder-open'); 
  $("#bolfolder").addClass('fas fa-folder'); 
  //Validaciones comunicados
  $("#comunicados").removeClass('active');
  $("#comfolder").removeClass('fas fa-folder-open'); 
  $("#comfolder").addClass('fas fa-folder'); 
  //Validaciones contrato
  $("#contrato").removeClass('active');
  $("#confolder").removeClass('fas fa-folder-open'); 
  $("#confolder").addClass('fas fa-folder');
  //Validaciones decretos
  $("#decretos").removeClass('active');
  $("#decfolder").removeClass('fas fa-folder-open'); 
  $("#decfolder").addClass('fas fa-folder');
  //Guias
  $("#guias").removeClass('active');
  $("#guifolder").removeClass('fas fa-folder-open'); 
  $("#guifolder").addClass('fas fa-folder');
  //Manuales
  $("#manuales").removeClass('active'); 
  $("#manfolder").removeClass('fas fa-folder-open');
  $("#manfolder").addClass('fas fa-folder');
   //Normativas
  $("#normativas").removeClass('active'); 
  $("#norfolder").removeClass('fas fa-folder-open');
  $("#norfolder").addClass('fas fa-folder');
  //ORP-IHTT
  $("#orpihtt").removeClass('active'); 
  $("#orpfolder").removeClass('fas fa-folder-open');
  $("#orpfolder").addClass('fas fa-folder');
  //Requistos
  $("#requisitos").removeClass('active'); 
  $("#reqfolder").removeClass('fas fa-folder-open');
  $("#reqfolder").addClass('fas fa-folder');
  //Validaciones acuerdo
  $("#acuerdo").addClass('active'); 
  $("#acufolder").addClass('fas fa-folder-open'); 

  $("#tarconsulta").hide();
  getDocumentos('IDC-7');

}
//Validacion documentos Boletines
function Boletines() {

  //Acuerdo
  $("#acuerdo").removeClass('active'); 
  $("#acufolder").removeClass('fas fa-folder-open');
  $("#acufolder").addClass('fas fa-folder'); 
  //Validaciones comunicados
  $("#comunicados").removeClass('active');
  $("#comfolder").removeClass('fas fa-folder-open'); 
  $("#comfolder").addClass('fas fa-folder'); 
  //Validaciones contrato
  $("#contrato").removeClass('active');
  $("#confolder").removeClass('fas fa-folder-open'); 
  $("#confolder").addClass('fas fa-folder'); 
  //Validaciones decretos
  $("#decretos").removeClass('active');
  $("#decfolder").removeClass('fas fa-folder-open'); 
  $("#decfolder").addClass('fas fa-folder');
  //Guias
  $("#guias").removeClass('active');
  $("#guifolder").removeClass('fas fa-folder-open'); 
  $("#guifolder").addClass('fas fa-folder');
  //Manuales
  $("#manuales").removeClass('active'); 
  $("#manfolder").removeClass('fas fa-folder-open');
  $("#manfolder").addClass('fas fa-folder');
   //Normativas
  $("#normativas").removeClass('active'); 
  $("#norfolder").removeClass('fas fa-folder-open');
  $("#norfolder").addClass('fas fa-folder');
  //ORP-IHTT
  $("#orpihtt").removeClass('active'); 
  $("#orpfolder").removeClass('fas fa-folder-open');
  $("#orpfolder").addClass('fas fa-folder');
  //Requistos
  $("#requisitos").removeClass('active'); 
  $("#reqfolder").removeClass('fas fa-folder-open');
  $("#reqfolder").addClass('fas fa-folder');
  //Boletines
  $("#boletines").addClass('active');
  $("#bolfolder").addClass('fas fa-folder-open');

  $("#tarconsulta").hide();
  getDocumentos('IDC-2');
  
}
//Validacion documentos Comunicados
function Comunicados() {

  //Acuerdo
  $("#acuerdo").removeClass('active'); 
  $("#acufolder").removeClass('fas fa-folder-open');
  $("#acufolder").addClass('fas fa-folder');
  //Validaciones decretos
  $("#decretos").removeClass('active');
  $("#decfolder").removeClass('fas fa-folder-open'); 
  $("#decfolder").addClass('fas fa-folder'); 
  //Guias
  $("#guias").removeClass('active');
  $("#guifolder").removeClass('fas fa-folder-open'); 
  $("#guifolder").addClass('fas fa-folder');
  //Boletines
  $("#boletines").removeClass('active');
  $("#bolfolder").removeClass('fas fa-folder-open'); 
  $("#bolfolder").addClass('fas fa-folder');
  //Validaciones contrato
  $("#contrato").removeClass('active');
  $("#confolder").removeClass('fas fa-folder-open'); 
  $("#confolder").addClass('fas fa-folder'); 
  //Manuales
  $("#manuales").removeClass('active'); 
  $("#manfolder").removeClass('fas fa-folder-open');
  $("#manfolder").addClass('fas fa-folder');
   //Normativas
  $("#normativas").removeClass('active'); 
  $("#norfolder").removeClass('fas fa-folder-open');
  $("#norfolder").addClass('fas fa-folder');
  //ORP-IHTT
  $("#orpihtt").removeClass('active'); 
  $("#orpfolder").removeClass('fas fa-folder-open');
  $("#orpfolder").addClass('fas fa-folder');
  //Requistos
  $("#requisitos").removeClass('active'); 
  $("#reqfolder").removeClass('fas fa-folder-open');
  $("#reqfolder").addClass('fas fa-folder');
  //Comunicados
  $("#comunicados").addClass('active');
  $("#comfolder").addClass('fas fa-folder-open');

  $("#tarconsulta").hide();
  getDocumentos('IDC-1');
  
}
//Validacion documentos Contrato Concesión
function Contrato() {

  //Acuerdo
  $("#acuerdo").removeClass('active'); 
  $("#acufolder").removeClass('fas fa-folder-open');
  $("#acufolder").addClass('fas fa-folder'); 
  //Validaciones decretos
  $("#decretos").removeClass('active');
  $("#decfolder").removeClass('fas fa-folder-open'); 
  $("#decfolder").addClass('fas fa-folder');
  //Guias
  $("#guias").removeClass('active');
  $("#guifolder").removeClass('fas fa-folder-open'); 
  $("#guifolder").addClass('fas fa-folder');
  //Boletines
  $("#boletines").removeClass('active');
  $("#bolfolder").removeClass('fas fa-folder-open'); 
  $("#bolfolder").addClass('fas fa-folder');
  //Comunicados
  $("#comunicados").removeClass('active'); 
  $("#comfolder").removeClass('fas fa-folder-open');
  $("#comfolder").addClass('fas fa-folder'); 
  //Manuales
  $("#manuales").removeClass('active'); 
  $("#manfolder").removeClass('fas fa-folder-open');
  $("#manfolder").addClass('fas fa-folder');
   //Normativas
  $("#normativas").removeClass('active'); 
  $("#norfolder").removeClass('fas fa-folder-open');
  $("#norfolder").addClass('fas fa-folder');
  //ORP-IHTT
  $("#orpihtt").removeClass('active'); 
  $("#orpfolder").removeClass('fas fa-folder-open');
  $("#orpfolder").addClass('fas fa-folder');
  //Requistos
  $("#requisitos").removeClass('active'); 
  $("#reqfolder").removeClass('fas fa-folder-open');
  $("#reqfolder").addClass('fas fa-folder');
  //Contrato
  $("#contrato").addClass('active');
  $("#confolder").addClass('fas fa-folder-open');

  $("#tarconsulta").hide();
  getDocumentos('IDC-8');
  
}

//Validacion documentos Guias de Revisión
function Decretos() {

  //Acuerdo
  $("#acuerdo").removeClass('active'); 
  $("#acufolder").removeClass('fas fa-folder-open');
  $("#acufolder").addClass('fas fa-folder'); 
  //Validaciones contrato
  $("#contrato").removeClass('active');
  $("#confolder").removeClass('fas fa-folder-open'); 
  $("#confolder").addClass('fas fa-folder'); 
  //Boletines
  $("#boletines").removeClass('active');
  $("#bolfolder").removeClass('fas fa-folder-open'); 
  $("#bolfolder").addClass('fas fa-folder');
  //Comunicados
  $("#comunicados").removeClass('active'); 
  $("#comfolder").removeClass('fas fa-folder-open');
  $("#comfolder").addClass('fas fa-folder'); 
  //Guias
  $("#guias").removeClass('active');
  $("#guifolder").removeClass('fas fa-folder-open'); 
  $("#guifolder").addClass('fas fa-folder');
  //Manuales
  $("#manuales").removeClass('active'); 
  $("#manfolder").removeClass('fas fa-folder-open');
  $("#manfolder").addClass('fas fa-folder');
   //Normativas
  $("#normativas").removeClass('active'); 
  $("#norfolder").removeClass('fas fa-folder-open');
  $("#norfolder").addClass('fas fa-folder');
  //ORP-IHTT
  $("#orpihtt").removeClass('active'); 
  $("#orpfolder").removeClass('fas fa-folder-open');
  $("#orpfolder").addClass('fas fa-folder');
  //Requistos
  $("#requisitos").removeClass('active'); 
  $("#reqfolder").removeClass('fas fa-folder-open');
  $("#reqfolder").addClass('fas fa-folder');
  //Contrato
  $("#decretos").addClass('active');
  $("#decfolder").addClass('fas fa-folder-open');

  $("#tarconsulta").hide();
  getDocumentos('IDC-10');
  
}

//Validacion documentos Guias de Revisión
function Guias() {

  //Acuerdo
  $("#acuerdo").removeClass('active'); 
  $("#acufolder").removeClass('fas fa-folder-open');
  $("#acufolder").addClass('fas fa-folder'); 
  //Validaciones contrato
  $("#contrato").removeClass('active');
  $("#confolder").removeClass('fas fa-folder-open'); 
  $("#confolder").addClass('fas fa-folder'); 
  //Boletines
  $("#boletines").removeClass('active');
  $("#bolfolder").removeClass('fas fa-folder-open'); 
  $("#bolfolder").addClass('fas fa-folder');
  //Comunicados
  $("#comunicados").removeClass('active'); 
  $("#comfolder").removeClass('fas fa-folder-open');
  $("#comfolder").addClass('fas fa-folder'); 
  //Validaciones decretos
  $("#decretos").removeClass('active');
  $("#decfolder").removeClass('fas fa-folder-open'); 
  $("#decfolder").addClass('fas fa-folder');
  //Manuales
  $("#manuales").removeClass('active'); 
  $("#manfolder").removeClass('fas fa-folder-open');
  $("#manfolder").addClass('fas fa-folder');
   //Normativas
  $("#normativas").removeClass('active'); 
  $("#norfolder").removeClass('fas fa-folder-open');
  $("#norfolder").addClass('fas fa-folder');
  //ORP-IHTT
  $("#orpihtt").removeClass('active'); 
  $("#orpfolder").removeClass('fas fa-folder-open');
  $("#orpfolder").addClass('fas fa-folder');
  //Requistos
  $("#requisitos").removeClass('active'); 
  $("#reqfolder").removeClass('fas fa-folder-open');
  $("#reqfolder").addClass('fas fa-folder');
  //Contrato
  $("#guias").addClass('active');
  $("#guifolder").addClass('fas fa-folder-open');

  $("#tarconsulta").hide();
  getDocumentos('IDC-9');
  
}
//Validacion documentos Manuales
function Manuales() {

  //Acuerdo
  $("#acuerdo").removeClass('active'); 
  $("#acufolder").removeClass('fas fa-folder-open');
  $("#acufolder").addClass('fas fa-folder'); 
  //Boletines
  $("#boletines").removeClass('active');
  $("#bolfolder").removeClass('fas fa-folder-open'); 
  $("#bolfolder").addClass('fas fa-folder');
  //Comunicados
  $("#comunicados").removeClass('active'); 
  $("#comfolder").removeClass('fas fa-folder-open');
  $("#comfolder").addClass('fas fa-folder'); 
  //Contrato
  $("#contrato").removeClass('active'); 
  $("#confolder").removeClass('fas fa-folder-open');
  $("#confolder").addClass('fas fa-folder');
  //Validaciones decretos
  $("#decretos").removeClass('active');
  $("#decfolder").removeClass('fas fa-folder-open'); 
  $("#decfolder").addClass('fas fa-folder');
   //Guias
  $("#guias").removeClass('active');
  $("#guifolder").removeClass('fas fa-folder-open'); 
  $("#guifolder").addClass('fas fa-folder');
  //Normativas
  $("#normativas").removeClass('active'); 
  $("#norfolder").removeClass('fas fa-folder-open');
  $("#norfolder").addClass('fas fa-folder');
  //ORP-IHTT
  $("#orpihtt").removeClass('active'); 
  $("#orpfolder").removeClass('fas fa-folder-open');
  $("#orpfolder").addClass('fas fa-folder');
  //Requistos
  $("#requisitos").removeClass('active'); 
  $("#reqfolder").removeClass('fas fa-folder-open');
  $("#reqfolder").addClass('fas fa-folder');
  //Manuales
  $("#manuales").addClass('active');
  $("#manfolder").addClass('fas fa-folder-open');

  $("#tarconsulta").hide();
  getDocumentos('IDC-5');
  
}
//Validacion documentos Normativas
function Normativas() {

  //Acuerdo
  $("#acuerdo").removeClass('active'); 
  $("#acufolder").removeClass('fas fa-folder-open');
  $("#acufolder").addClass('fas fa-folder'); 
  //Boletines
  $("#boletines").removeClass('active');
  $("#bolfolder").removeClass('fas fa-folder-open'); 
  $("#bolfolder").addClass('fas fa-folder');
  //Comunicados
  $("#comunicados").removeClass('active'); 
  $("#comfolder").removeClass('fas fa-folder-open');
  $("#comfolder").addClass('fas fa-folder'); 
  //Contrato
  $("#contrato").removeClass('active'); 
  $("#confolder").removeClass('fas fa-folder-open');
  $("#confolder").addClass('fas fa-folder');
  //Validaciones decretos
  $("#decretos").removeClass('active');
  $("#decfolder").removeClass('fas fa-folder-open'); 
  $("#decfolder").addClass('fas fa-folder');
  //Guias
  $("#guias").removeClass('active');
  $("#guifolder").removeClass('fas fa-folder-open'); 
  $("#guifolder").addClass('fas fa-folder');
  //Manuales
  $("#manuales").removeClass('active'); 
  $("#manfolder").removeClass('fas fa-folder-open');
  $("#manfolder").addClass('fas fa-folder');
  //ORP-IHTT
  $("#orpihtt").removeClass('active'); 
  $("#orpfolder").removeClass('fas fa-folder-open');
  $("#orpfolder").addClass('fas fa-folder');
  //Requistos
  $("#requisitos").removeClass('active'); 
  $("#reqfolder").removeClass('fas fa-folder-open');
  $("#reqfolder").addClass('fas fa-folder');
  //Normativas
  $("#normativas").addClass('active');
  $("#norfolder").addClass('fas fa-folder-open');

  $("#tarconsulta").hide();
  getDocumentos('IDC-3');
  
}

//Validacion documentos ORP-IHTT
function ORP_IHTT() {

  //Acuerdo
  $("#acuerdo").removeClass('active'); 
  $("#acufolder").removeClass('fas fa-folder-open');
  $("#acufolder").addClass('fas fa-folder'); 
  //Boletines
  $("#boletines").removeClass('active');
  $("#bolfolder").removeClass('fas fa-folder-open'); 
  $("#bolfolder").addClass('fas fa-folder');
  //Comunicados
  $("#comunicados").removeClass('active'); 
  $("#comfolder").removeClass('fas fa-folder-open');
  $("#comfolder").addClass('fas fa-folder'); 
  //Contrato
  $("#contrato").removeClass('active'); 
  $("#confolder").removeClass('fas fa-folder-open');
  $("#confolder").addClass('fas fa-folder');
  //Validaciones decretos
  $("#decretos").removeClass('active');
  $("#decfolder").removeClass('fas fa-folder-open'); 
  $("#decfolder").addClass('fas fa-folder');
  //Guias
  $("#guias").removeClass('active');
  $("#guifolder").removeClass('fas fa-folder-open'); 
  $("#guifolder").addClass('fas fa-folder');
  //Manuales
  $("#manuales").removeClass('active'); 
  $("#manfolder").removeClass('fas fa-folder-open');
  $("#manfolder").addClass('fas fa-folder');
  //Normativas
  $("#normativas").removeClass('active'); 
  $("#norfolder").removeClass('fas fa-folder-open');
  $("#norfolder").addClass('fas fa-folder');
  //Requistos
  $("#requisitos").removeClass('active'); 
  $("#reqfolder").removeClass('fas fa-folder-open');
  $("#reqfolder").addClass('fas fa-folder');
  //ORP-IHTT
  $("#orpihtt").addClass('active');
  $("#orpfolder").addClass('fas fa-folder-open');

  $("#tarconsulta").hide();
  getDocumentos('IDC-4');
  
}

//Validacion documentos Requisitos
function Requisitos() {

  //Acuerdo
  $("#acuerdo").removeClass('active'); 
  $("#acufolder").removeClass('fas fa-folder-open');
  $("#acufolder").addClass('fas fa-folder'); 
  //Boletines
  $("#boletines").removeClass('active');
  $("#bolfolder").removeClass('fas fa-folder-open'); 
  $("#bolfolder").addClass('fas fa-folder');
  //Comunicados
  $("#comunicados").removeClass('active'); 
  $("#comfolder").removeClass('fas fa-folder-open');
  $("#comfolder").addClass('fas fa-folder'); 
  //Contrato
  $("#contrato").removeClass('active'); 
  $("#confolder").removeClass('fas fa-folder-open');
  $("#confolder").addClass('fas fa-folder');
  //Validaciones decretos
  $("#decretos").removeClass('active');
  $("#decfolder").removeClass('fas fa-folder-open'); 
  $("#decfolder").addClass('fas fa-folder');
  //Guias
  $("#guias").removeClass('active');
  $("#guifolder").removeClass('fas fa-folder-open'); 
  $("#guifolder").addClass('fas fa-folder');
  //Manuales
  $("#manuales").removeClass('active'); 
  $("#manfolder").removeClass('fas fa-folder-open');
  $("#manfolder").addClass('fas fa-folder');
  //Normativas
  $("#normativas").removeClass('active'); 
  $("#norfolder").removeClass('fas fa-folder-open');
  $("#norfolder").addClass('fas fa-folder');
  //ORP-IHTT
  $("#orpihtt").removeClass('active'); 
  $("#orpfolder").removeClass('fas fa-folder-open');
  $("#orpfolder").addClass('fas fa-folder');
  //Requisitos
  $("#requisitos").addClass('active');
  $("#reqfolder").addClass('fas fa-folder-open');

  $("#tarconsulta").hide();
  getDocumentos('IDC-6');
  
}

function getDocumentos(id){
  $("#tarcarpetas").show();

  if (id=='IDC-1') {
    $("#tartitulo").html('Comunicados');
  }else if (id=='IDC-2') {
    $("#tartitulo").html('Boletines');
  }else if (id=='IDC-3') {
    $("#tartitulo").html('Normativas');
  }else if (id=='IDC-4') {
    $("#tartitulo").html('ORP IP-IHTT');
  }else if (id=='IDC-5') {
    $("#tartitulo").html('Manuales');
  }else if (id=='IDC-6') {
    $("#tartitulo").html('Requisitos');
  }else if (id=='IDC-7') {
    $("#tartitulo").html('Acuerdos');
  }else if (id=='IDC-8') {
    $("#tartitulo").html('Contrato Concesión');
  }else if (id=='IDC-9') {
    $("#tartitulo").html('Guías de Revisión');
  }else if (id=='IDC-10') {
    $("#tartitulo").html('Decretos');
  }


  $("#contenidomanuales").html(
      '<div class="col-12 col-sm-12 mb-4"><tr> <td colspan="12" style="text-align:center"><i class="far fa-smile-beam text-turqueza" style="margin-right: 5px;"></i>Buscando documentos...<br><div class="progress" style="height: 30px !important;"> <div class="progress-bar progress-bar-striped bg-success" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 100%;animation: 0s ease 0s 1 normal none running animate-positive !important;"></div> </div> </td> </tr></div>'
    );

  var parameters = {
     action: "get-documentos",
     cat: id
  }
    
   $.get( "Api_PW.php", parameters, null, "json" )
    .done(function(datos) {
      var content = '';
      var n = 0;
      var datos = datos[0];

      for (var i = 0; i < datos.length; i++) {
        
        //Total Visualizaciones
        if (datos[i].Total_Visualizaciones==null) {
          n = 0;
        }else {
          n = parseInt(datos[i].Total_Visualizaciones);
        }

        if ($('#valadm').val()==1) {
          var btn = '<div class="col text-right"> <div class="btn-group"> <button class="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span class="icon icon-sm"> <span class="fas fa-ellipsis-h icon-secondary text-turqueza"></span> </span> <span class="sr-only">Toggle Dropdown</span> </button> <div class="dropdown-menu"> <a class="dropdown-item text-danger" onclick="confirmarEliminarArchivos(\''+datos[i].Nombre_Documento+'\',\''+datos[i].DESC_Categoria+'\');"> <span class="fa fa-trash mr-2" aria-hidden="true"></span>Eliminar </a> </div> </div> </div> ';
        }else {
          var btn='';
        }

        content += '<div class="card border-light mb-4 text-left" style="min-width: 100%;"> <div class="row no-gutters align-items-center"> <div class="col-12 col-lg-3 col-xl-3" style="text-align: center;border-right: solid 1px #e6e7e8;"> <a href="#"> <iframe src="Documentos/'+datos[i].DESC_Categoria+'/'+datos[i].Nombre_Documento+'" width="50%" height="170px" style="margin: 3px"></iframe> </a> </div> <div class="col-12 col-lg-6 col-xl-8"> <div class="card-body py-lg-0"> <div class="d-flex no-gutters align-items-center mb-2"> <div> <ul class="list-group mb-0"> <li class="list-group-item small p-0"><span class="far fa-calendar-alt text-tertiary mr-2 text-turqueza"></span>Fecha de Documento: '+datos[i].Sistema_Fecha+'</li> </ul> </div> '+btn+' </div> <a target="_blank" onclick="saveTotalVistasDocumento(\''+datos[i].ID_Documento+'\',\''+n+'\');" href="Documentos/'+datos[i].DESC_Categoria+'/'+datos[i].Nombre_Documento+'"> <h2 class="h5 text-gris">'+datos[i].Nombre_Documento+'</h2> </a> <div class="col d-flex pl-0"><span class="font-small mr-3"><span class="fas fa-weight mr-2 text-turqueza"></span>'+datos[i].Size_Documento+' '+datos[i].Tipo_Unidad+'</span> <span class="text-muted font-small mr-3"><span class="fas fa-eye mr-2 text-turqueza"></span><span class="text-gris">'+n+'</span></span>  </div> </div> </div> </div> </div>';


        $("#contenidomanuales").html(content);

      }

      if (datos.length == 0) {
        $("#contenidomanuales").html('<div class="col-12 col-sm-12 mb-4"> <tr> <td colspan="12" style="text-align:center"><i class="far fa-sad-tear text-rojo" style="margin-right: 5px;color: #893068;font-size: 1.2rem;"></i><span class="text-rojo" style="font-weight: 900; font-size: 1.3rem;">¡ADVERTENCIA!</span> <span style="font-weight: 700;">No Se Encontro Ningun documento dentro de la carpeta.</span><br></td> </tr> </div>');
      }

    })
  .fail(function( jqXHR, textStatus, errorThrown ) {
    if ( console && console.log ) {
       $("#contenidomanuales").html('<div class="col-12 col-sm-12 mb-4"> <tr> <td colspan="12" style="text-align:center"><i class="far fa-sad-tear" style="margin-right: 5px;color: #893068;font-size: 1.2rem;"></i><span style="color: #893168; font-weight: 900; font-size: 1.3rem;">¡ADVERTENCIA!</span> <span style="font-weight: 700;">Error al buscar documentos dentro de la carpeta seleccionada.</span><br></td> </tr> </div>');
    }
  }); 
}
//Visualizar por tipo de docuemento
function getTipoDocumentos(id){
  $("#tarcarpetas").show();

  if (id=='.docx') {
    $("#tartitulo").html('Documentos en Word');
  }else if (id=='.xlsx') {
    $("#tartitulo").html('Documentos en Excel');
  }else if (id=='.pdf') {
    $("#tartitulo").html('Documentos en PDF');
  }else if (id=='.rtf') {
    $("#tartitulo").html('Archivos de Texto');
  }else if (id=='.doc') {
    $("#tartitulo").html('Documentos en Word 2007');
  }

  $("#contenidomanuales").html(
      '<div class="col-12 col-sm-12 mb-4"><tr> <td colspan="12" style="text-align:center"><i class="far fa-smile-beam" style="margin-right: 5px;"></i>Buscando documentos...<br><div class="progress" style="height: 30px !important;"> <div class="progress-bar progress-bar-striped bg-success" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 100%;animation: 0s ease 0s 1 normal none running animate-positive !important;"></div> </div> </td> </tr></div>'
    );

  var parameters = {
     action: "get-tipo-documentos",
     tipo: id
  }
    
   $.get( "Api_PW.php", parameters, null, "json" )
    .done(function(datos) {
      var content = '';
      var n = 0;
      var datos = datos[0];

      for (var i = 0; i < datos.length; i++) {
        
        //Total Visualizaciones
        if (datos[i].Total_Visualizaciones==null) {
          n = 0;
        }else {
          n = parseInt(datos[i].Total_Visualizaciones);
        }

        if ($('#valadm').val()==1) {
          var btn = '<div class="col text-right"> <div class="btn-group"> <button class="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span class="icon icon-sm"> <span class="fas fa-ellipsis-h icon-secondary text-turqueza"></span> </span> <span class="sr-only">Toggle Dropdown</span> </button> <div class="dropdown-menu"> <a class="dropdown-item text-danger" onclick="confirmarEliminarArchivos(\''+datos[i].Nombre_Documento+'\',\''+datos[i].DESC_Categoria+'\');"> <span class="fa fa-trash mr-2" aria-hidden="true"></span>Eliminar </a> </div> </div> </div> ';
        }else {
          var btn='';
        }

        content += '<div class="card border-light mb-4 text-left" style="min-width: 100%;"> <div class="row no-gutters align-items-center"> <div class="col-12 col-lg-3 col-xl-3" style="text-align: center;border-right: solid 1px #e6e7e8;"> <a href="#"> <img data-pdf-thumbnail-file="Documentos/'+datos[i].DESC_Categoria+'/'+datos[i].Nombre_Documento+'" data-pdf-thumbnail-height="150"> </a> </div> <div class="col-12 col-lg-6 col-xl-8"> <div class="card-body py-lg-0"> <div class="d-flex no-gutters align-items-center mb-2"> <div> <ul class="list-group mb-0"> <li class="list-group-item small p-0"><span class="far fa-calendar-alt text-tertiary mr-2"></span>Fecha de Documento: '+datos[i].Sistema_Fecha+'</li> </ul> </div> '+btn+'</div> <a target="_blank" onclick="saveTotalVistasDocumento(\''+datos[i].ID_Documento+'\',\''+n+'\');" href="Documentos/'+datos[i].DESC_Categoria+'/'+datos[i].Nombre_Documento+'"> <h2 class="h5 text-gris text-gris">'+datos[i].Nombre_Documento+'</h2> </a> <div class="col d-flex pl-0"><span class="font-small mr-3"><span class="fas fa-weight mr-2"></span>'+datos[i].Size_Documento+' '+datos[i].Tipo_Unidad+'</span> <span class="text-muted font-small mr-3"><span class="fas fa-eye mr-2 text-turqueza"></span> <span class="text-gris">'+n+'</span></span>  </div> </div> </div> </div> </div>';


        $("#contenidomanuales").html(content);

      }

      if (datos.length == 0) {
        $("#contenidomanuales").html('<div class="col-12 col-sm-12 mb-4"> <tr> <td colspan="12" style="text-align:center"><i class="far fa-sad-tear" style="margin-right: 5px;color: #893068;font-size: 1.2rem;"></i><span style="color: #893168; font-weight: 900; font-size: 1.3rem;">¡ADVERTENCIA!</span> <span style="font-weight: 700;">No Se Encontro Ningun documento dentro de la carpeta.</span><br></td> </tr> </div>');
      }

    })
  .fail(function( jqXHR, textStatus, errorThrown ) {
    if ( console && console.log ) {
       $("#contenidomanuales").html('<div class="col-12 col-sm-12 mb-4"> <tr> <td colspan="12" style="text-align:center"><i class="far fa-sad-tear" style="margin-right: 5px;color: #893068;font-size: 1.2rem;"></i><span style="color: #893168; font-weight: 900; font-size: 1.3rem;">¡ADVERTENCIA!</span> <span style="font-weight: 700;">Error al buscar documentos dentro de la carpeta seleccionada.</span><br></td> </tr> </div>');
    }
  }); 
}

//Funcion de insert las vistas
function saveTotalVistasDocumento(id,n) {

   var form_data = new FormData();
   form_data.append("action","save-vistas");
   //Datos para el insert del like
   form_data.append("iddocumento", id);
   form_data.append("visitas", n);
  
   fetch("Api_PW.php",
    {
      method: "POST",
      body: form_data
    })
      .then((resp) => resp.json())
      .then(Data=>{
         if (Data.status==1) {
            actualizar();
         }else {
            sweetAlert("!ATENCIÓN¡",Data.status, "error");
         }
      })
    .catch(err=>{ console.log(err); });
}
function actualizar(){
  window.location.reload(true);
}
//Funcion para recuperar la url del tramite
function getURLDocumento() {

   if($("#inputsearch").val().trim().length<1){
      toastwarning("No has seleccionado ningun tramite");
      return;
   }
   postdata = {
      action: "get-url-documentos",
      nom: $('#inputsearch').val()
   }
   $.post( "Api_PW.php", postdata, null, "json" )
      .done(function( datos, textStatus, jqXHR ) {
         var url = datos[0];
         if(datos[1]>0){
            var categoria = url[0].DESC_Categoria;
            var nombre = url[0].Nombre_Documento;
            URLTramite(categoria,nombre); 
         }
   })
   .fail(function( jqXHR, textStatus, errorThrown ) {
      if ( console && console.log ) {
         swal({
           type: 'error',
           title: '!Error¡',
           text: 'Error al obtener la url del tramite seleccionado',
        })
      }
  });
}
//Redireccion del tramite
function URLTramite(categoria,nombre) {
   window.open('Documentos/'+categoria+'/'+nombre+'', '_blank');
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@ FUNCION PARA ELIMINAR ARCHIVOS ADJUNTOS @@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function confirmarEliminarArchivos(nombre_documento,nombre_Carpeta){

  swal({ 
  title: "",
  text: '<div class="fm-notification-body"> <div class="fm-notification-icon"> <div class="fm-del-contact-avatar"> <span></span> <div class="fm-del-contacts-number">1</div> </div> </div> <div class="fm-notification-info"> <p>¿Estás seguro de que quieres eliminar el archivo seleccionado?</p> <div class="fm-notification-warning">Aviso: Cualquier archivo eliminado no se podra recuperar!</div> </div> <div class="clear"></div> </div>',
  html: true,
  showCancelButton: true,
  cancelButtonText: "No",
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Si",
  closeOnConfirm: false 
},function(){
  EliminarArchivo(nombre_documento,nombre_Carpeta);
});
   
$("#contenthome").removeClass("m");
$("#contenthome").addClass("a");
}

function EliminarArchivo(nombre_documento,nombre_Carpeta){
  sweetAlert({ title: "",
     text: "espere un momento por favor ...",
     showConfirmButton: false,
  }); 
   var form_data = new FormData();
   form_data.append("action","EliminarDocumento");
   form_data.append("Borrar",nombre_documento);
   form_data.append("ArchivoTemporal",nombre_Carpeta);

   $.ajax({
    url: 'Api_PW.php',
    dataType: 'json',
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    type: 'post',
        success: function(dataserver){
          swal("Borrado", "El Archivo a sido Eliminado", "success");
          getTipoDocumentos();
       }
    });
}