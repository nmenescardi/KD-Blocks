/**
 * KD Two Columns Block
 */
import classnames from 'classnames';
import Inspector from './components/inspector';
import './components/column';

import './styles/style.scss';
import './styles/editor.scss';
import icons from './components/icons';

const { dispatch, select } = wp.data;

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
			setAttributes,
			clientId
		} = this.props;

		const TEMPLATE = [
			['kd-blocks/kd-column', { className: columnOneClasses }],
			['kd-blocks/kd-column', { className: columnTwoClasses }]
		];

		var col1 = select('core/editor').getBlocksByClientId(clientId)[0]
			.innerBlocks[0];
		if (col1) {
			dispatch('core/editor').updateBlockAttributes(col1.clientId, {
				className: classnames('kd-col-1', columnOneClasses),
				containerBackgroundColor: containerBackgroundColorOne,
				containerImgURL: containerImgURLOne,
				containerImgID: containerImgIDOne,
				containerImgAlt: containerImgAltOne,
				containerDimRatio: columnOneDimRatio
			});
		}

		var col2 = select('core/editor').getBlocksByClientId(clientId)[0]
			.innerBlocks[1];
		if (col2) {
			dispatch('core/editor').updateBlockAttributes(col2.clientId, {
				className: classnames('kd-col-2', columnTwoClasses),
				containerBackgroundColor: containerBackgroundColorTwo,
				containerImgURL: containerImgURLTwo,
				containerImgID: containerImgIDTwo,
				containerImgAlt: containerImgAltTwo,
				containerDimRatio: columnTwoDimRatio
			});
		}

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
					<InnerBlocks template={TEMPLATE} templateLock="all" />
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

	save: function(props) {
		const {
			attributes: { containerWidth, rowClasses }
		} = props;
		return (
			<div className="kd-block-two-col">
				<div
					className={classnames('row', 'kd-row', rowClasses, {
						['align' + containerWidth]: containerWidth
					})}
				>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}
});
