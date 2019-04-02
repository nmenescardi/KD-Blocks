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
		const { blockAlignment, shuffleAnimation } = this.props.attributes;

		return (
			<div
				style={{}}
				className={classnames(
					this.props.className,
					blockAlignment,
					'kd-block-accordion',
					{ 'kd-accordion': !shuffleAnimation },
					{ 'kd-accordion-shuffle': shuffleAnimation },
					{
						['align' + blockAlignment]: blockAlignment
					}
				)}
			>
				{this.props.children}
			</div>
		);
	}
}
