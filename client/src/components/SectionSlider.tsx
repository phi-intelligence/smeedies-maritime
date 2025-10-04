import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Parallax, EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import styles from './SectionSlider.module.css';

interface SlideData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  leftImage: string;
  rightImage: string;
  emphasis?: string;
}

interface SectionSliderProps {
  slides: SlideData[];
  className?: string;
}

const SectionSlider: React.FC<SectionSliderProps> = ({ slides, className = '' }) => {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.init();
    }
  }, []);

  return (
    <div className={`${styles.sectionSlider} ${className}`}>
      <div className={styles.sliderContainer}>
        <Swiper
          modules={[Parallax, EffectFade, Autoplay]}
          direction="vertical"
          loop={true}
          grabCursor={false}
          speed={800}
          parallax={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          allowTouchMove={false}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          className={styles.swiperContainer}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id} className={styles.swiperSlide}>
              {/* Left Image with Content */}
              <div 
                className={`${styles.swiperImage} ${styles.swiperImageLeft}`}
                data-swiper-parallax-y="-20%"
              >
                <div 
                  className={styles.swiperImageInner}
                  style={{ backgroundImage: `url(${slide.leftImage})` }}
                >
                  <h1 className={styles.slideTitle}>
                    {slide.emphasis ? (
                      <>
                        {slide.title.split(slide.emphasis)[0]}
                        <span className={styles.emphasis}>{slide.emphasis}</span>
                        {slide.title.split(slide.emphasis)[1]}
                      </>
                    ) : (
                      slide.title
                    )}
                  </h1>
                  <p className={styles.slideSubtitle}>{slide.subtitle}</p>
                </div>
              </div>

              {/* Right Image with Content */}
              <div 
                className={`${styles.swiperImage} ${styles.swiperImageRight}`}
                data-swiper-parallax-y="35%"
              >
                <div 
                  className={styles.swiperImageInner}
                  style={{ backgroundImage: `url(${slide.rightImage})` }}
                >
                  <p className={styles.slideDescription}>{slide.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SectionSlider;
