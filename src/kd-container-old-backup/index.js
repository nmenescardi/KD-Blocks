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
	containerClassSwitch: {
		type: 'boolean',
		default: true
	},
	/* 	contentClasses: {
		type: 'string'
	},
	backgroundClasses: {
		type: 'string'
	}, */
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
				containerImgID,
				containerImgAlt,
				containerClassSwitch,
				/* contentClasses,
				backgroundClasses, */
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

		const responsiveImageClass = `wp-image-${containerImgID}`;

		return [
			<BlockControls>
				<BlockAlignmentToolbar
					value={containerWidth}
					onChange={containerWidth => setAttributes({ containerWidth })}
					controls={['wide', 'full']}
				/>
			</BlockControls>,

			<Inspector {...{ setAttributes, ...this.props }} />,

			<Container {...this.props}>
				<div
					className={classnames('kd-container-inside', {
						container: containerClassSwitch
					})}
				>
					{containerImgURL && !!containerImgURL.length && (
						<div className="kd-container-image-wrap">
							<img
								className={classnames(
									'kd-container-image',
									responsiveImageClass,
									//backgroundClasses,
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
			containerImgID,
			containerImgAlt,
			containerDimRatio,
			containerClassSwitch
		} = props.attributes;

		const responsiveImageClass = `wp-image-${containerImgID}`;

		return (
			<Container {...props}>
				<div
					className={classnames('kd-container-inside', {
						container: containerClassSwitch
					})}
				>
					{containerImgURL && !!containerImgURL.length && (
						<div className="kd-container-image-wrap">
							<img
								className={classnames(
									'kd-container-image',
									responsiveImageClass,
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
					<div className="kd-container-content">
						<InnerBlocks.Content />
					</div>
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
