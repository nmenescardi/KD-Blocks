/**
 * KD Accordion Block
 */

import classnames from 'classnames';
import Inspector from './components/inspector';
import Accordion from './components/accordion';
import icons from './components/icons';
import Heading from './components/Heading';

import './styles/style.scss';
import './styles/editor.scss';

const { __ } = wp.i18n;
const { Component } = wp.element;
const { registerBlockType } = wp.blocks;
const {
	RichText,
	BlockControls,
	InnerBlocks,
	BlockAlignmentToolbar
} = wp.editor;

const blockAttributes = {
	accordionTitle: {
		type: 'array',
		selector: '.kd-accordion-title',
		source: 'children'
	},
	accordionTitleLevel: {
		type: 'string',
		default: 'h3'
	},
	accordionText: {
		type: 'array',
		selector: '.kd-accordion-text',
		source: 'children'
	},
	blockAlignment: {
		type: 'string',
		default: 'wide'
	},
	accordionOpen: {
		type: 'boolean',
		default: true
	},
	plusIcon: {
		type: 'boolean',
		default: false
	},
	iconPositionLeft: {
		type: 'boolean',
		default: false
	},
	shuffleAnimation: {
		type: 'boolean',
		default: true
	}
};

class KDAccordionBlock extends Component {
	render() {
		const {
			attributes: {
				accordionTitle,
				blockAlignment,
				accordionTitleLevel,
				iconPositionLeft,
				plusIcon
			},
			setAttributes
		} = this.props;

		return [
			<BlockControls key="controls">
				<BlockAlignmentToolbar
					value={blockAlignment}
					onChange={blockAlignment => setAttributes({ blockAlignment })}
					controls={['wide', 'full']}
				/>
			</BlockControls>,

			<Inspector {...this.props} />,

			<Accordion {...this.props}>
				<section
					className={classnames(
						'open',
						{ 'icon-left': iconPositionLeft },
						{ 'icon-right': !iconPositionLeft },
						{
							'plus-icon': !plusIcon
						} /* Change requirement, now they are reversed */,
						{ 'row-icon': plusIcon }
					)}
				>
					<RichText
						tagName={accordionTitleLevel}
						value={accordionTitle}
						className="kd-accordion-title kd-accordion--headline"
						onChange={value =>
							this.props.setAttributes({ accordionTitle: value })
						}
					/>
				</section>
				<div className="kd-accordion-text">
					<InnerBlocks />
				</div>
			</Accordion>
		];
	}
}

registerBlockType('kd-blocks/kd-accordion', {
	title: __('KD Accordion', 'kd-blocks'),
	description: __(
		'Accordion block: Includes title and inner blocks.',
		'kd-blocks'
	),
	icon: icons.accordion,
	category: 'kd-blocks',
	keywords: [__('accordion', 'kd-blocks'), __('list', 'kd-blocks')],
	attributes: blockAttributes,

	getEditWrapperProps({ blockAlignment }) {
		if ('full' === blockAlignment) {
			return { 'data-align': blockAlignment };
		}
	},

	edit: KDAccordionBlock,

	save: function(props) {
		const {
			accordionTitle,
			plusIcon,
			accordionOpen,
			iconPositionLeft,
			blockAlignment,
			accordionTitleLevel
		} = props.attributes;

		return (
			<Accordion {...props}>
				<section
					className={classnames(
						{ open: accordionOpen },
						{ 'icon-left': iconPositionLeft },
						{ 'icon-right': !iconPositionLeft },
						{
							'plus-icon': !plusIcon
						} /* Change requirement, now they are reversed */,
						{ 'row-icon': plusIcon }
					)}
				>
					<Heading
						accordionTitleLevel={accordionTitleLevel}
						className="kd-accordion-title kd-accordion--headline"
					>
						<RichText.Content value={accordionTitle} />
					</Heading>

					<div className="kd-accordion-text kd-accordion--content">
						<InnerBlocks.Content />
					</div>
				</section>
			</Accordion>
		);
	}
});
