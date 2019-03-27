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
		const { containerBackgroundColor } = this.props;

		const styles = {
			backgroundColor: containerBackgroundColor
				? containerBackgroundColor
				: undefined
		};

		const className = classnames([this.props.className, 'kd-block-container']);

		return (
			<div style={styles} className={className ? className : undefined}>
				{this.props.children}
			</div>
		);
	}
}
