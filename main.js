

fetch('Discos.json')
    .then(response=>response.json())
    .then(data=>{
        const Discos = data.discos;
        const main = document.querySelector("main");
        const container = document.createElement("div");

        Discos.forEach(Disco => {
            const card = document.createElement("div");
            card.classList.add("card")
            
            const imagen = document.createElement("img")
            imagen.src= Disco.portada
            imagen.classList.add("img_portada")
            card.appendChild(imagen)

            const titulo = document.createElement("h3")
            titulo.innerHTML = Disco.nombre
            titulo.classList.add("nombreDisco")
            card.appendChild(titulo)

            const publicado = document.createElement("p")
            publicado.innerHTML= `Año de lanzamiento: ${Disco.anio_publicacion}`
            publicado.classList.add("fechaDisco")
            card.appendChild(publicado)
            
            const canciones = document.createElement("button")
            canciones.innerHTML='Ver Canciones'
            canciones.classList.add("verCancion")
            
            canciones.addEventListener("click", function() {
                const popup= document.createElement("div") 
                popup.innerHTML='<h3>Lista de canciones: </h3>'
                popup.classList.add("popup")

                Disco.canciones.forEach(cancion =>{
                    const cancionElement = document.createElement("div");
                    cancionElement.classList.add("cancion")
                    cancionElement.innerHTML = `<strong>${cancion.nombre}</strong> - ${cancion.duracion}`
                    
                    const votar = document.createElement("button")
                    votar.innerHTML = '👍'
                    votar.classList.add("voto")
                    
                    votar.addEventListener("click", function(){
                        let votosCancion = parseInt(localStorage.getItem( `votos_${cancion.nombre} `)) || 0
                        votosCancion++
                        localStorage.setItem( `votos_${cancion.nombre} `, votosCancion)
                        actualizarRanking()
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                              toast.onmouseenter = Swal.stopTimer;
                              toast.onmouseleave = Swal.resumeTimer;
                            }
                          });
                          Toast.fire({
                            icon: "success",
                            title: "Gracias por su voto"
                          });
                    })

                    const quitarVoto = document.createElement("button")
                    quitarVoto.innerHTML = '👎'
                    quitarVoto.classList.add("voto")
                    
                    quitarVoto.addEventListener("click", function(){
                        let sacarvotosCancion = parseInt(localStorage.getItem( `votos_${cancion.nombre} `)) || 0
                        sacarvotosCancion--
                        localStorage.setItem( `votos_${cancion.nombre} `, sacarvotosCancion)
                        actualizarRanking()

                        if (sacarvotosCancion>0){
                            Swal.fire({
                            icon: "error",
                            title: "",
                            text: `Su voto a ${cancion.nombre} fue sido eliminado`,
                        })}else{
                            Swal.fire({
                                icon: "error",
                                title: "",
                                text: `La canción ${cancion.nombre} no cuentas con votos`,})
                        }
                    })
                    
                    
                    cancionElement.appendChild(votar)
                    cancionElement.appendChild(quitarVoto)
                    popup.appendChild(cancionElement)


                })
                document.body.appendChild(popup)
                
                popup.addEventListener("click", function(event){
                if(!event.target.closest(".votar") || !event.target.closest(".cancion")){
                    popup.remove()
                }
                })

            })
                card.appendChild(canciones);
                container.appendChild(card);
            });
            
            main.appendChild(container)

            const Busqueda = document.createElement("input");
            Busqueda.type = "text";
            Busqueda.placeholder = "Buscar canción...";
            Busqueda.classList.add("input-busqueda");
            
            main.insertBefore(Busqueda, container)

            Busqueda.addEventListener("input", function() {
                const textoBusqueda = this.value.toLowerCase();
                const cancionesFiltradas = []
                
                Discos.forEach(Disco =>{
                    const canciones = Disco.canciones.filter(cancion=> cancion.nombre.toLowerCase().includes(textoBusqueda))
                cancionesFiltradas.push(...canciones)
                })
            
                mostrarPopupCanciones(cancionesFiltradas);
            });
            
            function mostrarPopupCanciones(canciones) {
                const popup = document.createElement("div");
                popup.innerHTML = '<h3>Lista de canciones:</h3>';
                popup.classList.add("popup");
            
                canciones.forEach(cancion => {
                    const cancionElement = document.createElement("div");
                    cancionElement.classList.add("cancion");
                    cancionElement.innerHTML = `<strong>${cancion.nombre}</strong> - ${cancion.duracion}`;
            
                    const votar = document.createElement("button");
                    votar.innerHTML = '👍';
                    votar.classList.add("voto");
            
                    votar.addEventListener("click", function() {
                        let votosCancion = parseInt(localStorage.getItem(`votos_${cancion.nombre}`)) || 0;
                        votosCancion++;
                        localStorage.setItem(`votos_${cancion.nombre}`, votosCancion);
                        actualizarRanking();
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                              toast.onmouseenter = Swal.stopTimer;
                              toast.onmouseleave = Swal.resumeTimer;
                            }
                          });
                          Toast.fire({
                            icon: "success",
                            title: "Gracias por su voto"
                          });
                    });
            
                    const quitarVoto = document.createElement("button");
                    quitarVoto.innerHTML = '👎';
                    quitarVoto.classList.add("voto");
            
                    quitarVoto.addEventListener("click", function(){
                        let sacarvotosCancion = parseInt(localStorage.getItem( `votos_${cancion.nombre} `)) || 0
                        sacarvotosCancion--
                        localStorage.setItem( `votos_${cancion.nombre} `, sacarvotosCancion)
                        actualizarRanking()

                        if (sacarvotosCancion>0){
                            Swal.fire({
                            icon: "error",
                            title: "",
                            text: `Su voto a ${cancion.nombre} fue sido eliminado`,
                        })}else{
                            Swal.fire({
                                icon: "error",
                                title: "",
                                text: `La canción ${cancion.nombre} no cuentas con votos`,})
                        }
                    })
            
                    cancionElement.appendChild(votar);
                    cancionElement.appendChild(quitarVoto);
                    popup.appendChild(cancionElement);
                });
            
                document.body.appendChild(popup);
            
                popup.addEventListener("click", function(event) {
                    if (!event.target.closest(".voto") || !event.target.closest(".cancion")) {
                        popup.remove();
                    }
                });
            }


            function actualizarRanking() {
                const rankingElement = document.getElementById("ranking");
                let rankingHTML = '<h2> Total de votos por canción:</h2>';
            
                let cancionesConVotos = [];
            
                Object.keys(localStorage).forEach(key => {
                    if (key.startsWith('votos_')) { 
                        const nombreCancion = key.replace('votos_', '');
                        const votosCancion = parseInt(localStorage.getItem(key)); 
                        
                        cancionesConVotos.push({ nombre: nombreCancion, votos: votosCancion });
                    }
                });

                cancionesConVotos.sort((a, b) => b.votos - a.votos);
            
                cancionesConVotos.forEach(cancion => {
                    if (cancion.votos > 0) { 
                        rankingHTML += `<p><strong>${cancion.nombre}</strong>: ${cancion.votos} votos </p>`;
                    }
                });
            
                rankingElement.innerHTML = rankingHTML;
            }
        })
.catch(error => {
            console.error('Error fetching data:', error);
            Swal.fire({
                icon: "error",
                title: "",
                text: "Hubo un error al cargar los datos. Por favor, inténtalo de nuevo más tarde.",
            });
        });