import React, {PropsWithChildren, useState} from 'react';
import {LayoutChangeEvent, StyleProp, View, ViewProps, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DraggableSliderComponent, RefProps} from './DraggableSliderComponent';

type RequiredComponentProps = {
  onLayout: ViewProps['onLayout'],
}

type ComponentProps = {
  startCollapsed: boolean,
  animationDuration?: number,
  onCollapsed?: VoidFunction,
  onExpanded?: VoidFunction,
  containerStyle?: StyleProp<ViewStyle>
} & ({
  expandedOffset: number,
  collapsedOffset: number,
  CollapsedVisibleComponent?: never,
  ExpandedVisibleComponent?: never,
} | {
  expandedOffset?: never,
  collapsedOffset?: never,
  CollapsedVisibleComponent: React.ReactElement<RequiredComponentProps>,
  ExpandedVisibleComponent: React.ReactElement<RequiredComponentProps>,
  useSafeAreaSeparator?: boolean,
})

type Props = PropsWithChildren<ComponentProps>

const DraggableSlider = React.forwardRef<RefProps, Props>((props, ref) => {

  const [collapsedVisibleHeight, setCollapsedVisibleHeight] = useState(0);
  const [expandedVisibleHeight, setExpandedVisibleHeight] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);

  const {bottom} = useSafeAreaInsets()

  if (props.ExpandedVisibleComponent && props.CollapsedVisibleComponent && collapsedVisibleHeight > 0 && expandedVisibleHeight > 0 && totalHeight > 0) {
    const collapsedOffset = totalHeight - collapsedVisibleHeight;
    const expandedOffset = totalHeight - collapsedVisibleHeight - expandedVisibleHeight - (props.useSafeAreaSeparator ? bottom : 0);

    return (
      <DraggableSliderComponent
        {...props}
        ref={ref}
        collapsedOffset={collapsedOffset}
        expandedOffset={expandedOffset}>

        {props.CollapsedVisibleComponent}
        {props.useSafeAreaSeparator && <View style={{marginBottom: bottom}} />}
        {props.ExpandedVisibleComponent}

      </DraggableSliderComponent>
    )
  }

  if (props.expandedOffset && props.collapsedOffset) {
    return (
      <DraggableSliderComponent {...props} ref={ref} />
    )
  }

  return <View
    onLayout={(e: LayoutChangeEvent) => {
      const h = e.nativeEvent.layout.height
      setTotalHeight(h)
    }}
    style={{
      opacity: 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
    }}>
    {props.ExpandedVisibleComponent && props.CollapsedVisibleComponent &&
      <>
        {React.cloneElement(props.CollapsedVisibleComponent, {
          onLayout: (e: LayoutChangeEvent) => {
            const h = e.nativeEvent.layout.height
            setCollapsedVisibleHeight(h)
          }
        })}
        {React.cloneElement(props.ExpandedVisibleComponent, {
          onLayout: (e: LayoutChangeEvent) => {
            const h = e.nativeEvent.layout.height
            setExpandedVisibleHeight( h)
          }
        })}
      </>
    }
  </View>
})

export default DraggableSlider;

