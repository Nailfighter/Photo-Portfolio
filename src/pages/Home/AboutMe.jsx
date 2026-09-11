export default function AboutMe() {
  return (
    <section className="c-surface-promo">
      <div className="c-surface-promo__layout">
        <img className="c-surface-promo__photo c-surface-promo__photo--me" src="/me.png" alt="Portrait of me" />
        <div className="c-surface-promo__container">
          <h2 className="c-surface-promo__title">About me</h2>
          <p className="c-surface-promo__text">
            My love for photography started 12 years ago when my dad got a DSLR for himself, but I ended up using it more than him. Figuring out how to move from auto mode to manual was a journey of self-learning, and somewhere along the way, I fell in love with the magic of capturing every frame.
          </p>
          <p className="c-surface-promo__text">
            I carried it with me on every trip to all the places I have been in my life, which is also where my love for street photography grew. I love finding those split-second moments in a city that's constantly moving and turning them into something still. Most of my photos are for fun, but I have also done a decent bit of work for graduation photos, club events, and photoshoots.
          </p>
        </div>
        <div className="c-surface-promo__favourite-wrap">
          <div className="c-surface-promo__doodle">
            <span className="c-surface-promo__doodle-caption">
              my favourite photo I have ever taken,<br /><span style={{ whiteSpace: "nowrap" }}>freaking solar eclipse!</span>
            </span>
            <svg className="c-surface-promo__doodle-arrow" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
              <g fill="#000">
                <g>
                  <path d="M437.65 228.63c-11-11.3-28.02-30.74-43.85-33.25-13.68.4-4.24 16.99 4.72 15.98 1.67-.27 14.6 12 20.99 18.95-73.13-19.32-152.62-31.59-224.6-2.19-24.36-20.09-70.46-5.55-97.86 2.74-10.7 4.38-44.74 15.3-45.58 27.63 2.63 10.11 14.03 9.62 19.87 2.58 6.8-4.63 14.23-8.1 21.77-11.33 27.16-10.03 57.65-20.38 86.74-14.81-19.75 10.96-45.07 24.46-49.37 48.67-.98 20.42 24.81 26.36 39.14 16.1 18.7-11.31 37.58-31.54 34.51-54.98 67.16-28.65 141.54-17.06 210.28.69a634.53 634.53 0 0 0-26.86 9.82c-4.5 1.55-4.87 7.28-1.98 10.53 6.02 8.29 15.78 3.88 23.3.63 8.17-3.12 16.31-6.28 24.61-9.03 22.39-5.78 16.3-15.12 4.17-28.72Zm-286.98 58.93c4.9-15.45 20.39-24.72 33.42-32.9-6.02 14.67-18.84 26.87-33.42 32.9Z"></path>
                </g>
              </g>
            </svg>
          </div>
          <img className="c-surface-promo__photo c-surface-promo__photo--favourite" src="/favourite.jpg" alt="My favourite photograph" />
        </div>
      </div>
    </section>
  );
}
