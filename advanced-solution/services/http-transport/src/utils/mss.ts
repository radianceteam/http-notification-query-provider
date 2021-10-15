import ms from "ms";

export default function mss(value: string): number {
  return ms(value) / 1000;
}
