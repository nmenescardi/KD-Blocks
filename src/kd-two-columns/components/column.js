/**
 * External dependencies
 */
import classnames from 'classnames';
import icons from './icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InnerBlocks } = wp.editor;
const { registerBlockType } = wp.blocks;

registerBlockType('kd-blocks/kd-column', {
	title: __('Column'),

	parent: ['kd-blocks/kd-two-columns'],

	icon: icons.accordion,

	description: __('Aaaaa single column within a columns block.'),

	category: 'kd-blocks',

	attributes: {
		/* className: {
			type: 'string'
		} */
	},
	/* 
	supports: {
		inserter: false,
		reusable: false,
		html: false
	}, */

	edit: function(props) {
		const {
			attributes: { className }
		} = props;
		//const { className } = this.props.attributes;
		return (
			<div className={classnames('algodon', className)}>
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
