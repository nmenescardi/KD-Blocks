/**
 * KD Two Columns Block
 */
import classnames from 'classnames';
import Inspector from './components/inspector';
import Container from './components/container';
import './components/column';

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
	containerBackgroundColorOne: {
		type: 'string'
	},
	containerBackgroundColorTwo: {
		type: 'string'
	},
	containerImgURLOne: {
		type: 'string'
	},
	containerImgURLTwo: {
		type: 'string'
	},
	containerImgIDOne: {
		type: 'number'
	},
	containerImgIDTwo: {
		type: 'number'
	},
	containerImgAltOne: {
		type: 'string',
		source: 'attribute',
		attribute: 'alt',
		selector: 'img'
	},
	containerImgAltTwo: {
		type: 'string',
		source: 'attribute',
		attribute: 'alt',
		selector: 'img'
	},
	rowClasses: {
		type: 'string'
	},
	columnOneClasses: {
		type: 'string'
	},
	columnTwoClasses: {
		type: 'string'
	},
	columnOneDimRatio: {
		type: 'number',
		default: 50
	},
	columnTwoDimRatio: {
		type: 'number',
		default: 50
	}
};

class KDTwoColumnsBlock extends Component {
	render() {
		// Setup the attributes
		const {
			attributes: {
				containerWidth,
				containerBackgroundColorOne,
				containerBackgroundColorTwo,
				containerImgURLOne,
				containerImgURLTwo,
				containerImgIDOne,
				containerImgIDTwo,
				containerImgAltOne,
				containerImgAltTwo,
				rowClasses,
				columnOneClasses,
				columnTwoClasses,
				columnOneDimRatio,
				columnTwoDimRatio
			},
			setAttributes
		} = this.props;

		//const ALLOWED_BLOCKS = ['kd-blocks/kd-column'];
		/* 
		const TEMPLATE = [
			[
				'core/columns',
				{},
				[
					['kd-blocks/kd-column', { className: 'aaaaaaaaa' }],
					['kd-blocks/kd-column', { className: 'bbbbbbbbbb' }]
				]
			]
		]; */

		const TEMPLATE = [['kd-blocks/kd-column', { className: columnOneClasses }]];

		return [
			<BlockControls>
				<BlockAlignmentToolbar
					value={containerWidth}
					onChange={containerWidth => setAttributes({ containerWidth })}
					controls={['center', 'full']}
				/>
			</BlockControls>,

			<Inspector
				{...{
					setAttributes,
					...this.props
				}}
			/>,

			<div className="kd-block-two-col">
				<div
					className={classnames('row', 'kd-row', rowClasses, {
						['align' + containerWidth]: containerWidth
					})}
				>
					<InnerBlocks
						template={TEMPLATE}
						//templateLock="all"
						//allowedBlocks={ALLOWED_BLOCKS}
					/>
					{/* 
					<div className={classnames('kd-col-1', columnOneClasses)}>
						<Container containerBackgroundColor={containerBackgroundColorOne}>
							{containerImgURLOne && !!containerImgURLOne.length && (
								<div className="kd-container-image-wrap">
									<img
										className={classnames(
											'kd-container-image',
											dimRatioToClass(columnOneDimRatio),
											{
												'has-background-dim': columnOneDimRatio !== 0
											}
										)}
										src={containerImgURLOne}
										alt={containerImgAltOne}
									/>
								</div>
							)}
						</Container>
					</div> */}
					{/* <div className={classnames('kd-col-2', columnTwoClasses)}>
						<Container containerBackgroundColor={containerBackgroundColorTwo}>
							{containerImgURLTwo && !!containerImgURLTwo.length && (
								<div className="kd-container-image-wrap">
									<img
										className={classnames(
											'kd-container-image',
											dimRatioToClass(columnTwoDimRatio),
											{
												'has-background-dim': columnTwoDimRatio !== 0
											}
										)}
										src={containerImgURLTwo}
										alt={containerImgAltTwo}
									/>
								</div>
							)}
						</Container>
					</div> */}
				</div>
			</div>
		];
	}
}

registerBlockType('kd-blocks/kd-two-columns', {
	title: __('KD Two Columns', 'kd-blocks'),
	description: __(
		'Two Columns Container Block: Groups inner blocks inside two column wrappers.',
		'kd-blocks'
	),
	icon: icons.container,
	category: 'kd-blocks',
	keywords: [
		__('container', 'kd-blocks'),
		__('columns', 'kd-blocks'),
		__('two', 'kd-blocks')
	],

	attributes: blockAttributes,

	getEditWrapperProps({ containerWidth }) {
		if ('full' === containerWidth) {
			return { 'data-align': containerWidth };
		}
	},

	edit: KDTwoColumnsBlock,

	/* TODO: Save Function !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  */

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
