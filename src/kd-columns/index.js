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
const { Component } = wp.element;

/**
 * Internal dependencies
 */
//import deprecated from './deprecated';
//import edit from './edit';
import icons from './icons';
import { getColumnsTemplate } from './utils';

const ALLOWED_BLOCKS = ['kd-blocks/kd-column'];

const TEMPLATE = [
	[
		'core/columns',
		{},
		[
			['core/column', {}, [['core/image']]],
			[
				'core/column',
				{},
				[['core/paragraph', { placeholder: 'Enter side content...' }]]
			]
		]
	]
];

class KDAcolumns extends Component {
	render() {
		// Setup the attributes
		const { className } = this.props;

		return [
			<div className={className}>
				<InnerBlocks
					template={TEMPLATE}
					templateLock="all"
					allowedBlocks={ALLOWED_BLOCKS}
				/>
			</div>
		];
	}
}

registerBlockType('kd-blocks/kd-columns', {
	title: __('Columns'),
	description: __(
		'Accordion block: Includes title and inner blocks.',
		'kd-blocks'
	),
	icon: icons.accordion,

	category: 'kd-blocks',

	attributes: {},

	description: __(
		'Add a block that displays content in multiple columns, then add whatever content blocks you’d like.'
	),
	/* 
	supports: {
		align: ['wide', 'full'],
		html: false
	}, */

	//deprecated,

	edit: KDAcolumns,

	save() {
		return (
			<div className="a">
				<InnerBlocks.Content />
			</div>
		);
	}
});
