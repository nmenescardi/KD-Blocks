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
			containerBackgroundColorOne,
			containerBackgroundColorTwo,
			columnOneDimRatio,
			columnTwoDimRatio,
			containerImgURLOne,
			containerImgIDOne,
			containerImgURLTwo,
			containerImgIDTwo,
			rowClasses,
			columnOneClasses,
			columnTwoClasses,
			containerImgAltOne,
			containerImgAltTwo
		} = this.props.attributes;
		const { setAttributes } = this.props;

		const onSelectImageOne = img => {
			setAttributes({
				containerImgIDOne: img.id,
				containerImgURLOne: img.url,
				containerImgAltOne: img.alt
			});
		};

		const onRemoveImageOne = () => {
			setAttributes({
				containerImgIDOne: null,
				containerImgURLOne: null,
				containerImgAltOne: null
			});
		};

		const onSelectImageTwo = img => {
			setAttributes({
				containerImgIDTwo: img.id,
				containerImgURLTwo: img.url,
				containerImgAltTwo: img.alt
			});
		};

		const onRemoveImageTwo = () => {
			setAttributes({
				containerImgIDTwo: null,
				containerImgURLTwo: null,
				containerImgAltTwo: null
			});
		};

		const onChangeBackgroundColorOne = value =>
			setAttributes({ containerBackgroundColorOne: value });

		const onChangeBackgroundColorTwo = value =>
			setAttributes({ containerBackgroundColorTwo: value });

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

				<PanelBody title={__('Background Column 1')} initialOpen={true}>
					<p>{__('Select a background image:')}</p>
					<MediaUpload
						onSelect={onSelectImageOne}
						type="image"
						value={containerImgIDOne}
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

								{containerImgURLOne && !!containerImgURLOne.length && (
									<IconButton
										className="kd-container-inspector-media"
										label={__('Remove Image')}
										icon="dismiss"
										onClick={onRemoveImageOne}
									>
										{__('Remove')}
									</IconButton>
								)}
							</div>
						)}
					/>

					{containerImgURLOne && !!containerImgURLOne.length && (
						<RangeControl
							label={__('Image Opacity')}
							value={columnOneDimRatio}
							onChange={value =>
								this.props.setAttributes({ columnOneDimRatio: value })
							}
							min={0}
							max={100}
							step={10}
						/>
					)}

					<PanelColorSettings
						title={__('Background Color Column 1')}
						initialOpen={true}
						colorSettings={[
							{
								value: containerBackgroundColorOne,
								label: __('Background Color'),
								onChange: onChangeBackgroundColorOne
							}
						]}
					/>
				</PanelBody>

				<PanelBody title={__('Background Column 2')} initialOpen={true}>
					<p>{__('Select a background image:')}</p>
					<MediaUpload
						onSelect={onSelectImageTwo}
						type="image"
						value={containerImgIDTwo}
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

								{containerImgURLTwo && !!containerImgURLTwo.length && (
									<IconButton
										className="kd-container-inspector-media"
										label={__('Remove Image')}
										icon="dismiss"
										onClick={onRemoveImageTwo}
									>
										{__('Remove')}
									</IconButton>
								)}
							</div>
						)}
					/>

					{containerImgURLTwo && !!containerImgURLTwo.length && (
						<RangeControl
							label={__('Image Opacity')}
							value={columnTwoDimRatio}
							onChange={value =>
								this.props.setAttributes({ columnTwoDimRatio: value })
							}
							min={0}
							max={100}
							step={10}
						/>
					)}

					<PanelColorSettings
						title={__('Background Color Column 2')}
						initialOpen={true}
						colorSettings={[
							{
								value: containerBackgroundColorTwo,
								label: __('Background Color'),
								onChange: onChangeBackgroundColorTwo
							}
						]}
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
