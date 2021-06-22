import React from 'react';
import cn from 'classnames';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import * as s from './hero.module.css';

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [opacities, setOpacities] = React.useState([]);
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slidesPerView: 1,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
    move(s) {
      const newOpacities = s.details().positions.map((slide) => slide.portion);
      setOpacities(newOpacities);
    },
  });

  return (
    <>
      <div ref={sliderRef} className="fader">
        <div className="fader__slide">1</div>
        <div className="fader__slide">2</div>
        <div className="fader__slide">3</div>
      </div>

      {slider && (
        [...Array(slider.details().size).keys()].map((idx) => (
          /* eslint-disable jsx-a11y/control-has-associated-label */
          <button
            type="button"
            key={idx}
            onClick={() => {
              slider.moveToSlideRelative(idx);
            }}
            className={cn(s.dot, (currentSlide === idx ? 'active' : null))}
          />
        ))
      )}
    </>
  );
};
