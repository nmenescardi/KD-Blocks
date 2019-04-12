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
				containerImgURL,
				containerWidth,
				containerDimRatio,
				clientIdGenerated
			}
		} = this.props;

		const styles = {
			textAlign: containerAlignment ? containerAlignment : undefined,
			position: 'relative',
			backgroundImage: `url(${containerImgURL})`
		};

		const clientIdClass = `client-id-${clientIdGenerated}`;

		const className = classnames(
			this.props.className,
			'kd-block-container-bg',
			clientIdClass,
			{
				['align' + containerWidth]: containerWidth
			}
		);

		const opacity = dimRatioToClass(containerDimRatio);

		const overlayStyles = {
			opacity: opacity,
			height: '100%',
			width: '100%',
			top: 0,
			left: 0,
			position: 'absolute',
			backgroundColor: containerBackgroundColor
		};

		return (
			<div style={styles} className={className ? className : undefined}>
				<div className="container-overlay" style={overlayStyles} />
				{this.props.children}
			</div>
		);
	}
}

function dimRatioToClass(ratio) {
	return '' + 0.01 * ratio;
}
