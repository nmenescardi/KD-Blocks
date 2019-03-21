/**
 * Accordion Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a Accordion wrapper Component
 */
export default class Accordion extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		// Setup the attributes
		const {
			accordionTitle,
			accordionText,
			accordionAlignment,
			shuffleAnimation
		} = this.props.attributes;

		return (
			<div
				style={{}}
				className={classnames(
					this.props.className,
					accordionAlignment,
					'kd-block-accordion',
					{ 'shuffle-animation': shuffleAnimation }
				)}
			>
				{this.props.children}
			</div>
		);
	}
}
