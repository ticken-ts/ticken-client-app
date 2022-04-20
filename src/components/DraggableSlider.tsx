import React, {PropsWithChildren, useRef} from 'react';
import { Animated, StyleSheet } from 'react-native';
import {PanResponder, View} from 'react-native';
import {colors} from '../styles/colors';
import {shadowStyles} from '../styles/shadow';

type ComponentProps = {
  expandedY: number,
  collapsedY: number,
  startCollapsed: boolean,
  animationDuration?: number,
  onCollapsed?: VoidFunction,
  onExpanded?: VoidFunction,
}

type RefProps = {
  collapse: VoidFunction,
  expand: VoidFunction,
}

type Props = PropsWithChildren<ComponentProps>

const DraggableSlider = React.forwardRef<RefProps, Props>((
  {
    children,
    expandedY,
    collapsedY,
    startCollapsed,
    animationDuration= 100,
    onCollapsed,
    onExpanded
  },
  ref
) => {

  const dragY = useRef(new Animated.Value(0)).current
  const positionY = useRef(new Animated.Value(startCollapsed ? collapsedY : expandedY)).current

  const getAnimation = (to: number) => {
    return Animated.timing(positionY, {
      useNativeDriver: true,
      toValue: to,
      duration: animationDuration,
    })
  };

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

  const snapToClosest = (value: number) => {
    const val = getClosestValue(value, [collapsedY, expandedY])
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
    },  })).current

  return (
    <Animated.View
      style={[
        styles.container,
        {
          // backgroundColor: color,
          transform: [
            {translateY: Animated.add(positionY, dragY).interpolate({
                extrapolate: 'clamp',
                inputRange: [expandedY, collapsedY],
                outputRange: [expandedY, collapsedY],
              })}
          ]
        },
      ]}
      {...panResponder.panHandlers}>
      <View>
      </View>
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
    backgroundColor: colors.white,
    ...shadowStyles.normal
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
