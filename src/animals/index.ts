import { v4 as uuidv4 } from "uuid";

export enum AnimalType {
  Poodle = "poodle",
  Cat = "cat",
  Parrot = "parrot",
  Dinosaur = "dinosaur",
}

export interface AnimalStats {
  hunger: number;
  happiness: number;
  sleep: number;
}

export type RateChangePerSecond = AnimalStats;

export interface AnimalConfig {
  type: AnimalType;
  baseStats: AnimalStats;
  rateChangePerSecond: RateChangePerSecond;
}

export interface Animal {
  id: string;
  name: string;
  type: AnimalType;
  stats: AnimalStats;
  config: AnimalConfig;
  feed: () => void;
  play: () => void;
  sleep: () => void;
  getStats: () => AnimalStats;
  isDead: () => boolean;
  update: (delta: number) => void;
}

// Animal configurations
export const ANIMAL_CONFIGS: Record<AnimalType, AnimalConfig> = {
  [AnimalType.Cat]: {
    type: AnimalType.Cat,
    baseStats: { hunger: 50, happiness: 45, sleep: 55 },
    rateChangePerSecond: { hunger: 0.5, happiness: 0.25, sleep: 0.75 },
  },
  [AnimalType.Dinosaur]: {
    type: AnimalType.Dinosaur,
    baseStats: { hunger: 55, happiness: 50, sleep: 50 },
    rateChangePerSecond: { hunger: 0.75, happiness: 0.35, sleep: 0.45 },
  },
  [AnimalType.Poodle]: {
    type: AnimalType.Poodle,
    baseStats: { hunger: 45, happiness: 55, sleep: 50 },
    rateChangePerSecond: { hunger: 0.45, happiness: 0.35, sleep: 0.65 },
  },
  [AnimalType.Parrot]: {
    type: AnimalType.Parrot,
    baseStats: { hunger: 40, happiness: 60, sleep: 45 },
    rateChangePerSecond: { hunger: 0.35, happiness: 0.45, sleep: 0.55 },
  },
};

// Utility functions
export const clampValues = (value: number) => {
  return Math.max(0, Math.min(value, 100));
};

export const updateAnimalStats = (
  currentStats: AnimalStats,
  rateChangePerSecond: RateChangePerSecond,
  delta: number
): AnimalStats => {
  const deltaAsSeconds = delta / 1000;
  const hungerModifier = currentStats.hunger === 100 ? 2 : 1;
  const sleepModifier = currentStats.sleep === 100 ? 2 : 1;

  const clampedHunger = clampValues(
    currentStats.hunger + rateChangePerSecond.hunger * deltaAsSeconds
  );
  const clampedHappiness = clampValues(
    currentStats.happiness -
      rateChangePerSecond.happiness *
        deltaAsSeconds *
        hungerModifier *
        sleepModifier
  );
  const clampedSleep = clampValues(
    currentStats.sleep + rateChangePerSecond.sleep * deltaAsSeconds
  );

  return {
    hunger: clampedHunger,
    happiness: clampedHappiness,
    sleep: clampedSleep,
  };
};

export const isAnimalDead = (stats: AnimalStats): boolean => {
  return stats.hunger === 100 && stats.happiness === 0;
};

export const createAnimal = (type: AnimalType, name: string): Animal => {
  const config = ANIMAL_CONFIGS[type];
  const id = uuidv4();
  const stats: AnimalStats = { ...config.baseStats };

  const feed = () => {
    stats.hunger = clampValues(stats.hunger - 10);
  };

  const play = () => {
    stats.happiness = clampValues(stats.happiness + 10);
  };

  const sleep = () => {
    stats.sleep = clampValues(stats.sleep - 10);
  };

  const getStats = () => {
    return { ...stats };
  };

  const isDead = () => {
    return isAnimalDead(stats);
  };

  const update = (delta: number) => {
    const updatedStats = updateAnimalStats(
      stats,
      config.rateChangePerSecond,
      delta
    );
    stats.hunger = updatedStats.hunger;
    stats.happiness = updatedStats.happiness;
    stats.sleep = updatedStats.sleep;
  };

  return {
    id,
    name,
    type,
    stats,
    config,
    feed,
    play,
    sleep,
    getStats,
    isDead,
    update,
  };
};
