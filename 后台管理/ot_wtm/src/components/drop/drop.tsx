/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-10-12 22:22:52
 * @modify date 2018-10-12 22:22:52
 * @desc [description]
*/
import * as React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetMonitor } from 'react-dnd';
const style: React.CSSProperties = {
	padding: '1rem',
	textAlign: 'center',
	fontSize: '1rem',
	lineHeight: 'normal',
	height: "100%"
}

const dustbinTarget = {
	drop(props: DustbinProps, monitor: DropTargetMonitor) {
		props.onDrop(monitor.getItem())
	},
}

export interface DustbinProps {
	accepts: string[]
	canDrop?: boolean
	isOver?: boolean
	connectDropTarget?: ConnectDropTarget
	onDrop: (item: any) => void
}

@DropTarget(
	(props: DustbinProps) => props.accepts,
	dustbinTarget,
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
	}),
)
export default class extends React.Component<DustbinProps> {
	public render() {
		const {
			accepts,
			isOver,
			canDrop,
			connectDropTarget,
		} = this.props
		const isActive = isOver && canDrop

		let backgroundColor = ''
		if (isActive) {
			backgroundColor = '#e6f7ff'
		} else if (canDrop) {
			backgroundColor = '#e6e6e6'
		} 
		return (
			connectDropTarget &&
			connectDropTarget(
				<div style={{ ...style, backgroundColor }}>
					{this.props.children}
				</div>,
			)
		)
	}
}

