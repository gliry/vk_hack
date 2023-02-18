import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import organization from '../img/organization.png';
import './Organization.css';

const Organization = props => (
	<Panel id={props.id}>
		<PanelHeader
			before={<PanelHeaderBack onClick={props.go} data-to="home"/>}
		>
			Организация
		</PanelHeader>
		<img className="Organization" src={organization} alt="Organization"/>
	</Panel>
);

Organization.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
};

export default Organization;
