import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import cn from 'classnames';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import * as s from './hero.module.css';

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [pause, setPause] = React.useState(false);
  const [opacities, setOpacities] = React.useState([]);
  const timer = React.useRef();
  const data = useStaticQuery(graphql`
  query {
    datoCmsTopPage {
      heroImage {
        gatsbyImageData
      }
    }
  }
  `);

  const images = data.datoCmsTopPage.heroImage;

  const [sliderRef, slider] = useKeenSlider({
    slides: images.length,
    loop: true,
    slidesPerView: 1,
    duration: 3000,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
    move(s) {
      const newOpacities = s.details().positions.map((slide) => slide.portion);
      setOpacities(newOpacities);
    },
    dragStart: () => {
      setPause(true);
    },
    dragEnd: () => {
      setPause(false);
    },
  });

  React.useEffect(() => {
    sliderRef.current.addEventListener('mouseover', () => {
      setPause(true);
    });
    sliderRef.current.addEventListener('mouseout', () => {
      setPause(false);
    });
  }, [sliderRef]);

  React.useEffect(() => {
    timer.current = setInterval(() => {
      if (!pause && slider) {
        slider.next();
      }
    }, 5000);

    return () => {
      clearInterval(timer.current);
    };
  }, [pause, slider]);

  return (
    <>
      <div ref={sliderRef} className={s.fader}>
        {images.map(({ gatsbyImageData }, idx) => (
          <div
            className={s.fader__slide}
            style={{ opacity: opacities[idx] }}
          >
            <GatsbyImage
              image={gatsbyImageData}
              layout="constrained"
              aspectRatio={16 / 9}
              placeholder="tracedSVG"
              className={s.image}
            />
          </div>
        ))}

        {slider && (
          <div className={s.dots}>
            { [...Array(slider.details().size).keys()].map((idx) => (
              /* eslint-disable jsx-a11y/control-has-associated-label */
              <button
                type="button"
                key={idx}
                onClick={() => {
                  slider.moveToSlideRelative(idx);
                }}
                className={cn(s.dot, (currentSlide === idx ? s.active : null))}
                ariaLabel="slide to next or previous image"
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
