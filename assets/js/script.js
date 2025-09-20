/**
 * PROYECTO: Abecedario Político Interactivo - Escuela Las Juanas
 * VERSIÓN:  3.0 (Estructura Limpia)
 * FECHA:    20 de Septiembre, 2025
 * AUTORA:   AnaMar8a <https://www.linkedin.com/in/8aanamaria/>
 *
 * DESCRIPCIÓN:
 * Este script maneja toda la interactividad de la presentación del Abecedario Político.
 * Sus responsabilidades incluyen:
 * 1. Cargar los datos del glosario desde un archivo externo (glossary.json).
 * 2. Renderizar las diferentes vistas de la aplicación (portada, lista de términos).
 * 3. Controlar la navegación principal (menú de letras y botón de inicio).
 * 4. Gestionar el modal (pop-up) que muestra la definición detallada de cada término.
 * 5. Manejar la funcionalidad de búsqueda y el botón de término aleatorio.
 * 6. Animar el fondo de "rizoma" en el canvas.
 */

// ========================================================================
// --- 1. BLOQUE DE INICIALIZACIÓN ---
// Se ejecuta cuando todo el HTML ha sido cargado.
// ========================================================================
document.addEventListener('DOMContentLoaded', function () {

    // --- 1.1. Selección de Elementos del DOM ---
    // Guardamos en variables los elementos HTML con los que vamos a interactuar
    // para no tener que buscarlos repetidamente.
    const alphabetNavDesktop = document.getElementById('alphabet-nav-desktop');
    const alphabetNavMobile = document.getElementById('mobile-nav-scroll');
    const mainContent = document.getElementById('main-content');
    const homeButtonDesktop = document.getElementById('home-button-desktop');
    const homeButtonMobile = document.getElementById('home-button-mobile');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    // --- 1.2. Almacenamiento de Datos ---
    // Esta variable guardará todos los términos del glosario una vez que los carguemos.
    let glossaryData = [];

    // ========================================================================
    // --- 2. CARGA DE DATOS DEL GLOSARIO ---
    // Usamos 'fetch' para cargar de forma asíncrona los datos desde el archivo
    // glossary.json. Esto mantiene los datos separados del código.
    // ========================================================================
    fetch('glossary.json')
        .then(response => {
            // Verificamos si la respuesta del servidor es correcta.
            if (!response.ok) {
                throw new Error('Error al cargar el glosario. Red no disponible o archivo no encontrado.');
            }
            return response.json(); // Convertimos la respuesta a formato JSON.
        })
        .then(data => {
            glossaryData = data.terms; // Guardamos la lista de términos, no el objeto completo.
            // Una vez cargados los datos, iniciamos la aplicación.
            initializeApp();
        })
        .catch(error => {
            // Si hay un error al cargar, lo mostramos en la consola y en la pantalla.
            console.error('Error fatal:', error);
            mainContent.innerHTML = `<div class="text-center text-red-500 p-8">
                <h2 class="font-bold text-xl mb-2">Houston, tenemos un problema...</h2>
                <p>No se pudo cargar el archivo <code>glossary.json</code>.</p>
                <p class="text-sm mt-2">Revisa la consola (F12) para ver el error técnico.</p>
                <p class="text-sm mt-1">Asegúrate de que el archivo exista en la raíz del proyecto.</p>
            </div>`;
        });

    // ========================================================================
    // --- 3. FUNCIÓN DE ARRANQUE PRINCIPAL ---
    // Esta función se llama una vez que los datos del glosario están listos.
    // Pone en marcha todas las funcionalidades de la página.
    // ========================================================================
    function initializeApp() {
        // --- 3.1. Configuración Inicial ---
        setupNav();                 // Dibuja la barra de navegación con las letras.
        mostrarAbrazoInicial();     // Muestra la pantalla de bienvenida.

        // --- 3.2. Animación de Fondo ---
        resizeCanvas();
        initRhizome();
        animate();

        // --- 3.3. Eventos Globales ---
        // Asignamos eventos a elementos que existen desde el inicio.
        homeButtonDesktop.addEventListener('click', handleHomeClick);
        homeButtonMobile.addEventListener('click', handleHomeClick);

        // Cierra el modal si se hace clic fuera de él.
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                cerrarEspacioDeReflexion();
            }
        });

        // Reajusta el canvas si cambia el tamaño de la ventana.
        window.addEventListener('resize', () => {
            resizeCanvas();
            initRhizome();
        });
    }

    // ========================================================================
    // --- 4. RENDERIZADO DE VISTAS ---
    // Funciones encargadas de "dibujar" el contenido principal en la pantalla.
    // ========================================================================

    /**
     * Muestra la pantalla de bienvenida (portada).
     */
    function mostrarAbrazoInicial() {
        mainContent.innerHTML = `
            <div class="content-slide h-full flex flex-col justify-between items-center text-center relative">
                <!-- Banner Superior -->
                <div class="w-full bg-purple-100/50 text-purple-800 text-sm py-1 text-center absolute top-0 left-0">
                    Este Glosario hace parte de las herramientas generadas por la <strong>Escuela de Formación Política Feminista Las Juanas</strong>
                </div>

                <!-- Contenido Principal -->
                <div class="flex-grow flex flex-col justify-center pt-10">
                    <h3 class="text-2xl text-purple-700 font-semibold font-title">Palabras que nutren nuestro mundo</h3>
                    <h1 class="text-4xl md:text-6xl font-extrabold text-gray-800 mt-4 tracking-tighter font-title">Abecedario Político</h1>
                    <p class="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mt-6 italic">"Nombrar es el primer paso para transformar."</p>
                    <p class="text-sm md:text-md text-gray-700 max-w-3xl mx-auto mt-2">Este glosario es una herramienta viva, una invitación a apropiarnos de los conceptos que nos permiten analizar nuestra realidad con una mirada crítica y, sobre todo, construir nuevos horizontes de posibilidad.</p>
                    <div class="mt-8 flex justify-center items-center gap-4">
                        <input id="search-input" type="text" placeholder="Buscar un término..." class="w-full max-w-xs p-2 rounded-full border-2 border-stone-300 bg-white/50 focus:border-purple-400 focus:ring-0 outline-none transition-colors">
                        <button id="random-term-btn" class="bg-green-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105">
                            Aleatorio
                        </button>
                    </div>
                </div>

                <!-- Co-creadoras -->
                <div class="flex-shrink-0 w-full pt-4 mb-10 pb-2">
                    <h4 class="font-bold text-gray-700 mb-3 font-title">Co-creación de la escuela:</h4>
                    <div class="flex flex-wrap gap-x-6 gap-y-2 justify-center text-sm">
                        <a href="https://www.instagram.com/electas__/" target="_blank" class="creator-link">Movimiento Político Electas</a>
                        <a href="https://www.institutoupdate.org.br/es/" target="_blank" class="creator-link">Instituto Update</a>
                        <a href="https://www.instagram.com/ongrecuperandoidentidad/" target="_blank" class="creator-link">Corporación Recuperando Identidad</a>
                    </div>
                </div>

                <!-- Pie de Página -->
                <footer class="w-full bg-purple-700 text-white text-center p-2 absolute bottom-0 left-0 text-xs">
                    Diseño por <a href="https://www.linkedin.com/in/8aanamaria/" target="_blank" class="font-bold underline hover:text-purple-200">AnaMar8a</a>
                </footer>
            </div>
        `;
        // Asignamos los eventos a los nuevos botones que acabamos de crear.
        document.getElementById('random-term-btn').addEventListener('click', mostrarTerminoAleatorio);
        document.getElementById('search-input').addEventListener('input', manejarBusqueda);
    }

    /**
     * Muestra la lista de términos para una letra específica.
     * @param {string} letter - La letra seleccionada (ej. 'A', 'B', 'C').
     */
    function renderizarListaDeTerminos(letter) {
        const terms = glossaryData.filter(item => item.letter === letter);
        const termButtons = terms.map(term =>
            `<button class="term-link block w-full text-left text-2xl md:text-3xl font-bold text-gray-700 p-3 md:p-4 rounded-xl hover:bg-white/60 transition-colors" data-term="${term.term}">${term.term}</button>`
        ).join('');

        mainContent.innerHTML = `
            <div class="content-slide">
                <h2 class="text-6xl md:text-8xl font-extrabold text-purple-800/10 mb-8">${letter}</h2>
                <div class="space-y-3">${termButtons}</div>
            </div>
        `;

        // Asignamos un evento a cada botón de término recién creado.
        document.querySelectorAll('.term-link').forEach(button => {
            button.addEventListener('click', () => {
                abrirCuidadoDeLaPalabra(button.dataset.term);
            });
        });
    }

    // ========================================================================
    // --- 5. LÓGICA DEL MODAL Y BÚSQUEDA ---
    // Funciones que controlan el pop-up de definiciones y la búsqueda.
    // ========================================================================

    /**
     * Abre el modal con la información de un término específico.
     * @param {string} termName - El nombre exacto del término a mostrar.
     */
    function abrirCuidadoDeLaPalabra(termName) {
        const termData = glossaryData.find(item => item.term === termName);
        if (!termData) {
            console.error(`No se encontró el término: ${termName}`);
            return;
        }

        const contentHTML = `
            <button id="close-modal-inner" class="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-3xl font-bold" aria-label="Volver">&times;</button>
            <h2 class="text-3xl md:text-4xl font-extrabold font-title text-gray-800 mb-6">${termData.term}</h2>
            <div class="prose prose-lg max-w-none text-gray-700">
                <p>${termData.definition}</p>
                <div class="mt-6 p-4 rounded-xl bg-[#fbf9f6]">
                    <h4 class="font-bold text-gray-800">Ejemplo cotidiano:</h4>
                    <p class="italic">${termData.practice}</p>
                </div>
            </div>
        `;
        modalContent.innerHTML = contentHTML;

        // Hacemos visible el modal con una transición suave.
        modalOverlay.classList.remove('opacity-0', 'pointer-events-none');
        modalContent.classList.remove('scale-95', 'opacity-0');

        document.getElementById('close-modal-inner').addEventListener('click', cerrarEspacioDeReflexion);
    }

    /**
     * Cierra el modal de definición.
     */
    function cerrarEspacioDeReflexion() {
        modalOverlay.classList.add('opacity-0', 'pointer-events-none');
        modalContent.classList.add('scale-95', 'opacity-0');
    }

    /**
     * Selecciona un término al azar del glosario y lo muestra en el modal.
     */
    function mostrarTerminoAleatorio() {
        const randomIndex = Math.floor(Math.random() * glossaryData.length);
        const randomTerm = glossaryData[randomIndex];
        abrirCuidadoDeLaPalabra(randomTerm.term);
    }

    /**
     * Filtra y muestra los resultados de búsqueda mientras el usuario escribe.
     * @param {Event} event - El evento 'input' del campo de búsqueda.
     */
    function manejarBusqueda(event) {
        const searchTerm = event.target.value.toLowerCase();

        // Buscamos o creamos el contenedor para los resultados.
        let resultsContainer = document.getElementById('search-results-container');
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.id = 'search-results-container';
            resultsContainer.className = 'absolute top-24 left-1/2 -translate-x-1/2 w-72 bg-white/90 backdrop-blur-sm shadow-lg rounded-xl p-2 z-20';
            mainContent.appendChild(resultsContainer);
        }

        // Si la búsqueda es muy corta, ocultamos los resultados.
        if (searchTerm.length < 2) {
            resultsContainer.innerHTML = '';
            return;
        }

        const filteredData = glossaryData.filter(item => item.term.toLowerCase().includes(searchTerm));
        const termButtons = filteredData.map(term =>
            `<button class="term-link block w-full text-left text-lg font-bold text-gray-700 p-2 rounded-lg hover:bg-white/60 transition-colors" data-term="${term.term}">${term.term}</button>`
        ).join('');

        resultsContainer.innerHTML = termButtons || `<p class="text-center text-sm text-stone-500 p-2">No se encontraron términos.</p>`;

        // Asignamos eventos a los nuevos botones de resultados.
        document.querySelectorAll('#search-results-container .term-link').forEach(button => {
            button.addEventListener('click', () => {
                abrirCuidadoDeLaPalabra(button.dataset.term);
                // Limpiamos la búsqueda después de hacer clic.
                resultsContainer.innerHTML = '';
                document.getElementById('search-input').value = '';
            });
        });
    }

    // ========================================================================
    // --- 6. NAVEGACIÓN Y MANEJO DE EVENTOS ---
    // Funciones que construyen y gestionan la navegación por letras.
    // ========================================================================

    /**
     * Construye los menús de navegación (escritorio y móvil) dinámicamente.
     */
    function setupNav() {
        alphabetNavDesktop.innerHTML = '';
        alphabetNavMobile.innerHTML = '';

        // Creamos un alfabeto solo con las letras que tienen términos en el glosario.
        const alphabet = [...new Set(glossaryData.map(item => item.letter))].sort();

        alphabet.forEach(letter => {
            // --- Crear link para escritorio ---
            const linkDesktop = document.createElement('a');
            linkDesktop.href = '#';
            linkDesktop.textContent = letter;
            linkDesktop.className = 'nav-link w-12 h-12 flex items-center justify-center rounded-xl font-bold text-purple-800 hover:bg-white/50 transition-all duration-200';
            linkDesktop.dataset.letter = letter;
            alphabetNavDesktop.appendChild(linkDesktop);

            // --- Crear link para móvil ---
            const linkMobile = document.createElement('a');
            linkMobile.href = '#';
            linkMobile.textContent = letter;
            linkMobile.className = 'nav-link h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-lg font-bold text-purple-800 hover:bg-white/50 transition-all duration-200';
            linkMobile.dataset.letter = letter;
            alphabetNavMobile.appendChild(linkMobile);

            // --- Asignar evento a ambos links ---
            const handleNavClick = (e) => {
                e.preventDefault();
                // Marca como activa la letra actual en ambos menús.
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                document.querySelectorAll(`.nav-link[data-letter="${letter}"]`).forEach(l => l.classList.add('active'));
                renderizarListaDeTerminos(letter);
            };

            linkDesktop.addEventListener('click', handleNavClick);
            linkMobile.addEventListener('click', handleNavClick);
        });
    }
    
    /**
     * Maneja el clic en los botones de "inicio" para volver a la portada.
     */
    function handleHomeClick() {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        mostrarAbrazoInicial();
    }


    // ========================================================================
    // --- 7. ANIMACIÓN DE FONDO (RIZOMA) ---
    // Lógica para la animación del canvas que se muestra de fondo.
    // ========================================================================
    let nodes = [];
    const colors = ['#a78bfa', '#c4b5fd', '#d946ef', '#ec4899'];
    const emphasisColor = '#9CA986';
    let startTime = null;
    let animationFrameId; // Para controlar el bucle de animación.

    /**
     * Ajusta el tamaño del canvas al de su contenedor.
     */
    function resizeCanvas() {
        const container = document.getElementById('presentation-container');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }

    /**
     * Define la clase para cada 'nodo' (punto) en la animación.
     */
    class Node {
        constructor(x, y) {
            this.x = x || Math.random() * canvas.width;
            this.y = y || Math.random() * canvas.height;
            this.vx = Math.random() * 0.1 - 0.05; // Movimiento horizontal lento.
            this.vy = Math.random() * 0.1 - 0.05; // Movimiento vertical lento.
            this.radius = Math.random() * 1.5 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = emphasisColor;
            ctx.fill();
        }
    }

    /**
     * Inicializa o reinicia la animación del rizoma.
     */
    function initRhizome() {
        nodes = [];
        startTime = null; // Reinicia el tiempo de crecimiento.
        for (let i = 0; i < 5; i++) { // Empezar con muy pocos nodos.
            nodes.push(new Node());
        }
    }

    /**
     * El bucle de animación principal que se ejecuta en cada frame.
     */
    function animate() {
        if (!startTime) startTime = Date.now();
        const elapsedTime = Date.now() - startTime;
        const growthDuration = 20 * 60 * 1000; // 20 minutos para crecimiento completo.
        const growthFactor = Math.min(elapsedTime / growthDuration, 1);

        // Dibuja un rectángulo semi-transparente para crear un efecto de estela.
        ctx.fillStyle = 'rgba(251, 249, 246, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Aumenta el número de nodos y la distancia de conexión con el tiempo.
        const maxNodes = 5 + Math.floor(growthFactor * 45); // Crecer hasta 50 nodos.
        if (nodes.length < maxNodes && Math.random() < 0.5) {
            nodes.push(new Node());
        }

        const connectionDistance = 100 + growthFactor * 200; // Conexiones crecen hasta 300px.

        // Dibuja las líneas de conexión entre nodos cercanos.
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    const alpha = 0.5 - distance / connectionDistance;
                    const colorIndex = Math.floor((i + j) / 5) % colors.length;
                    // Convierte el color hexadecimal a RGBA para aplicar transparencia.
                    const r = parseInt(colors[colorIndex].slice(1, 3), 16);
                    const g = parseInt(colors[colorIndex].slice(3, 5), 16);
                    const b = parseInt(colors[colorIndex].slice(5, 7), 16);
                    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                    ctx.lineWidth = 0.4;
                    ctx.stroke();
                }
            }
        }

        // Actualiza y dibuja cada nodo.
        nodes.forEach((node) => {
            node.update();
            node.draw();
        });

        // Solicita el próximo frame de animación.
        animationFrameId = requestAnimationFrame(animate);
    }
});

