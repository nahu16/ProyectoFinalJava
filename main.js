

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
                    })

                    const quitarVoto = document.createElement("button")
                    quitarVoto.innerHTML = '👎'
                    quitarVoto.classList.add("voto")
                    
                    quitarVoto.addEventListener("click", function(){
                        let sacarvotosCancion = parseInt(localStorage.getItem( `votos_${cancion.nombre} `)) || 0
                        sacarvotosCancion--
                        localStorage.setItem( `votos_${cancion.nombre} `, sacarvotosCancion)
                        actualizarRanking()
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
    
            main.appendChild(container);
            
            function actualizarRanking() {
            const rankingElement = document.getElementById("ranking");
            let totalVotos = 0;
            let rankingHTML= '<h2> Total de votos por canción:</h2>'
    
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('votos_')) {
                    const nombreCancion = key.replace('votos_','')
                    const votosCancion = parseInt (localStorage.getItem(key))
                    if(votosCancion>0){
                    rankingHTML +=  `<p><strong>${nombreCancion}</strong>: ${votosCancion} votos </p> `}
                }
            });
            rankingElement.innerHTML =  rankingHTML;
            }

        });

