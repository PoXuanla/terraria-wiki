<script setup>
import WeaponLayout from "@/components/weapons/WeaponLayout.vue";
import StrategyGuide from "@/components/weapons/StrategyGuide.vue";
import { daedalusStormbow as weaponData } from "@/data/weapons";
</script>

<template>
  <WeaponLayout :weapon="weaponData">
    <StrategyGuide 
      :meta="weaponData.meta" 
      :detailedDescription="weaponData.detailedDescription" 
    />
  </WeaponLayout>
</template>
