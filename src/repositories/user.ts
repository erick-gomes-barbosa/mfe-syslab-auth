import { UPDATE_REGISTER_USER } from "../graphql/user";
import { useMutation } from "@apollo/client";
import { UserUpdate } from "../types/user-update-types";

//Função para registrar os dados do usuário durante o registro,
//fazendo um update na tabela users do schema auth

export function UpdateRegisterUserFunction() {
  const [UpdateRegisterUser, { loading, error }] =
    useMutation(UPDATE_REGISTER_USER);

  const updateUserRegister = async (values: UserUpdate) => {
    const {
      userId,
      username,
      usertype,
      registery,
      entry_time,
      departure_time,
    } = values;
    try {
      const response = await UpdateRegisterUser({
        variables: {
          userId,
          username,
          usertype,
          registery,
          entry_time,
          departure_time,
        },
      });

      return response.data?.updateUser;
    } catch (error) {
      console.error("Erro na mutation:", error);
    }
  };

  return {
    updateUserRegister,
    loading,
    error,
  };
}
