<script setup>
/**
 * 寶箱怪狩獵指南 - DocLayout 示範頁面
 * 
 * 此頁面展示如何使用 DocLayout 組件。
 * 不需要手動傳入目錄陣列，組件會自動掃描 <h2> 標籤生成側邊目錄。
 */
import DocLayout from '@/layouts/DocLayout.vue'
import BaseIcon from '@/components/BaseIcon.vue'
</script>

<template>
  <DocLayout title="本頁目錄">
    <!-- 
      ============================================
      以下內容會被自動掃描
      所有 <h2> 標籤會自動出現在側邊目錄中
      ============================================
    -->
    
    <!-- 頁面標題 (h1 不會被收錄到目錄) -->
    <header class="mb-8">
      <div class="flex items-center gap-4 mb-4">
        <div class="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-amber-500 to-yellow-400 rounded-xl">
          <BaseIcon 
            icon="https://terraria.wiki.gg/images/f/f5/Mimic.png" 
            :size="48" 
          />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 m-0">寶箱怪狩獵指南</h1>
          <p class="text-gray-500 text-sm m-0">Biome Mimic Hunting Guide</p>
        </div>
      </div>
      <p class="text-gray-600 leading-relaxed">
        學習如何召喚並擊敗生物群系寶箱怪，獲取困難模式的強力武器和配件。
        本指南涵蓋三種寶箱怪的召喚方式、掉落物以及戰鬥策略。
      </p>
    </header>
    
    <!-- ========== 自動生成目錄的 h2 標題 ========== -->
    
    <h2>種類介紹</h2>
    <p>
      生物群系寶箱怪 (Biome Mimics) 是困難模式中三種強大的敵對生物，
      分別對應神聖之地、腐化之地和猩紅之地。與普通寶箱怪不同，
      這些特殊的寶箱怪必須透過特定方式召喚。
    </p>
    
    <h3>神聖寶箱怪 (Hallowed Mimic)</h3>
    <p>
      外觀為金色寶箱，需要使用<strong>光之鑰 (Key of Light)</strong> 召喚。
      掉落物包括代達羅斯風暴弓、飛刀匕首、水晶碎片等。
      其中代達羅斯風暴弓是對付毀滅者的神器。
    </p>
    
    <h3>腐化寶箱怪 (Corrupt Mimic)</h3>
    <p>
      外觀為紫色寶箱，需要使用<strong>闇之鑰 (Key of Night)</strong> 在腐化世界召喚。
      掉落物包括鏈鍘刀、蛆蟲圍巾、詛咒之焰法杖等。
      蛆蟲圍巾是非常實用的防禦配件。
    </p>
    
    <h3>猩紅寶箱怪 (Crimson Mimic)</h3>
    <p>
      外觀為紅色寶箱，需要使用<strong>闇之鑰 (Key of Night)</strong> 在猩紅世界召喚。
      掉落物包括惡臭虎爪、血肉指虎、生命吸取杖等。
      惡臭虎爪是近戰玩家的利器。
    </p>
    
    <h2>召喚方式</h2>
    <p>
      召喚生物群系寶箱怪的方法非常簡單，只需要準備對應的鑰匙和一個空寶箱：
    </p>
    
    <ol>
      <li><strong>取得鑰匙</strong> - 在對應生物群系擊殺敵人，或使用靈魂合成</li>
      <li><strong>放置空寶箱</strong> - 任何類型的寶箱都可以，確保完全清空</li>
      <li><strong>放入鑰匙</strong> - 將一把鑰匙放入寶箱的第一格</li>
      <li><strong>關閉寶箱</strong> - 關閉介面後，寶箱會立即變身為寶箱怪！</li>
    </ol>
    
    <blockquote>
      <strong>⚠️ 注意：</strong>寶箱必須是空的，只需放入 1 把鑰匙。
      關閉寶箱後會立即開始戰鬥，請做好準備！
    </blockquote>
    
    <h2>鑰匙取得</h2>
    <p>
      鑰匙可以透過兩種方式取得：
    </p>
    
    <h3>自然掉落</h3>
    <p>
      在對應的地下生物群系擊殺敵人時，有 <code>1/2500</code> 的機率掉落鑰匙。
      雖然機率極低，但在刷怪過程中偶爾會意外獲得。
    </p>
    
    <h3>合成製作</h3>
    <p>
      更可靠的方式是透過合成：
    </p>
    <ul>
      <li><strong>光之鑰</strong>：15 個靈魂光 (Soul of Light) → 工作台合成</li>
      <li><strong>闇之鑰</strong>：15 個靈魂暗 (Soul of Night) → 工作台合成</li>
    </ul>
    
    <p>
      靈魂可以在地下神聖/腐化/猩紅區域輕鬆刷取。
      建議使用戰鬥藥水和水蠟燭來加速刷取效率。
    </p>
    
    <h2>戰鬥策略</h2>
    <p>
      生物群系寶箱怪的血量約為 3,500，攻擊力也相當高。
      以下是一些實用的戰鬥建議：
    </p>
    
    <h3>場地準備</h3>
    <ul>
      <li>建造一個平坦的戰鬥場地，約 50-80 格長</li>
      <li>放置篝火和心形燈籠增加回復</li>
      <li>可選：設置蜂蜜池用於緊急回血</li>
    </ul>
    
    <h3>推薦裝備</h3>
    <ul>
      <li><strong>武器</strong>：遠程武器最為安全（如：巨獸鯊、代達羅斯弓）</li>
      <li><strong>防具</strong>：至少神聖套裝或同等級</li>
      <li><strong>配件</strong>：翅膀（必備）、閃電靴、十字項鍊</li>
    </ul>
    
    <h3>戰鬥技巧</h3>
    <p>
      寶箱怪會進行跳躍攻擊，動作有明顯的預備動作。
      保持移動，利用翅膀保持距離，在牠跳躍時進行輸出。
      避免被逼到角落，保持充足的移動空間。
    </p>
    
    <h2>掉落物總覽</h2>
    <p>
      以下是三種寶箱怪的主要掉落物：
    </p>
    
    <table>
      <thead>
        <tr>
          <th>寶箱怪類型</th>
          <th>專屬掉落</th>
          <th>推薦職業</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>神聖寶箱怪</td>
          <td>代達羅斯風暴弓、飛刀匕首、照明面具</td>
          <td>遠程、近戰</td>
        </tr>
        <tr>
          <td>腐化寶箱怪</td>
          <td>鏈鍘刀、蛆蟲圍巾、詛咒之焰法杖</td>
          <td>近戰、法師</td>
        </tr>
        <tr>
          <td>猩紅寶箱怪</td>
          <td>惡臭虎爪、血肉指虎、生命吸取杖</td>
          <td>近戰、法師</td>
        </tr>
      </tbody>
    </table>
    
    <div class="tip">
      <div class="tip-title">💡 小技巧</div>
      <p class="m-0">
        每種寶箱怪都有 25% 的機率掉落其專屬武器。
        如果沒有得到想要的物品，可以繼續召喚直到獲得。
      </p>
    </div>
    
    <h2>常見問題</h2>
    
    <h3>Q: 寶箱放入鑰匙後沒有變身？</h3>
    <p>
      請確認寶箱是完全空的，且只放入了一把鑰匙。
      另外，確保你的世界已經進入困難模式。
    </p>
    
    <h3>Q: 可以在任何地方召喚嗎？</h3>
    <p>
      是的！不需要在特定生物群系召喚。
      只要使用對應的鑰匙，就會召喚出對應類型的寶箱怪。
    </p>
    
    <h3>Q: 死亡後寶箱怪會消失嗎？</h3>
    <p>
      不會！寶箱怪會持續存在直到被擊敗。
      建議在基地附近召喚，方便死亡後快速返回戰鬥。
    </p>
    
    <div class="warning">
      <div class="warning-title">⚠️ 注意事項</div>
      <p class="m-0">
        不要同時召喚多隻寶箱怪，它們的攻擊會非常難以應對。
        建議一次只召喚一隻，擊敗後再召喚下一隻。
      </p>
    </div>
  </DocLayout>
</template>

<style scoped>
/* 頁面特定樣式可以在這裡添加 */
</style>

