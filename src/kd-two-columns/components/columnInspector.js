/**
 * Inspector Controls
 */

const { __ } = wp.i18n;
const { Component } = wp.element;

const { InspectorControls, PanelColorSettings, MediaUpload } = wp.editor;

const { PanelBody, RangeControl, IconButton } = wp.components;

export default class Inspector extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		const {
			containerImgURL,
			containerImgID,
			columnDimRatio,
			containerBackgroundColor
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
				<PanelBody title={__('Background Column')} initialOpen={true}>
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
							value={columnDimRatio}
							onChange={value =>
								this.props.setAttributes({ columnDimRatio: value })
							}
							min={0}
							max={100}
							step={10}
						/>
					)}

					<PanelColorSettings
						title={__('Background Color Column')}
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
