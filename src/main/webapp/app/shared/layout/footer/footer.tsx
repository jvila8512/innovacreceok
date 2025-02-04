import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';
import { Chip } from 'primereact/chip';
import { Link } from 'react-router-dom';
import { Accordion, AccordionTab } from 'primereact/accordion';

const Footer = () => (
  <div className="footer mt-4 ">
    <Row>
      <Col md="4">
        <Accordion expandIcon="pi pi-chevron-down" collapseIcon="pi pi-chevron-up">
          <AccordionTab className="text-100 text-justify" header="¿Qué es Hubinab?">
            <h6>
              Es un espacio para articular actores de innovaciones, impulsar a Ecosistema de innovaciones, fortalecer comunidades
              innovadoras, y conectar con ChangeMacker, con uso de innovación abierta desde un entorno on-line.
            </h6>
          </AccordionTab>
        </Accordion>
      </Col>
      <Col md="4">
        <Accordion expandIcon="pi pi-chevron-down" collapseIcon="pi pi-chevron-up">
          <AccordionTab className="text-100 " header="¿Qué es Innovación Abierta?">
            <h6>
              Es un modelo de innovación concebido como unos de los método de la inteligencia colectiva, que ayuda a fortalecer la
              competitividad, el crecimiento y desarrollo economico, desde lo interno y externo a las organizaciones y territorios.
            </h6>
          </AccordionTab>
        </Accordion>
      </Col>
      <Col md="4">
        <Accordion expandIcon="pi pi-chevron-down" collapseIcon="pi pi-chevron-up">
          <AccordionTab className="text-100 " header="¿Por qué elegirnos?">
            <h6>
              <ul className="list-disc">
                <li>Somos un instrumento de fortalecimiento a la Transformación digital.</li>
                <li>
                  Colaboras, participas e interactúas desde el conocimiento, por tú bienestar y el de la familia, con agentes de
                  innovaciones y de cambio,de forma ilimitada, y accedes de forma gratuita al Libro de Registro de Innovaciones de los
                  territorios.
                </li>
                <li>Con nosotros creces económicamente desde un enfoque ganar-ganar.</li>
                <li>
                  Te ayudamos impulsando y promoviendo las ideas creativas, proyectos y negocios, desde la Economía del Conocimiento e
                  Innovación.
                </li>
              </ul>
            </h6>
          </AccordionTab>
        </Accordion>
      </Col>
    </Row>

    <Row>
      <Col md="12">
        <p className="text-white">
          ©2025 Hubinab | Información Legal | Si tienes alguna pregunta acerca de nuestra plataforma de innovación abierta on-line, ponte en
          <Link to={`/entidad/contacto/contactar`}>
            <span className="text-blue font-bold mt-2 pl-1"> contacto </span>
          </Link>{' '}
          con nosotros.
        </p>
      </Col>
    </Row>
  </div>
);

export default Footer;
