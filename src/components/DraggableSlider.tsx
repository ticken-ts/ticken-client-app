import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';
import {Animated, LayoutChangeEvent, PanResponderInstance, StyleSheet, ViewProps} from 'react-native';
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

const DraggableSlider = React.forwardRef<RefProps, Props>((
  {
    children,
    expandedOffset,
    collapsedOffset,
    startCollapsed,
    animationDuration= 100,
    onCollapsed,
    onExpanded,
    CollapsedVisibleComponent,
    ExpandedVisibleComponent,
  },
  ref
) => {

  const collapsedY = collapsedOffset || 0
  const expandedY = expandedOffset || 0

  const dragY = useRef(new Animated.Value(0)).current
  const positionY = useRef(new Animated.Value(0)).current

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
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      // The gesture has started. Show visual feedback so the user knows
      // what is happening!
      // gestureState.d{x,y} will be set to zero now
    },
    onPanResponderMove: Animated.event([null, {
      dy: dragY,
    }], {
      useNativeDriver: false,
    }),
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
      const releaseLocation = evt.nativeEvent.pageY - evt.nativeEvent.locationY
      dragY.setValue(0)
      console.log('Release location', releaseLocation)
      positionY.setValue(releaseLocation)
      snapToClosest(releaseLocation)
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // Another component has become the responder, so this gesture
      // should be cancelled
      dragY.setValue(0)
    },
    onShouldBlockNativeResponder: (evt, gestureState) => {
      // Returns whether this component should block native components from becoming the JS
      // responder. Returns true by default. Is currently only supported on android.
      return true;
    },
  }))

  return (
    <Animated.View
      // onLayout={e => {
      //   const h = e.nativeEvent.layout.height
      //   setTotalHeight(h)
      // }}
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
      {/*{ExpandedVisibleComponent && CollapsedVisibleComponent &&*/}
      {/*  <>*/}
      {/*    {React.cloneElement(CollapsedVisibleComponent, {*/}
      {/*      onLayout: (e: LayoutChangeEvent) => {*/}
      {/*        const h = e.nativeEvent.layout.height*/}
      {/*        setCollapsedVisibleHeight(h)*/}
      {/*      }*/}
      {/*    })}*/}
      {/*    {React.cloneElement(ExpandedVisibleComponent, {*/}
      {/*      onLayout: (e: LayoutChangeEvent) => {*/}
      {/*        const h = e.nativeEvent.layout.height*/}
      {/*        setExpandedVisibleHeight( h)*/}
      {/*      }*/}
      {/*    })}*/}
      {/*  </>*/}
      {/*}*/}
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
