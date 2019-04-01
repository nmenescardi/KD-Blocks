/**
 * Accordion Wrapper
 */

const { Component } = wp.element;

import classnames from 'classnames';

export default class Accordion extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		const { accordionAlignment, shuffleAnimation } = this.props.attributes;

		return (
			<div
				style={{}}
				className={classnames(
					this.props.className,
					accordionAlignment,
					'kd-block-accordion',
					{ accordion: !shuffleAnimation },
					{ 'accordion-shuffle': shuffleAnimation }
				)}
			>
				{this.props.children}
			</div>
		);
	}
}
