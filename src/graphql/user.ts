import { gql } from "@apollo/client";

const INSERT_USER = gql`
  mutation (
    $departure_time: timetz
    $email: String
    $entry_time: timetz
    $password: String
    $registery: Int
    $type: String
    $name: String
  ) {
    insert_system_user_one(
      object: {
        departure_time: $departure_time
        email: $email
        entry_time: $entry_time
        password: $password
        registery: $registery
        name: $name
        type: $type
      }
    ) {
      email
    }
  }
`;

export { INSERT_USER };
