/**
 * External dependencies
 */
import classnames from 'classnames';
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InnerBlocks, BlockControls, BlockVerticalAlignmentToolbar } = wp.editor;
const { withDispatch, withSelect } = wp.data;
const { compose } = wp.compose;
const { registerBlockType } = wp.blocks;

registerBlockType('kd-blocks/kd-column', {
	title: __('Column'),

	parent: ['kd-blocks/kd-column'],

	icon: icons.accordion,

	description: __('A single column within a columns block.'),

	category: 'kd-blocks',

	attributes: {
		/* verticalAlignment: {
			type: 'string'
		} */
	},
	/* 
	supports: {
		inserter: false,
		reusable: false,
		html: false
	}, */

	edit: props => {
		return (
			<div>
				<InnerBlocks templateLock={false} />
			</div>
		);
	},

	save() {
		return (
			<div>
				<InnerBlocks.Content />
			</div>
		);
	}
});
