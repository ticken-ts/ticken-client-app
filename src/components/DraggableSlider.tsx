import React, {PropsWithChildren, useRef, useState} from 'react';
import {Animated, LayoutChangeEvent, StyleSheet, ViewProps} from 'react-native';
import {PanResponder, View} from 'react-native';

type RequiredComponentProps = {
  onLayout: ViewProps['onLayout'],
}

type ComponentProps = {
  startCollapsed: boolean,
  animationDuration?: number,
  onCollapsed?: VoidFunction,
  onExpanded?: VoidFunction,
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
})

type RefProps = {
  collapse: VoidFunction,
  expand: VoidFunction,
}

type Props = PropsWithChildren<ComponentProps>

const DraggableSlider = React.forwardRef<RefProps, Props>((props, ref) => {

  const [collapsedVisibleHeight, setCollapsedVisibleHeight] = useState(0);
  const [expandedVisibleHeight, setExpandedVisibleHeight] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);

  if (props.ExpandedVisibleComponent && props.CollapsedVisibleComponent && collapsedVisibleHeight > 0 && expandedVisibleHeight > 0 && totalHeight > 0) {
    const collapsedOffset = totalHeight - collapsedVisibleHeight;
    const expandedOffset = totalHeight - collapsedVisibleHeight - expandedVisibleHeight;

    return (
      <DraggableSliderComponent
        {...props}
        ExpandedVisibleComponent={undefined}
        CollapsedVisibleComponent={undefined}
        ref={ref}
        collapsedOffset={collapsedOffset}
        expandedOffset={expandedOffset}>

        {props.CollapsedVisibleComponent}
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

const DraggableSliderComponent = React.forwardRef<RefProps, Props>((
  {
    children,
    expandedOffset,
    collapsedOffset,
    startCollapsed,
    animationDuration= 100,
    onCollapsed,
    onExpanded,
  },
  ref
) => {

  const collapsedY = collapsedOffset || 0
  const expandedY = expandedOffset || 0

  const dragY = useRef(new Animated.Value(0)).current
  const positionY = useRef(new Animated.Value(startCollapsed? collapsedY : expandedY)).current

  const collapse = () => {
    getAnimation(collapsedY).start()
    onCollapsed && setTimeout(onCollapsed, animationDuration)
  };

  const expand = () => {
    getAnimation(expandedY).start()
    onExpanded && setTimeout(onExpanded, animationDuration)
  };

  React.useImperativeHandle(ref, () => ({
    collapse,
    expand,
  }))

  const getAnimation = (to: number) => {
    return Animated.timing(positionY, {
      useNativeDriver: true,
      toValue: to,
      duration: animationDuration,
    })
  };

  const snapToClosest = (value: number) => {
    console.log('Snapping to closest of', collapsedY, expandedY)
    const val = getClosestValue(value, [collapsedY, expandedY])
    console.log('Snapping to', val)
    val === collapsedY ? collapse() : expand()
  };

  const panResponder = useRef(PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderGrant: () => {
      // The gesture has started. Show visual feedback so the user knows
      // what is happening!
      // gestureState.d{x,y} will be set to zero now
    },
    onPanResponderMove: Animated.event([null, {
      dy: dragY,
    }], {
      useNativeDriver: false,
    }),
    onPanResponderTerminationRequest: () => true,
    onPanResponderRelease: (evt) => {
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
      const releaseLocation = evt.nativeEvent.pageY - evt.nativeEvent.locationY
      dragY.setValue(0)
      console.log('Release location', releaseLocation)
      positionY.setValue(releaseLocation)
      snapToClosest(releaseLocation)
    },
    onPanResponderTerminate: () => {
      // Another component has become the responder, so this gesture
      // should be cancelled
      dragY.setValue(0)
    },
    onShouldBlockNativeResponder: () => {
      // Returns whether this component should block native components from becoming the JS
      // responder. Returns true by default. Is currently only supported on android.
      return true;
    },
  }))

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: Animated.add(positionY, dragY).interpolate({
                extrapolate: 'clamp',
                inputRange: [expandedY, collapsedY],
                outputRange: [expandedY, collapsedY],
              })
            }
          ]
        },
      ]}
      {...panResponder.current?.panHandlers}>
      {children}
    </Animated.View>
  );
});

export default DraggableSlider;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});

function getClosestValue (input: number, values: number[]) {

  if (values.length < 1) throw new Error('Called getClosestValue with empty array')
  if (values.length < 2) return values[0]

  return values.reduce((prev, cur) => {
    if (Math.abs(prev - input) > Math.abs(cur - input)) {
      return cur;
    } else {
      return prev;
    }
  })
}
