/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-10-12 22:22:47
 * @modify date 2018-10-12 22:22:47
 * @desc [description]
*/
import * as React from 'react'
import {
	DragSource,
	ConnectDragSource,
	DragSourceConnector,
	DragSourceMonitor,
} from 'react-dnd'

const style: React.CSSProperties = {
	border: '1px dashed gray',
	cursor: 'move',
}

const boxSource = {
	beginDrag(props: BoxProps) {
		return {
			model: props.model,
			type: props.type
		}
	},
}

export interface BoxProps {
	model: any
	type: string
	connectDragSource?: ConnectDragSource
	isDragging?: boolean
	isDropped?: boolean
}
@DragSource(
	(props: BoxProps) => props.type,
	boxSource,
	(connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}),
)
export default class extends React.Component<BoxProps> {
	public render() {
		const { model, isDropped, isDragging, connectDragSource } = this.props
		const opacity = isDragging ? 0.8 : 1
		let backgroundColor = ''
		if (isDragging) {
			backgroundColor = '#e6f7ff'
		}
		return (
			connectDragSource &&
			connectDragSource(
				<div style={{ ...style, opacity, backgroundColor }}>
					{this.props.children}
				</div>,
			)
		)
	}
}
