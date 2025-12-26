import type {
  TheDestroyerData,
  SkeletronPrimeData,
  TheTwinsData,
} from "@/data/boss/types";

interface StatCardData {
  name: string;
  nameEn: string;
  icon: string;
  hp: number | string;
  defense: number | string;
  damage: number | string;
  notes: string;
  color?: string;
  danger?: "low" | "medium" | "high";
  highlight?: boolean;
}

/**
 * The Destroyer 数据转换
 */
export function useDestroyerStats(bossData: TheDestroyerData): StatCardData[] {
  return [
    {
      name: bossData.stats.main.name,
      nameEn: bossData.stats.main.nameEn,
      icon: bossData.stats.main.icon,
      hp: bossData.stats.main.hp,
      defense: bossData.stats.main.defense,
      damage: bossData.stats.main.damage,
      notes: bossData.stats.main.notes,
      color: "#3b82f6",
      highlight: true,
    },
    {
      name: bossData.stats.probe.name,
      nameEn: bossData.stats.probe.nameEn,
      icon: bossData.stats.probe.icon,
      hp: bossData.stats.probe.hp,
      defense: bossData.stats.probe.defense,
      damage: bossData.stats.probe.damage,
      notes: bossData.stats.probe.notes,
      color: "#8b5cf6",
    },
  ];
}

/**
 * Skeletron Prime 数据转换（直接使用 parts）
 */
export function useSkeletronPrimeStats(
  bossData: SkeletronPrimeData
): StatCardData[] {
  return bossData.parts.map((part) => ({
    name: part.name,
    nameEn: part.nameEn,
    icon: part.icon,
    hp: part.hp,
    defense: part.defense,
    damage: part.damage,
    notes: part.notes,
    color: part.color,
    danger: part.danger,
    highlight: part.danger === "high" && part.nameEn === "Head",
  }));
}

/**
 * The Twins 数据转换
 */
export function useTwinsStats(bossData: TheTwinsData): StatCardData[] {
  return [
    {
      name: bossData.twins.retinazer.name,
      nameEn: bossData.twins.retinazer.nameEn,
      icon: bossData.twins.retinazer.icon,
      hp: bossData.twins.retinazer.stats.maxLife,
      defense: bossData.twins.retinazer.stats.defense,
      damage: bossData.twins.retinazer.stats.damage,
      notes: `第一階段：${bossData.twins.retinazer.phase1.attack} | 第二階段：${bossData.twins.retinazer.phase2.attack}`,
      color: bossData.twins.retinazer.color,
      danger: "medium",
    },
    {
      name: bossData.twins.spazmatism.name,
      nameEn: bossData.twins.spazmatism.nameEn,
      icon: bossData.twins.spazmatism.icon,
      hp: bossData.twins.spazmatism.stats.maxLife,
      defense: bossData.twins.spazmatism.stats.defense,
      damage: bossData.twins.spazmatism.stats.damage,
      notes: `第一階段：${bossData.twins.spazmatism.phase1.attack} | 第二階段：${bossData.twins.spazmatism.phase2.attack}`,
      color: bossData.twins.spazmatism.color,
      danger: "high",
    },
  ];
}

