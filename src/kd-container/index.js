/**
 * KD Container Block
 */
import classnames from 'classnames';
import Inspector from './components/inspector';
import Container from './components/container';

import './styles/style.scss';
import './styles/editor.scss';
import icons from './components/icons';

const { __ } = wp.i18n;
const { Component } = wp.element;
const { registerBlockType } = wp.blocks;

const { BlockControls, BlockAlignmentToolbar, InnerBlocks } = wp.editor;

const blockAttributes = {
	containerWidth: {
		type: 'string'
	},
	containerBackgroundColor: {
		type: 'string'
	},
	containerImgURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img'
	},
	containerImgID: {
		type: 'number'
	},
	containerImgAlt: {
		type: 'string',
		source: 'attribute',
		attribute: 'alt',
		selector: 'img'
	},
	contentClasses: {
		type: 'string'
	},
	backgroundClasses: {
		type: 'string'
	},
	containerDimRatio: {
		type: 'number',
		default: 50
	}
};

class KDContainerBlock extends Component {
	render() {
		// Setup the attributes
		const {
			attributes: {
				containerWidth,
				containerImgURL,
				containerImgAlt,
				contentClasses,
				backgroundClasses,
				containerDimRatio
			},
			setAttributes
		} = this.props;

		const onSelectImage = img => {
			setAttributes({
				containerImgID: img.id,
				containerImgURL: img.url,
				containerImgAlt: img.alt
			});
		};

		return [
			<BlockControls>
				<BlockAlignmentToolbar
					value={containerWidth}
					onChange={containerWidth => setAttributes({ containerWidth })}
					controls={['center', 'full']}
				/>
			</BlockControls>,

			<Inspector {...{ setAttributes, ...this.props }} />,

			<Container {...this.props}>
				<div className={classnames('kd-container-inside', contentClasses)}>
					{containerImgURL && !!containerImgURL.length && (
						<div className="kd-container-image-wrap">
							<img
								className={classnames(
									'kd-container-image',
									backgroundClasses,
									dimRatioToClass(containerDimRatio),
									{
										'has-background-dim': containerDimRatio !== 0
									}
								)}
								src={containerImgURL}
								alt={containerImgAlt}
							/>
						</div>
					)}
					<InnerBlocks />
				</div>
			</Container>
		];
	}
}

registerBlockType('kd-blocks/kd-container', {
	title: __('KD Container', 'kd-blocks'),
	description: __(
		'Container Block: Groups inner blocks in a single wrapper.',
		'kd-blocks'
	),
	icon: icons.container,
	category: 'kd-blocks',
	keywords: [__('container', 'kd-blocks'), __('section', 'kd-blocks')],

	attributes: blockAttributes,

	getEditWrapperProps({ containerWidth }) {
		if ('full' === containerWidth) {
			return { 'data-align': containerWidth };
		}
	},

	edit: KDContainerBlock,

	save: function(props) {
		const {
			containerImgURL,
			containerImgAlt,
			containerDimRatio
		} = props.attributes;

		return (
			<Container {...props}>
				<div className="kd-container-inside">
					{containerImgURL && !!containerImgURL.length && (
						<div className="kd-container-image-wrap">
							<img
								className={classnames(
									'kd-container-image',
									dimRatioToClass(containerDimRatio),
									{
										'has-background-dim': containerDimRatio !== 0
									}
								)}
								src={containerImgURL}
								alt={containerImgAlt}
							/>
						</div>
					)}

					<InnerBlocks.Content />
				</div>
			</Container>
		);
	}
});

function dimRatioToClass(ratio) {
	return ratio === 0 || ratio === 50
		? null
		: 'has-background-dim-' + 10 * Math.round(ratio / 10);
}
