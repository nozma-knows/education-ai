import { gql } from "@apollo/client";

const exercisesDocument = gql`
  query Exercises($unitId: String!) {
    exercises(unitId: $unitId) {
      id
      unitId
      task
      status
    }
  }
`;

export default exercisesDocument;
