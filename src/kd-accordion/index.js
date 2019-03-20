/**
 * BLOCK: KD Blocks Accordion Block
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import Accordion from './components/accordion';
import icons from './components/icons';

import './styles/style.scss';
import './styles/editor.scss';

const { __ } = wp.i18n;
const { Component } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText, AlignmentToolbar, BlockControls, InnerBlocks } = wp.editor;

const blockAttributes = {
	accordionTitle: {
		type: 'array',
		selector: '.kd-accordion-title',
		source: 'children'
	},
	accordionText: {
		type: 'array',
		selector: '.kd-accordion-text',
		source: 'children'
	},
	accordionAlignment: {
		type: 'string'
	},
	accordionOpen: {
		type: 'boolean',
		default: false
	}
};

class KDAccordionBlock extends Component {
	render() {
		// Setup the attributes
		const {
			attributes: {
				accordionTitle,
				accordionText,
				accordionAlignment,
				accordionOpen
			},
			isSelected,
			className,
			setAttributes
		} = this.props;

		return [
			// Show the block alignment controls on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={accordionAlignment}
					onChange={value =>
						this.props.setAttributes({ accordionAlignment: value })
					}
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector {...this.props} />,
			// Show the button markup in the editor
			<Accordion {...this.props}>
				<RichText
					tagName="p"
					placeholder={__('Accordion Title', 'kd-blocks')}
					value={accordionTitle}
					className="kd-accordion-title"
					onChange={value =>
						this.props.setAttributes({ accordionTitle: value })
					}
				/>

				<div className="kd-accordion-text">
					<InnerBlocks />
				</div>
			</Accordion>
		];
	}
}

// Register the block
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

	// Render the block components
	edit: KDAccordionBlock,

	// Save the attributes and markup
	save: function(props) {
		// Setup the attributes
		const {
			accordionTitle,
			accordionText,
			accordionAlignment,
			accordionOpen
		} = props.attributes;

		// Save the block markup for the front end
		return (
			<Accordion {...props}>
				<details open={accordionOpen}>
					<summary className="kd-accordion-title">
						<RichText.Content value={accordionTitle} />
					</summary>
					<div className="kd-accordion-text">
						<InnerBlocks.Content />
					</div>
				</details>
			</Accordion>
		);
	}
});
