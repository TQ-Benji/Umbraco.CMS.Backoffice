import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit';
import { UmbModalLayoutContentPickerElement, UmbModalContentPickerData } from './modal-layout-content-picker.element';
import './modal-layout-content-picker.element';

import '../../../../../backoffice/editors/shared/editor-layout/editor-layout.element';

export default {
	title: 'API/Modals/Layouts/Content Picker',
	component: 'umb-modal-layout-content-picker',
	id: 'modal-layout-content-picker',
} as Meta;

const data: UmbModalContentPickerData = {};

export const Overview: Story<UmbModalLayoutContentPickerElement> = () => html`
	<!-- TODO: figure out if generics are allowed for properties: 
	https://github.com/runem/lit-analyzer/issues/149
	https://github.com/runem/lit-analyzer/issues/163 -->
	<umb-modal-layout-content-picker .data=${data as any}></umb-modal-layout-content-picker>
`;