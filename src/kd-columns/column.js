/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InnerBlocks, BlockControls, BlockVerticalAlignmentToolbar } = wp.editor;
const { withDispatch, withSelect } = wp.data;
const { compose } = wp.compose;

export const name = 'kd-blocks/kd-column';

const ColumnEdit = ({ attributes, updateAlignment }) => {
	const { verticalAlignment } = attributes;

	const classes = classnames('block-core-columns', {
		[`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment
	});

	const onChange = alignment => updateAlignment(alignment);

	return (
		<div className={classes}>
			<BlockControls>
				<BlockVerticalAlignmentToolbar
					onChange={onChange}
					value={verticalAlignment}
				/>
			</BlockControls>
			<InnerBlocks templateLock={false} />
		</div>
	);
};

const edit = compose(
	withSelect((select, { clientId }) => {
		const { getBlockRootClientId } = select('core/editor');

		return {
			parentColumsBlockClientId: getBlockRootClientId(clientId)
		};
	}),
	withDispatch((dispatch, { clientId, parentColumsBlockClientId }) => {
		return {
			updateAlignment(alignment) {
				// Update self...
				dispatch('core/editor').updateBlockAttributes(clientId, {
					verticalAlignment: alignment
				});

				// Reset Parent Columns Block
				dispatch('core/editor').updateBlockAttributes(
					parentColumsBlockClientId,
					{
						verticalAlignment: null
					}
				);
			}
		};
	})
)(ColumnEdit);

export const settings = {
	title: __('Column'),

	parent: ['kd-blocks/kd-column'],

	icon: '',

	description: __('A single column within a columns block.'),

	category: 'common',

	attributes: {
		verticalAlignment: {
			type: 'string'
		}
	},

	supports: {
		inserter: false,
		reusable: false,
		html: false
	},

	edit,

	save({ attributes }) {
		const { verticalAlignment } = attributes;
		const wrapperClasses = classnames({
			[`is-vertically-aligned-${verticalAlignment}`]: verticalAlignment
		});

		return (
			<div className={wrapperClasses}>
				<InnerBlocks.Content />
			</div>
		);
	}
};
