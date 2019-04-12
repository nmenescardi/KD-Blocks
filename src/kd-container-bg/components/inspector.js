/**
 * Inspector Controls
 */

const { __ } = wp.i18n;
const { Component } = wp.element;

const {
	InspectorControls,
	ColorPalette,
	PanelColorSettings,
	MediaUpload
} = wp.editor;

const {
	PanelBody,
	RangeControl,
	IconButton,
	TextControl,
	ToggleControl
} = wp.components;

export default class Inspector extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		const {
			containerBackgroundColor,
			containerDimRatio,
			containerImgURL,
			containerImgID,
			containerClassSwitch
		} = this.props.attributes;
		const { setAttributes } = this.props;

		const onSelectImage = img => {
			setAttributes({
				containerImgID: img.id,
				containerImgURL: img.url
			});
		};

		const onRemoveImage = () => {
			setAttributes({
				containerImgID: null,
				containerImgURL: null
			});
		};

		const onChangeBackgroundColor = value =>
			setAttributes({ containerBackgroundColor: value });

		return (
			<InspectorControls key="inspector">
				<PanelBody title={__('Extra Class', 'kd-blocks')} initialOpen={true}>
					<ToggleControl
						label={__('Add Container class', 'kd-blocks')}
						checked={containerClassSwitch}
						onChange={() =>
							this.props.setAttributes({
								containerClassSwitch: !containerClassSwitch
							})
						}
					/>
				</PanelBody>

				<PanelBody title={__('Background Options')} initialOpen={true}>
					<p>{__('Select a background image:')}</p>
					<MediaUpload
						onSelect={onSelectImage}
						type="image"
						value={containerImgID}
						render={({ open }) => (
							<div>
								<IconButton
									className="kd-container-inspector-media"
									label={__('Edit image')}
									icon="format-image"
									onClick={open}
								>
									{__('Select Image')}
								</IconButton>

								{containerImgURL && !!containerImgURL.length && (
									<IconButton
										className="kd-container-inspector-media"
										label={__('Remove Image')}
										icon="dismiss"
										onClick={onRemoveImage}
									>
										{__('Remove')}
									</IconButton>
								)}
							</div>
						)}
					/>

					<RangeControl
						label={__('Image Opacity')}
						value={containerDimRatio}
						onChange={value =>
							this.props.setAttributes({ containerDimRatio: value })
						}
						min={0}
						max={100}
						step={1}
					/>

					<PanelColorSettings
						title={__('Background Color')}
						initialOpen={true}
						colorSettings={[
							{
								value: containerBackgroundColor,
								label: __('Background Color'),
								onChange: onChangeBackgroundColor
							}
						]}
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
