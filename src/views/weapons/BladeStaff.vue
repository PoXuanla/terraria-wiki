<script setup>
import WeaponLayout from "@/components/WeaponLayout.vue";
import StrategyGuide from "@/components/StrategyGuide.vue";
import { bladeStaff as weaponData } from "@/data/weapons";
</script>

<template>
  <WeaponLayout :weapon="weaponData">
    <StrategyGuide 
      :meta="weaponData.meta" 
      :detailedDescription="weaponData.detailedDescription" 
    />
  </WeaponLayout>
</template>
