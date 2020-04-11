var array_nombre_farmacias = new Array();
window.onload = function cargar() {

    const endpoint_comunas = "https://midastest.minsal.cl/farmacias/maps/index.php/utilidades/maps_obtener_comunas_por_regiones";
    const proxy_cors="http://localhost:8080/";
    const endpoint_farmacias = "https://farmanet.minsal.cl/maps/index.php/ws/getLocalesRegion?id_region=7";
    var lista_farmacias;
  
    var bandera_existe = false;
    cargar_farmacias();
    function cargar_farmacias() {

        lista_farmacias = nombres_farmacias();
        function nombres_farmacias(){  

            var myHeaders = new Headers();             
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
              };
           //Request a farmacias 
            fetch(proxy_cors+endpoint_farmacias,requestOptions)
                .then(response => {
                                 
                   return response.json();
                })           
                .then(result => {                    
         
                    buildarrayfarmacias(result);
                    addOptionsFarmacias(array_nombre_farmacias);

                })    
                .catch(error => console.log('error', error));
           
         
       };
   }  
       
   // metodo principal para construir el select de las farmacias, del json de respuesta extrae los nombres y continua con la construcción del select
   function buildarrayfarmacias(array) {
        var select = document.querySelector("#farmacias");  
        for (var i = 0; i < array.length; i++) {
            var farmacia = array[i];          
            var nombre_farmacia = farmacia.local_nombre; 
            llenaArrayNombreFarmacias(nombre_farmacia.trim());
            
        } 
        array_nombre_farmacias = uniq(array_nombre_farmacias);      

    }
     
    //llena un arreglo de string con los nombres delas farmacias
    function llenaArrayNombreFarmacias(nombre_farmacia){
        
      array_nombre_farmacias.push(nombre_farmacia)       

    }
   
     //elimina las famrmacias repetidas 
    function uniq(a) {
        return a.sort().filter(function(item, pos, ary) {
            return !pos || item != ary[pos - 1];
        })
    }
     
      // Rutina para agregar farmacias a un <select>
    function addOptionsFarmacias(array) {      
        var select = document.querySelector("#farmacias");        
        var length = array.length;
        for (i=0 ; i < length; i++) {           
           
                var option = document.createElement("option");
                option.text = array[i];
                option.value = i+1;
                select.add(option);             
        }
    }


//Para Cargar las comunas 

    var lista_comunas;     
    cargar_comunas();
    function cargar_comunas(){  

        var myHeaders = new Headers();
        var formdata = new FormData();       
        formdata.append("reg_id", 7);
          var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };    
        lista_comunas = comunas();
        function comunas(){

            fetch(endpoint_comunas, requestOptions)
            .then(response => response.text()) 
            .then(result => addOptionsComunas(result))           
            .catch(error => console.log('error', error));
            
        };

    };
     
    function addOptionsComunas(str) {
        var array = str.split("</option>"); 
        var select = document.querySelector("#comunas");    
        var length = array.length;
        for (i=0 ; i <= length-2; i++) {
           
                var str2 = array[i];
                var indexTextOption = str2.indexOf(">");
                var lengthTextOption = str2.length;
                var textOption = str2.slice(indexTextOption+1,lengthTextOption);
                var indexValueOption = str2.indexOf("'");
                var lengthValueOption = str2.lastIndexOf("'");
                var valueOption = str2.slice(indexValueOption+1,lengthValueOption);         
                var option = document.createElement("option");
                option.text = textOption;
                option.value = valueOption;
                select.add(option);             
        }
    }

}