// TODO: Try to have a separated component to render both Edit and Save function. like 'ColumnComponent'
// TODO: Try to add the inspector in here (sidebar options)

import classnames from 'classnames';
import icons from './icons';
import ColumnContainer from './ColumnContainer';

const { __ } = wp.i18n;
const { InnerBlocks } = wp.editor;
const { registerBlockType } = wp.blocks;

registerBlockType('kd-blocks/kd-column', {
	title: __('Column', 'kd-blocks'),

	parent: ['kd-blocks/kd-two-columns'],

	icon: icons.accordion,

	description: __('A single column within a columns block.'),

	category: 'kd-blocks',

	attributes: {
		className: {
			type: 'string'
		}
	},

	edit: function(props) {
		const {
			attributes: { containerBackgroundColor }
		} = props;

		const styles = {
			backgroundColor: containerBackgroundColor
				? containerBackgroundColor
				: undefined
		};

		return <ColumnContainer {...props} styles={styles} />;
	},

	save(props) {
		const {
			attributes: {
				className,
				containerBackgroundColor,
				containerImgURL,
				containerImgID,
				containerImgAlt,
				containerDimRatio
			}
		} = props;

		const styles = {
			backgroundColor: containerBackgroundColor
				? containerBackgroundColor
				: undefined
		};

		return (
			<div style={styles} className={classnames('kd-col', 'col', className)}>
				{/* 				{containerImgURL && !!containerImgURL.length && (
					<div className="kd-container-image-wrap">
						<figure>
							{' '}
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
						</figure>
					</div>
				)} */}
				<InnerBlocks.Content />
			</div>
		);
	}
});
