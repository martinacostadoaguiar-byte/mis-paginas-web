// ========================================
// MENÚ MOBILE
// ========================================

const menuButton =
    document.getElementById("menuButton");

const navMenu =
    document.getElementById("navMenu");


menuButton.addEventListener("click", function () {

    navMenu.classList.toggle("active");

});


// ========================================
// CERRAR MENÚ AL TOCAR UN ENLACE
// ========================================

const enlaces =
    document.querySelectorAll("#navMenu a");


enlaces.forEach(function (enlace) {

    enlace.addEventListener("click", function () {

        navMenu.classList.remove("active");

    });

});


// ========================================
// EFECTO AL HACER SCROLL
// ========================================

const elementos =
    document.querySelectorAll(
        ".album, .gallery-item, .social-card, .timeline > div"
    );


const observer =
    new IntersectionObserver(

        function (entradas) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add(
                        "show"
                    );

                    observer.unobserve(
                        entrada.target
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


elementos.forEach(function (elemento) {

    observer.observe(elemento);

});


// ========================================
// CAMBIAR NAVBAR AL HACER SCROLL
// ========================================

window.addEventListener("scroll", function () {

    const navbar =
        document.querySelector(".navbar");


    if (window.scrollY > 80) {

        navbar.style.background =
            "rgba(8,8,8,0.96)";

    } else {

        navbar.style.background =
            "rgba(8,8,8,0.82)";

    }

});


// ========================================
// BOTONES DE ALBUM
// ========================================

const albums =
    document.querySelectorAll(".album");


albums.forEach(function (album) {

    const play =
        album.querySelector(".play");


    play.addEventListener("click", function () {

        const spotify =
            album.querySelector("a");


        if (spotify) {

            window.open(
                spotify.href,
                "_blank"
            );

        }

    });

});


// ========================================
// EFECTO DEL MOUSE EN EL HERO
// ========================================

const hero =
    document.querySelector(".hero");


hero.addEventListener(
    "mousemove",
    function (event) {

        const x =
            (event.clientX / window.innerWidth - 0.5) * 10;

        const y =
            (event.clientY / window.innerHeight - 0.5) * 10;


        const content =
            document.querySelector(".hero-content");


        content.style.transform =
            "translate(" + x + "px," +
            y + "px)";

    }
);


hero.addEventListener(
    "mouseleave",
    function () {

        const content =
            document.querySelector(".hero-content");


        content.style.transform =
            "translate(0,0)";

    }
);
