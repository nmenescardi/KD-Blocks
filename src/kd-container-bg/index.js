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
		type: 'string'
	},
	containerImgID: {
		type: 'number'
	},
	containerClassSwitch: {
		type: 'boolean',
		default: false
	},
	containerDimRatio: {
		type: 'number',
		default: 50
	},
	clientIdGenerated: {
		type: 'string',
		default: 'empty'
	}
};

class KDContainerBlock extends Component {
	render() {
		const {
			attributes: { containerWidth, containerClassSwitch, clientIdGenerated },
			clientId,
			setAttributes
		} = this.props;

		if (clientId && clientIdGenerated === 'empty') {
			setAttributes({
				clientIdGenerated: clientId
			});
		}

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
					<InnerBlocks />
				</div>
			</Container>
		];
	}
}

registerBlockType('kd-blocks/kd-container-bg', {
	title: __('KD Container BG', 'kd-blocks'),
	description: __(
		'Container Block BG: Groups inner blocks in a single wrapper.',
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
		const { containerClassSwitch } = props.attributes;

		return (
			<Container {...props}>
				<div
					className={classnames('kd-container-inside', {
						container: containerClassSwitch
					})}
				>
					<div className="kd-container-content">
						<InnerBlocks.Content />
					</div>
				</div>
			</Container>
		);
	}
});
