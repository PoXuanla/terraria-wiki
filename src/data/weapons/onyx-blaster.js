/**
 * 瑪瑙爆破槍 (Onyx Blaster)
 * 
 * 遠程武器 - 困難模式 Tier 1 推薦武器
 * 來源：製作
 */
export default {
  // 識別碼
  slug: 'onyx-blaster',
  
  // 基本資訊
  name: '瑪瑙爆破槍',
  nameEn: 'Onyx Blaster',
  class: 'Ranger',
  classLabel: '遠程',
  
  // 稀有度
  rarity: {
    level: 5,
    color: '#f472b6',
    label: '稀有度 5',
  },
  
  // 圖示與連結
  icon: 'https://terraria.wiki.gg/images/c/c0/Onyx_Blaster.png',
  wikiUrl: 'https://terraria.wiki.gg/wiki/Onyx_Blaster',
  
  // 數值屬性
  stats: {
    damage: {
      value: 24,
      label: '傷害',
    },
    knockback: {
      value: 6.5,
      label: '擊退',
      description: '強',
    },
    critChance: {
      value: 4,
      label: '暴擊率',
    },
    useTime: {
      value: 45,
      label: '使用時間',
      description: '非常慢',
    },
  },
  
  // 描述
  description: '霰彈槍的強化版本，除了發射霰彈子彈散射外，還會同時發射一顆巨大的黑色能量彈，造成額外的爆發傷害。能量彈擁有穿透能力，可擊中多個敵人。',
  
  // 取得方式
  source: {
    type: 'crafting',
    station: '秘銀砧 / 山銅砧',
    recipe: [
      {
        name: '霰彈槍',
        nameEn: 'Shotgun',
        icon: 'https://terraria.wiki.gg/images/0/09/Shotgun.png',
        count: 1,
      },
      {
        name: '暗黑碎片',
        nameEn: 'Dark Shard',
        icon: 'https://terraria.wiki.gg/images/8/86/Dark_Shard.png',
        count: 2,
      },
      {
        name: '暗影之魂',
        nameEn: 'Soul of Night',
        icon: 'https://terraria.wiki.gg/images/7/77/Soul_of_Night.png',
        count: 10,
      },
    ],
  },
  
  // 推薦理由
  whyGood: '百鯊的最佳替代品！瑪瑙爆破槍擁有極高的爆發傷害，製作材料容易取得，可以在挑戰任何機械 Boss 之前就製作完成。黑色能量彈的穿透效果讓它在面對群體敵人時也非常有效。對於沒有刷到代達羅斯風暴弓的遠程職業玩家來說，這是進入困難模式後的首選武器。',
  
  // 使用技巧
  tips: [
    {
      title: '彈藥選擇',
      content: '建議搭配隕石彈或水晶子彈使用，可以最大化 DPS 輸出。',
    },
    {
      title: '射擊距離',
      content: '雖然霰彈會散射，但黑色能量彈是直線飛行的，嘗試保持中等距離以確保兩種攻擊都能命中。',
    },
    {
      title: '對付機械 Boss',
      content: '對雙子魔眼效果極佳，能量彈可以同時命中兩隻眼睛。',
    },
  ],
}

