import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import Image from "next/future/image";
import { useRef } from "react";

const EmblaCarousel = ({ slides }) => {
  const autoplay = useRef(
    Autoplay(
      { delay: 5000, stopOnInteraction: false, speed: 1 },
      (emblaRoot) => emblaRoot.parentElement
    )
  );

  const [viewportRef, embla] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              <Image
                className="embla__slide__img"
                src={slide}
                width={1920}
                height={1080}
                alt="A cool cat."
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
