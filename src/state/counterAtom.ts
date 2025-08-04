import { atom } from "recoil";

export const counterState = atom<number>({
  key: "counterState",
  default: 0,
});
