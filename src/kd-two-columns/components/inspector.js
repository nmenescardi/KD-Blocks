/**
 * Inspector Controls
 */

const { __ } = wp.i18n;
const { Component } = wp.element;

const { InspectorControls } = wp.editor;

const { PanelBody, TextControl } = wp.components;

export default class Inspector extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		const {
			rowClasses,
			columnOneClasses,
			columnTwoClasses
		} = this.props.attributes;
		const { setAttributes } = this.props;

		return (
			<InspectorControls key="inspector">
				<PanelBody title={__('Extra Classes', 'kd-blocks')} initialOpen={true}>
					<TextControl
						label={__('KD Row Class', 'kd-blocks')}
						value={rowClasses}
						onChange={rowClasses => setAttributes({ rowClasses })}
					/>
					<TextControl
						label={__('KD Column 1 Class', 'kd-blocks')}
						value={columnOneClasses}
						onChange={columnOneClasses => setAttributes({ columnOneClasses })}
					/>
					<TextControl
						label={__('KD Column 2 Class', 'kd-blocks')}
						value={columnTwoClasses}
						onChange={columnTwoClasses => setAttributes({ columnTwoClasses })}
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
