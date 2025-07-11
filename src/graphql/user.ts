import { gql } from "@apollo/client";

//Mutation para inserir os dados do usuário durante o cadastro
const UPDATE_REGISTER_USER = gql`
  mutation (
    $userId: uuid!
    $departure_time: timetz!
    $entry_time: timetz!
    $registery: Int!
    $usertype: String!
    $username: String!
  ) {
    updateUser(
      pk_columns: { id: $userId }
      _set: {
        departure_time: $departure_time
        entry_time: $entry_time
        registery: $registery
        username: $username
        usertype: $usertype
      }
    ) {
      id
    }
  }
`;

export { UPDATE_REGISTER_USER };
