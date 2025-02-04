import React from 'react';

import { Row, Col, Alert } from 'reactstrap';
import { useAppSelector } from 'app/config/store';
import { Translate } from 'react-jhipster';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { AvatarGroup } from 'primereact/avatargroup';

const Administrador = () => {
  const header = <span>Ecosistemas</span>;
  const footer = (
    <span>
      <Button label="Ver todos" icon="pi pi-check" style={{ marginRight: '.25em' }} />
    </span>
  );

  const account = useAppSelector(state => state.authentication.account);

  return (
    <>
      <Row>
        <div className="surface-0 text-700 text-center">
          <div className="text-900 font-bold text-5xl mb-3">Panel del Administrador</div>
        </div>
        {account?.login ? (
          <div>
            <Avatar className="pi pi-users mr-2" size="xlarge" shape="circle" />
            <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
              You are logged in as user {account.login}.
            </Translate>
          </div>
        ) : null}
      </Row>

      <Row>
        <Col md="6" className="pad">
          <Card title="Ecosistemas" footer={footer} className="surface-0 shadow-4 p-3 border-1 border-50 border-round">
            <div className="mr-5 flex align-items-center mt-3">
              <i className="pi pi-users mr-2"></i>
              <span> 332 Usuarios Activos</span>
            </div>
          </Card>
        </Col>
        <Col md="6" className="pad">
          <Card title="Usuarios">
            <Button label="Ver todos los usuarios" className="p-button-raised p-button-rounded" />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default Administrador;
