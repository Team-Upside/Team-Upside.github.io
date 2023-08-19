import { css } from '@emotion/react';
import { memo, useState } from 'react';
import Navbar from '../common/components/Navbar';
import Card from '../common/components/Card';
import sampleFood1Image from '../assets/sample-food-1.png';
import sampleFood2Image from '../assets/sample-food-2.png';

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
      <div
        css={css`
          padding-top: 9px;
          display: flex;
          justify-content: center;
          flex: 1;
        `}
      >
        {people.map((person) => (
          <Card
            key={person.name}
            person={person}
            restaurant={{ name: 'Lacoon Pizza' }}
            images={[sampleFood1Image, sampleFood2Image]}
          />
        ))}
      </div>
      <Navbar />
    </div>
  );
};

export default memo(SwipePage);
