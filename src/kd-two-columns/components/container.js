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
		<div style={styles} className={classnames('kd-col', 'col', className)}>
			{/* 	{containerImgURL && !!containerImgURL.length && (
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
				)} */}

			<InnerBlocks templateLock={false} />
		</div>;
	}
}
