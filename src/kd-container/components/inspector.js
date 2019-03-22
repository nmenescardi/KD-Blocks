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

const { PanelBody, RangeControl, IconButton, TextControl } = wp.components;

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
			contentClasses,
			backgroundClasses,
			containerImgAlt
		} = this.props.attributes;
		const { setAttributes } = this.props;

		const onSelectImage = img => {
			setAttributes({
				containerImgID: img.id,
				containerImgURL: img.url,
				containerImgAlt: img.alt
			});
		};

		const onRemoveImage = () => {
			setAttributes({
				containerImgID: null,
				containerImgURL: null,
				containerImgAlt: null
			});
		};

		const onChangeBackgroundColor = value =>
			setAttributes({ containerBackgroundColor: value });

		return (
			<InspectorControls key="inspector">
				<PanelBody title={__('Extra Class', 'kd-blocks')} initialOpen={true}>
					<TextControl
						label={__('KD Content Class', 'kd-blocks')}
						value={contentClasses}
						onChange={contentClasses => setAttributes({ contentClasses })}
					/>
					<TextControl
						label={__('KD Background Class', 'kd-blocks')}
						value={backgroundClasses}
						onChange={backgroundClasses => setAttributes({ backgroundClasses })}
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

					{containerImgURL && !!containerImgURL.length && (
						<RangeControl
							label={__('Image Opacity')}
							value={containerDimRatio}
							onChange={value =>
								this.props.setAttributes({ containerDimRatio: value })
							}
							min={0}
							max={100}
							step={10}
						/>
					)}

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
