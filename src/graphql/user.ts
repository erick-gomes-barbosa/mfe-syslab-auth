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

//Query para verificar se o usuário já existe
const GET_USER_BY_EMAIL = gql`
  query ($_eq: String) {
    system_user(where: { email: { _eq: $_eq } }) {
      id
    }
  }
`;

export { INSERT_USER, GET_USER_BY_EMAIL };
