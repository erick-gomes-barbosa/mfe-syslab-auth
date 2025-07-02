//Valida se o horário de entrada ou saída é válido, ou seja está entre 04:00 e 22:00

import { convertTimeToFloat } from "../helpers/convert-time-to-float";

export function isValidOpeningHours(time: string): string | void {
  const floatTime = convertTimeToFloat(time);

  if (floatTime >= 4 && floatTime <= 22) {
    return time;
  }
  return;
}
