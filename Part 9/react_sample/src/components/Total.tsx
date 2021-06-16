import React from 'react';
import { CoursePart } from '../types';

interface TotalProps {
  courseParts: CoursePart[]
}

const Total = ({courseParts}: TotalProps) => {
  return (
    <p>
      <b>Total number of exercises{" "}</b>
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;