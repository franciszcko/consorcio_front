const url = "http://localhost:5011/api/v1/Farmacias/negocio"; 
const proxy_cors="http://localhost:8080/";
const form = document.getElementById("form1");

form.addEventListener('submit', function (e){
        e.preventDefault();
        const formData = new FormData(this)
    
        fetch(url,{
            method: 'POST',
            body: formData,
            headers: new Headers({'origin': 'x-requested-with','Content-Type': 'application/x-www-form-urlencoded'}),
            redirect: 'follow',
            Accept: 'text/html'
        })
        .then(function(response) {
          if(response.ok) { // Check if response went through
              response.text().then(function(data) { 
                  var farmacias = document.getElementById('lista_farmacias');
                  var elementFarmacias= '<p>Farmacias:' + data + '</p>';
                  farmacias.innerHTML += elementFarmacias;
              });
          } else { // Response wasn't ok. Check dev tools
              console.log("response failed?");
          }
    });

})   


