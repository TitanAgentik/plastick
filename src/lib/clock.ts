import { useSyncExternalStore } from "react";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

let timeStr = "10:10";
let dateStr = "THU 01/01";
let hands = { h: 0, m: 0, s: 0 };
const subs = new Set<() => void>();
let timer: number | undefined;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function readHands(d: Date) {
  const sec = d.getSeconds();
  const min = d.getMinutes();
  const hour = d.getHours() % 12;
  return {
    h: (hour + min / 60 + sec / 3600) * 30,
    m: (min + sec / 60) * 6,
    s: sec * 6,
  };
}

const SERVER_HANDS = { h: 0, m: 0, s: 0 };

function stamp(d: Date) {
  const h12 = d.getHours() % 12 || 12;
  timeStr = `${pad(h12)}:${pad(d.getMinutes())}`;
  dateStr = `${DAYS[d.getDay()]} ${pad(d.getMonth() + 1)}/${pad(d.getDate())}`;
  hands = readHands(d);
}

function emit() {
  stamp(new Date());
  subs.forEach((s) => s());
}

function subscribe(cb: () => void) {
  subs.add(cb);
  if (timer == null && typeof window !== "undefined") {
    timer = window.setInterval(emit, 1000);
  }
  return () => {
    subs.delete(cb);
    if (subs.size === 0 && timer != null) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

function subscribeIdle() {
  return () => {};
}

export function useLcdTime(live = true) {
  return useSyncExternalStore(live ? subscribe : subscribeIdle, () => timeStr, () => "10:10");
}

export function useLcdDate(live = true) {
  return useSyncExternalStore(live ? subscribe : subscribeIdle, () => dateStr, () => "THU 01/01");
}

export function useHands(live = true) {
  return useSyncExternalStore(
    live ? subscribe : subscribeIdle,
    () => hands,
    () => SERVER_HANDS,
  );
}

if (typeof window !== "undefined") stamp(new Date());
