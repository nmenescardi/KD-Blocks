/**
 * Container Component
 */

const { Component } = wp.element;
import classnames from 'classnames';

export default class Container extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		const {
			attributes: {
				containerBackgroundColor,
				containerAlignment,
				containerWidth
			}
		} = this.props;

		const styles = {
			backgroundColor: containerBackgroundColor
				? containerBackgroundColor
				: undefined,
			textAlign: containerAlignment ? containerAlignment : undefined
		};

		const className = classnames([this.props.className, 'kd-block-container'], {
			['align' + containerWidth]: containerWidth
		});

		return (
			<div style={styles} className={className ? className : undefined}>
				{this.props.children}
			</div>
		);
	}
}
