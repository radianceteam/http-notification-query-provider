export function log(...data: any[]): void {
  if (process.env.SERVICE) console.log(`${process.env.SERVICE} |`, ...data);
  else console.log(...data);

  // Здесь позже пропишем логику обращение к серверу Максима
}

export function error(...data: any[]): void {
  if (process.env.SERVICE) console.error(`${process.env.SERVICE} |`, ...data);
  else console.error(...data);

  // Здесь позже пропишем логику обращение к серверу Максима
}

export function warn(...data: any[]): void {
  if (process.env.SERVICE) console.warn(`${process.env.SERVICE} |`, ...data);
  else console.warn(...data);

  // Здесь позже пропишем логику обращение к серверу Максима
}
