import { INSERT_USER } from "../graphql/user";
import { useMutation } from "@apollo/client";
import { UserType } from "../types/user-type";

//Função para inserir Usuários
export function useInsertUserFunction() {
  const [InsertUser, { loading, error }] = useMutation(INSERT_USER);

  const insert = async (values: UserType) => {
    values.password =
      "35d183e088e2f0c763763f8d50887fd342833cef87a582715e8d47df5734";
    try {
      const response = await InsertUser({
        variables: values,
        context: {
          headers: {
            "x-hasura-user-email": `${values.email}`,
          },
        },
      });

      return response.data;
    } catch (error) {}
  };

  return {
    insert,
    loading,
    error,
  };
}
