/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const { InnerBlocks } = wp.editor;
const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import icons from './icons';

registerBlockType('kd-blocks/kd-columns', {
	title: __('Columns'),
	description: __(
		'Accordion block: Includes title and inner blocks.',
		'kd-blocks'
	),
	icon: icons.accordion,

	category: 'kd-blocks',

	attributes: {
		columns: {
			type: 'number',
			default: 2
		},
		verticalAlignment: {
			type: 'string'
		}
	},

	description: __(
		'Add a block that displays content in multiple columns, then add whatever content blocks you’d like.'
	),

	supports: {
		align: ['wide', 'full'],
		html: false
	},

	deprecated,

	edit,

	save({ attributes }) {
		const { columns, verticalAlignment } = attributes;

		const wrapperClasses = classnames(`has-${columns}-columns`, {
			[`are-vertically-aligned-${verticalAlignment}`]: verticalAlignment
		});

		return (
			<div className={wrapperClasses}>
				<InnerBlocks.Content />
			</div>
		);
	}
});
