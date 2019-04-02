/**
 * Inspector Controls
 */

const { __ } = wp.i18n;
const { Component } = wp.element;
const { InspectorControls } = wp.editor;

const {
	Toolbar,
	Button,
	PanelBody,
	PanelRow,
	SelectControl,
	ToggleControl
} = wp.components;

export default class Inspector extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		const {
			accordionOpen,
			plusIcon,
			iconPositionLeft,
			shuffleAnimation,
			accordionTitleLevel
		} = this.props.attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody>
					<SelectControl
						label={__('Title Heading Levels', 'kd-blocks')}
						value={accordionTitleLevel}
						options={[
							{ value: 'p', label: __('Paragraph', 'kd-blocks') },
							{ value: 'h1', label: __('H1', 'kd-blocks') },
							{ value: 'h2', label: __('H2', 'kd-blocks') },
							{ value: 'h3', label: __('H3', 'kd-blocks') },
							{ value: 'h4', label: __('H4', 'kd-blocks') },
							{ value: 'h5', label: __('H5', 'kd-blocks') },
							{ value: 'h6', label: __('H6', 'kd-blocks') },
							{ value: 'div', label: __('Div', 'kd-blocks') }
						]}
						onChange={accordionTitleLevel =>
							this.props.setAttributes({ accordionTitleLevel })
						}
					/>

					<ToggleControl
						label={__('Open on page load', 'kd-blocks')}
						checked={accordionOpen}
						onChange={() =>
							this.props.setAttributes({ accordionOpen: !accordionOpen })
						}
					/>

					<ToggleControl
						label={__('Custom icon', 'kd-blocks')}
						checked={plusIcon}
						onChange={() => this.props.setAttributes({ plusIcon: !plusIcon })}
					/>

					<ToggleControl
						label={__('Icon Position Left', 'kd-blocks')}
						checked={iconPositionLeft}
						onChange={() =>
							this.props.setAttributes({ iconPositionLeft: !iconPositionLeft })
						}
					/>

					<ToggleControl
						label={__('Shuffle Animation', 'kd-blocks')}
						checked={shuffleAnimation}
						onChange={() =>
							this.props.setAttributes({ shuffleAnimation: !shuffleAnimation })
						}
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
