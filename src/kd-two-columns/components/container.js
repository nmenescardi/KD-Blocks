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
			attributes: { rowClasses, containerWidth }
		} = this.props;

		const className = classnames(
			[this.props.className, rowClasses, 'kd-block-container row'],
			{
				['align' + containerWidth]: containerWidth
			}
		);

		return (
			<div className={className ? className : undefined}>
				{this.props.children}
			</div>
		);
	}
}
