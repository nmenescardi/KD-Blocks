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
			backgroundColor: containerBackgroundColor
				? containerBackgroundColor
				: undefined,
			textAlign: containerAlignment ? containerAlignment : undefined,
			position: 'relative'
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

		const opacity = containerDimRatio
			? dimRatioToClass(containerDimRatio)
			: '0.5';

		return (
			<div style={styles} className={className ? className : undefined}>
				<style
					dangerouslySetInnerHTML={{
						__html: [
							`.kd-block-container-bg.${clientIdClass}:after {`,
							'content: "";',
							`opacity: ${opacity};`,
							'top: 0;',
							'left: 0;',
							'bottom: 0;',
							'right: 0;',
							'position: absolute;',
							'z-index: -1;   ',
							`background: url(${containerImgURL});`,
							'background-repeat: no-repeat;   ',
							'background-size: cover; ',
							'}'
						].join('\n')
					}}
				/>

				{this.props.children}
			</div>
		);
	}
}

function dimRatioToClass(ratio) {
	return ratio === 0 || ratio === 50 ? '0.5' : '' + 0.01 * ratio;
}
