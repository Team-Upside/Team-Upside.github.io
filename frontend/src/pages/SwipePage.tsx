import { css } from '@emotion/react';
import { memo, useState } from 'react';
import Navbar from '../common/components/Navbar';
import Card from '../common/components/Card';
import sampleFoodImage from '../assets/sample-food.png';

const SwipePage = () => {
  const [people, setPeople] = useState([
    {
      name: 'Elon Musk',
    },
    {
      name: 'Mark Zuckerberg',
    },
  ]);

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
          <Card
            key={person.name}
            person={person}
            restaurant={{ name: 'Lacoon Pizza' }}
            images={[sampleFoodImage]}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(SwipePage);
