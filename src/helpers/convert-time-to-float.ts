// Converte o "time" que vem no formato de string ex:"10:10" e converte para float 10.1,
// antes de converter é utilizado replace() para substituir o ":" por ".".

export function convertTimeToFloat(time: string) {
  const timeString = time.replace(/\:/g, ".");
  const converterTime = parseFloat(timeString);
  return converterTime;
}
