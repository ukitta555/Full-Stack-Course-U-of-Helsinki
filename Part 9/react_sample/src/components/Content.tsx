import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <p>
      {courseParts.map ( (part: CoursePart) => {
        return <Part key = {part.name} part = {part}/>;
      })}
    </p>
  );
};

export default Content;