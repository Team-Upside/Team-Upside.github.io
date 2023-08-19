import { css } from '@emotion/react';
import { memo, useState } from 'react';
import TinderCard from 'react-tinder-card';

const cardStyle = css`
  position: absolute;
  background-color: #fff;
  width: 100%;
  height: 80%;
  max-height: 500px;
  box-shadow: 0px 0px 60px 0px rgba(0, 0, 0, 0.3);
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
        display: flex;
        justify-content: center;
        min-height: 100vh;
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
  );
};

export default memo(Swipe);
