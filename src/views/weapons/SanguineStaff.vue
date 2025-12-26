<script setup lang="ts">
import WeaponLayout from "@/components/weapons/WeaponLayout.vue";
import StrategyGuide from "@/components/weapons/StrategyGuide.vue";
import { sanguineStaff as weaponData } from "@/data/weapons";
</script>

<template>
  <WeaponLayout :weapon="weaponData">
    <StrategyGuide
      :meta="weaponData.meta"
      :detailedDescription="weaponData.detailedDescription"
    />
  </WeaponLayout>
</template>
