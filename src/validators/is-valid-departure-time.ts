//Valida se o horário de saída é válido

import { convertTimeToFloat } from "../helpers/convert-time-to-float";
import { isValidOpeningHours } from "./is-valid-opening-hours";

export function isValidDepartureTime(
  entry_time: string,
  departure_time: string
): string | void {
  const isOpeningHours = isValidOpeningHours(departure_time);

  const floatDepartureTime = convertTimeToFloat(departure_time);
  const floatEntryTime = convertTimeToFloat(entry_time);

  //Valida se o horário de saída é compatível com o horário de funcionmento
  //e se o horário de saída é maior que o horário de entrada.
  if (isOpeningHours && floatDepartureTime > floatEntryTime)
    return departure_time;

  return;
}
