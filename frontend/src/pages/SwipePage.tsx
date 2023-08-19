import { css } from '@emotion/react';
import { memo, useState } from 'react';
import TinderCard from 'react-tinder-card';
import Navbar from '../common/components/Navbar';

const cardStyle = css`
  position: absolute;
  background-color: #fff;
  width: calc(100% - 40px);
  height: 80%;
  height: 524px;
  max-height: 524px;
  box-shadow:
    0px 0px 1px 0px rgba(57, 63, 73, 0.31),
    0px 3px 5px 0px rgba(56, 61, 69, 0.2);
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const Swipe = () => {
  const [people, setPeople] = useState([
    {
      name: 'Elon Musk',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/460px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg',
    },
    {
      name: 'Mark Zuckerberg',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/640px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg',
    },
  ]);

  const swiped = (direction: string, nameToDelete: string) => {
    console.log('removing: ' + nameToDelete);
    // setLastDirection(direction);
  };

  const outOfFrame = (name: string) => {
    console.log(name + ' left the screen!');
  };

  return (
    <div
      css={css`
        height: 100vh;
      `}
    >
      <Navbar />
      <div
        css={css`
          margin-top: 12px;
          display: flex;
          justify-content: center;
        `}
      >
        {people.map((person) => (
          <TinderCard
            css={cardStyle}
            key={person.name}
            preventSwipe={['up', 'down']}
            onSwipe={(dir) => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
          >
            <div
              css={css`
                background-image: url(${person.url});
                background-size: cover;
                height: 100%;
              `}
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default memo(Swipe);
