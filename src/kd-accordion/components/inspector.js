/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const { InspectorControls, BlockDescription } = wp.editor;

// Import Inspector components
const {
	Toolbar,
	Button,
	PanelBody,
	PanelRow,
	RangeControl,
	ToggleControl
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		const { accordionOpen } = this.props.attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody>
					<ToggleControl
						label={__('Open on page load', 'kd-blocks')}
						checked={accordionOpen}
						onChange={() =>
							this.props.setAttributes({ accordionOpen: !accordionOpen })
						}
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
