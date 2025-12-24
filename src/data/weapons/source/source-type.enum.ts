/**
 * 武器取得方式類型
 */
export enum SourceType {
  /** 製作合成 */
  Crafting = 'crafting',
  /** 怪物/Boss 掉落 */
  Drop = 'drop',
  /** NPC 購買 */
  Purchase = 'purchase',
  /** 寶箱獲得 */
  Chest = 'chest',
  /** 釣魚獲得 */
  Fishing = 'fishing',
  /** 木箱/寶箱包 */
  Crate = 'crate',
  /** 任務獎勵 */
  Quest = 'quest',
  /** 事件獎勵 */
  Event = 'event',
  /** Boss 寶藏袋 */
  Bag = 'bag',
  /** 其他特殊方式 */
  Other = 'other',
}

