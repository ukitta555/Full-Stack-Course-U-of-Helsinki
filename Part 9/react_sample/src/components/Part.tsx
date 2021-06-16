import React from 'react';
import { CoursePart } from '../types';

interface PartProps {
  part: CoursePart,
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled union member: ${JSON.stringify(value)}`);
};

const Part = ({ part }: PartProps) => {
  switch (part.type) {
    case "normal": {
      return (
        <p>
          <p> <b>{part.name}</b> </p>
          <p> Exercise count: {part.exerciseCount} </p>
          <p> Description: {part.description} </p>
        </p>
      );
    }
    case "groupProject": {
      return (
        <p>
          <p> <b>{part.name}</b> </p>
          <p> Exercise count: {part.exerciseCount} </p>
          <p> Project exercises: {part.groupProjectCount}</p>
        </p>
      );
    }
    case "submission": {
      return (
        <p>
          <p> <b>{part.name}</b> </p>
          <p> Exercise count: {part.exerciseCount} </p>
          <p> Description: {part.description}</p>
          <p> Submission link: {part.exerciseSubmissionLink} </p>
        </p>
      );
    }
    case "special": {
      return (
        <p>
          <p> <b>{part.name}</b> </p>
          <p> Exercise count: {part.exerciseCount} </p>
          <p> Description: {part.description}</p>
          <p>
            Requirements:{" "}
            {part.requirements.map((requirement: string, i: number) => {
              if (i === part.requirements.length - 1)
                return requirement;
              else return `${requirement}, `;
            })}
          </p>
        </p>
      );
    }
    default:
      return assertNever(part);
  }
};

export default Part;