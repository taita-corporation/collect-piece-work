import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import cn from 'classnames';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import * as s from './hero.module.css';

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [opacities, setOpacities] = React.useState([]);
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
  });

  return (
    <>
      <div ref={sliderRef} className={s.fader}>
        {images.map(({ gatsbyImageData }, idx) => (
          <div
            className={s.fader__slide}
            style={{ opacity: opacities[idx] }}
          >
            <GatsbyImage image={gatsbyImageData} layout="constrained" aspectRatio={16 / 9} className={s.image} />
          </div>
        ))}
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
