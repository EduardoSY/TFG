import React from 'react'
import { Container } from 'semantic-ui-react';
import { TopBar } from '../../components/Web';
import "./ClientLayout.scss";
export function ClientLayout(props) {
    const {children} = props;
  return (
    <div className="client-layout">
        <div className="client-layout__header">
            <TopBar />
        </div>

        {children}

        <div className="client-layout__footer">
            <Container>
                <span>Todos los derechos reservados</span>
                <span>Eduardo Da Silva Yanes</span>
            </Container>
        </div>
    </div>
  )
}
