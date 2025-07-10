import { INSERT_USER } from "../graphql/user";
import { useMutation } from "@apollo/client";
import { UserType } from "../types/user-type";

//Função para inserir Usuários
export function InsertUserFunction() {
  const [InsertUser, { loading, error }] = useMutation(INSERT_USER);

  const insert = async (values: UserType) => {
    try {
      const response = await InsertUser({
        variables: values,
      });

      return response.data?.insert_system_user_one;
    } catch (error) {}
  };

  return {
    insert,
    loading,
    error,
  };
}
