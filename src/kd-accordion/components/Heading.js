const { Component } = wp.element;

export default class Heading extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		const { accordionTitleLevel, className } = this.props;

		const CustomTagTitle = accordionTitleLevel
			? `${accordionTitleLevel}`
			: 'h3';

		console.log(accordionTitleLevel);

		return (
			<CustomTagTitle className={className}>
				{this.props.children}
			</CustomTagTitle>
		);
	}
}
