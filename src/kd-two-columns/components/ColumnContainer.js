/**
 * Container Component
 */

const { Component } = wp.element;
import classnames from 'classnames';

export default class ColumnContainer extends Component {
	constructor(props) {
		super(...arguments);
	}

	render() {
		const {
			attributes: {
				className,
				containerImgURL,
				containerDimRatio,
				containerImgAlt,
				containerBackgroundColor
			}
		} = this.props;

		const styles = {
			backgroundColor: containerBackgroundColor
				? containerBackgroundColor
				: undefined
		};

		return (
			<div style={styles} className={classnames('kd-col', 'col', className)}>
				{containerImgURL && !!containerImgURL.length && (
					<div className="kd-container-image-wrap">
						<img
							className={classnames(
								'kd-container-image',
								dimRatioToClass(containerDimRatio),
								{
									'has-background-dim': containerDimRatio !== 0
								}
							)}
							src={containerImgURL}
							alt={containerImgAlt}
						/>
					</div>
				)}
				{this.props.children}
			</div>
		);
	}
}

function dimRatioToClass(ratio) {
	return ratio === 0 || ratio === 50
		? null
		: 'has-background-dim-' + 10 * Math.round(ratio / 10);
}
