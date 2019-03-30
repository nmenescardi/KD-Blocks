// TODO: Try to have a separated component to render both Edit and Save function. like 'ColumnComponent'
// TODO: Try to add the inspector in here (sidebar options)

import classnames from 'classnames';
import icons from './icons';
import ColumnContainer from './ColumnContainer';

const { __ } = wp.i18n;
const { InnerBlocks } = wp.editor;
const { registerBlockType } = wp.blocks;

registerBlockType('kd-blocks/kd-column', {
	title: __('Column', 'kd-blocks'),

	parent: ['kd-blocks/kd-two-columns'],

	icon: icons.accordion,

	description: __('A single column within a columns block.'),

	category: 'kd-blocks',

	attributes: {
		className: {
			type: 'string'
		}
	},

	edit: function(props) {
		return (
			<ColumnContainer {...props}>
				<InnerBlocks templateLock={false} />
			</ColumnContainer>
		);
	},

	save(props) {
		return (
			<ColumnContainer {...props}>
				<InnerBlocks.Content />
			</ColumnContainer>
		);
	}
});
