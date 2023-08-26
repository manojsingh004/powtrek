import {HTMLMotionProps} from 'framer-motion';

export const navbarAnimation: HTMLMotionProps<'div'> = {
  initial: {y: '130%', opacity: 0},
  animate: {y: 0, opacity: 1},
  exit: {
    y: '130%',
    opacity: 0,
    left: '16px',
    position: 'absolute',
    overflowY: 'hidden',
  },
  transition: {type: 'tween', duration: 0.15},
};
