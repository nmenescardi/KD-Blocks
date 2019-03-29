/**
 * Container Component
 */

const { Component } = wp.element;
import classnames from 'classnames';
const { InnerBlocks } = wp.editor;

export default class Container extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		const { containerBackgroundColor } = this.props;

		const styles = {
			backgroundColor: containerBackgroundColor
				? containerBackgroundColor
				: undefined
		};

		const className = classnames([this.props.className, 'kd-block-container']);

		const ALLOWED_BLOCKS = ['kd-blocks/kd-column'];

		const TEMPLATE = [
			[
				'core/columns',
				{},
				[['kd-blocks/kd-column', {}], ['kd-blocks/kd-column', {}]]
			]
		];

		return (
			<div style={styles} className={className ? className : undefined}>
				<InnerBlocks
					template={TEMPLATE}
					templateLock="all"
					allowedBlocks={ALLOWED_BLOCKS}
				/>
			</div>
		);
	}
}
