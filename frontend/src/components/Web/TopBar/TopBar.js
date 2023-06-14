import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import {Link} from "react-router-dom";
import { Icon } from '../../../assets';
import {map} from "lodash";
import "./TopBar.scss";

export function TopBar() {
  return (
    <div className="top-bar">
      <Container>
        <div className="top-bar__centrado">
          <Link to="/" className="logo" name="icono">
            <Icon.LogoApp />
          </Link>
          <span className="text">EasySubtitles</span>
        </div>
      </Container>
    </div>
  );
}