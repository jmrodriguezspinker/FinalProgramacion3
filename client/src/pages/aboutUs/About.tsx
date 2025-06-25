import React from "react";
import "./aboutUs.scss";

const AboutUs: React.FC = () => {
  return (
    <section className="container">
      <section className="about-content">
        <h1>Sobre Nosotros</h1>
        <h2>Nuestra Historia, Misión y Compromiso con la Calidad</h2>

        <article>
          <h2>Nuestra Historia</h2>
          <p>
            <strong>A&E Boutique</strong> nació con la visión de ofrecer moda femenina accesible, versátil y con propósito.
            Inspiradas por la diversidad y autenticidad de cada mujer, creamos una marca de ropa que celebra el estilo individual en todas sus formas.
          </p>
          <p>
            Desde nuestros primeros diseños hasta las colecciones actuales, apostamos por prendas que combinan calidad, comodidad y tendencia. 
            Creemos que vestirse es una forma de expresión, y nuestra ropa está hecha para ayudarte a contar tu historia con estilo y confianza.
          </p>
        </article>

        <article>
          <h2 className="our-mission">Nuestra Misión</h2>
          <p>
            En <strong>A&E Boutique</strong>, nuestra misión es democratizar la moda femenina ofreciendo <em>ropa para todas</em>, sin sacrificar estilo ni autenticidad. 
            Diseñamos pensando en la mujer moderna, segura y única.
          </p>
          <p>
            Nos comprometemos a crear colecciones que reflejen tanto la elegancia clásica como las tendencias contemporáneas, 
            asegurando que siempre encuentres algo que se ajuste a ti y a tu estilo de vida.
          </p>
        </article>

        <article>
          <h2 className="commitment">Comprometidas con la Calidad</h2>
          <p>
            Cada pieza de <strong>A&E Boutique</strong> es elaborada con materiales seleccionados y bajo estrictos estándares de calidad.
            Valoramos la durabilidad y el confort tanto como el diseño.
          </p>
          <p>
            Nuestro compromiso es contigo y con el planeta. Por eso trabajamos constantemente para adoptar prácticas más responsables y sostenibles 
            en todos nuestros procesos, pensando en un futuro mejor.
          </p>
        </article>
      </section>
    </section>
  );
};

export default AboutUs;
