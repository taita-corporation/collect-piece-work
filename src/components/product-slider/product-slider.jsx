import React, {
  Children,
  isValidElement,
  useEffect,
  useState,
  useRef,
} from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useKeenSlider } from 'keen-slider/react';
import cn from 'classnames';
import * as s from './product-slider.module.css';

const ProductSlider = ({ children, className }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const sliderContainerRef = useRef(null);
  const thumbsContainerRef = useRef(null);
  const [ref, slider] = useKeenSlider({
    loop: true,
    slidesPerView: 1,
    mounted: () => setIsMounted(true),
    slideChanged(s) {
      const slideNumber = s.details().relativeSlide;
      setCurrentSlide(slideNumber);
    },
  });

  return (
    <div className={cn(s.root, className)} ref={sliderContainerRef}>
      <div
        ref={ref}
        className={cn(s.slider, { [s.show]: isMounted }, 'keen-slider')}
      >
        { slider
        && Children.map(children, (child) => {
          if (isValidElement(child)) {
            return {
              ...child,
              props: {
                ...child.props,
                className: `${child.props.className ? `${child.props.className}` : ''}keen-slider__slide`,
              },
            };
          }

          return child;
        })}
      </div>

      <div className={s.album} ref={thumbsContainerRef}>
        {slider
             && Children.map(children, (child, idx) => {
               if (isValidElement(child)) {
                 return {
                   ...child,
                   props: {
                     ...child.props,
                     className: cn(
                       child.props.className,
                       s.thumb,
                       { [s.selected]: currentSlide === idx },
                     ),
                     id: `thumb-${idx}`,
                     onClick: () => {
                       slider.moveToSlideRelative(idx);
                     },
                   },
                 };
               }

               return child;
             })}
      </div>
    </div>
  );
};

export default ProductSlider;
