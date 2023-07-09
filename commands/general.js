import loadItemStack from "../utils/loadItemStack";
import getItemFromNBT from "../utils/getItemFromNBT";
import Settings from '../config.js'
import isCreative from "../utils/isCreative";
import getClientPrefix from "../utils/getClientPrefix";
import generateKey from "../utils/generateKey";
const housingItems = ["{id:\"minecraft:end_portal_frame\",Count:1b,tag:{display:{Lore:[0:\"§7Place this block in your house\",1:\"§7to place a Teleport Pad!\"],Name:\"§aTeleport Pad\"}},Damage:0s}", "{id:\"minecraft:slime\",Count:1b,tag:{display:{Lore:[0:\"§7Place this block in your house\",1:\"§7to place a Launch Pad!\"],Name:\"§aLaunch Pad\"}},Damage:0s}", "{id:\"minecraft:light_weighted_pressure_plate\",Count:1b,tag:{display:{Lore:[0:\"§7Place this block in your house\",1:\"§7to add a checkpoint to your\",2:\"§7parkour!\"],Name:\"§aParkour Block\"}},Damage:0s}", "{id:\"minecraft:heavy_weighted_pressure_plate\",Count:1b,tag:{display:{Lore:[0:\"§7Place this block in your house\",1:\"§7to place an Action Pad!\"],Name:\"§aAction Pad\"}},Damage:0s}", "{id:\"minecraft:name_tag\",Count:1b,tag:{display:{Lore:[0:\"§7Place this in your house to\",1:\"§7place a Hologram!\"],Name:\"§aHologram\"}},Damage:0s}", "{id:\"minecraft:skull\",Count:1b,tag:{display:{Lore:[0:\"§7Place this in your house to\",1:\"§7place an NPC!\"],Name:\"§aNPC\"}},Damage:3s}", "{id:\"minecraft:stone_button\",Count:1b,tag:{display:{Lore:[0:\"§7Place this block in your house\",1:\"§7to place an Action Button!\"],Name:\"§aAction Button\"}},Damage:0s}", "{id:\"minecraft:book\",Count:1b,tag:{display:{Lore:[0:\"§7Place this in your house to\",1:\"§7place a Stat Leaderboard!\"],Name:\"§aStat Leaderboard\"}},Damage:0s}", "{id:\"minecraft:book\",Count:1b,tag:{display:{Lore:[0:\"§7Place this in your house to\",1:\"§7place a parkour leaderboard!\"],Name:\"§aParkour Leaderboard\"}},Damage:0s}", "{id:\"minecraft:cauldron\",Count:1b,tag:{display:{Lore:[0:\"§7Place this item in your house to\",1:\"§7place a Trash Can!\"],Name:\"§aTrash Can\"},ExtraAttributes:{ITEM_ID:\"TRASH_CAN\"}},Damage:0s}", "{id:\"minecraft:stick\",Count:1b,tag:{ench:[],display:{Lore:[0:\"§7Allows you to change the Biome\",1:\"§7at the §atargeted block§7!\",2:\"\",3:\"§7Biome: §eDesert\",4:\"§7Radius: §e3\",5:\"\",6:\"§eLeft-Click to change settings!\",7:\"§eRight-Click to use!\"],Name:\"§aBiome Stick§7 - §eDesert§7 (3)\"},ExtraAttributes:{data:{biomeType:\"DESERT\",radius:3},ITEM_ID:\"BIOME_STICK\"}},Damage:0s}", "{id:\"minecraft:skull\",Count:1b,tag:{SkullOwner:{Id:\"8fa60b1f-9ce9-2d7e-9210-6d2948c1497a\",hypixelPopulated:1b,Properties:{textures:[0:{Value:\"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYjRiZDlkZDEyOGM5NGMxMGM5NDVlYWRhYTM0MmZjNmQ5NzY1ZjM3YjNkZjJlMzhmN2IwNTZkYzdjOTI3ZWQifX19\"}]}},display:{Lore:[0:\"§7Place this block in your house\",1:\"§7to add a mailbox!\"],Name:\"§aMailbox\"}},Damage:3s}", "{id:\"minecraft:arrow\",Count:1b,tag:{ench:[],display:{Lore:[0:\"§7Undoes your previous fill or\",1:\"§7paste operations.\",2:\"\",3:\"§7Command alias: §b//undo\",4:\"\",5:\"§eRight click to undo.\"],Name:\"§0§bUndo Tool\"}},Damage:0s}", "{id:\"minecraft:stick\",Count:1b,tag:{ench:[],display:{Lore:[0:\"§7Selects a region with left and\",1:\"§7right clicks, which can then be\",2:\"§7modified with other tools.\",3:\"\",4:\"§7Command alias: §b//\",5:\"\",6:\"§eLeft click to select point A.\",7:\"§eRight click to select point B.\"],Name:\"§0§bRegion Selection Tool\"}},Damage:0s}", "{id:\"minecraft:bucket\",Count:1b,tag:{ench:[],display:{Lore:[0:\"§7Opens a menu with options to\",1:\"§7fill your selected region with a\",2:\"§7block type.\",3:\"\",4:\"§7Command alias: §b//set\",5:\"\",6:\"§eClick to open!\"],Name:\"§0§bSet Tool\"}},Damage:0s}", "{id:\"minecraft:water_bucket\",Count:1b,tag:{ench:[],display:{Lore:[0:\"§7Opens a menu with options to\",1:\"§7fill your selected region with a\",2:\"§7block type.\",3:\"\",4:\"§7Command alias: §b//fill\",5:\"\",6:\"§eClick to open!\"],Name:\"§0§bFill Tool\"}},Damage:0s}", "{id:\"minecraft:paper\",Count:1b,tag:{ench:[],display:{Lore:[0:\"§7Copies the selected region to\",1:\"§7your clipboard.\",2:\"\",3:\"§7Command alias: §b//copy\",4:\"\",5:\"§eRight click to copy.\"],Name:\"§0§bCopy Tool\"}},Damage:0s}", "{id:\"minecraft:slime_ball\",Count:1b,tag:{ench:[],display:{Lore:[0:\"§7Pastes the contents of your\",1:\"§7clipboard to your plot at your\",2:\"§7location.\",3:\"\",4:\"§7Command alias: §b//paste\",5:\"\",6:\"§eRight click to paste.\"],Name:\"§0§bPaste Tool\"}},Damage:0s}", "{id:\"minecraft:skull\",Count:1b,tag:{SkullOwner:{Id:\"1042d815-5289-2035-8be2-130c84b45444\",hypixelPopulated:1b,Properties:{textures:[0:{Value:\"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMzY4NWEwYmU3NDNlOTA2N2RlOTVjZDhjNmQxYmEyMWFiMjFkMzczNzFiM2Q1OTcyMTFiYjc1ZTQzMjc5In19fQ==\"}]}},display:{Lore:[0:\"§7When people right click this head they\",1:\"§7will be notified of your Twitter username!\",2:\"\",3:\"§c§lCan only be placed once!\",4:\"\",5:\"§6Alias: §7§7/social twitter username <Username>\"],Name:\"§bTwitter\"}},Damage:3s}", "{id:\"minecraft:skull\",Count:1b,tag:{SkullOwner:{Id:\"fdf8658f-f971-2531-859d-6d1fe6f57bdf\",hypixelPopulated:1b,Properties:{textures:[0:{Value:\"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYjQzNTNmZDBmODYzMTQzNTM4NzY1ODYwNzViOWJkZjBjNDg0YWFiMDMzMWI4NzJkZjExYmQ1NjRmY2IwMjllZCJ9fX0=\"}]}},display:{Lore:[0:\"§7When people right click this head they\",1:\"§7will be notified of your YouTube clean!\",2:\"\",3:\"§c§lCan only be placed once!\",4:\"\",5:\"§6Aliases:\",6:\"§7§7/social youtube clean <Clean>\",7:\"§7§7/social youtube channel <Channel>\"],Name:\"§cYouTube\"}},Damage:3s}", "{id:\"minecraft:skull\",Count:1b,tag:{SkullOwner:{Id:\"c72a446a-5ff5-202d-8ef5-92e8508dbfec\",hypixelPopulated:1b,Properties:{textures:[0:{Value:\"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvYWM4OGQ2MTYzZmFiZTdjNWU2MjQ1MGViMzdhMDc0ZTJlMmM4ODYxMWM5OTg1MzZkYmQ4NDI5ZmFhMDgxOTQ1MyJ9fX0=\"}]}},display:{Lore:[0:\"§7When people right click this head they\",1:\"§7will be notified of your Instagram username!\",2:\"\",3:\"§c§lCan only be placed once!\",4:\"\",5:\"§6Alias: §7§7/social instagram username <Username>\"],Name:\"§7Instagram\"}},Damage:3s}", "{id:\"minecraft:skull\",Count:1b,tag:{SkullOwner:{Id:\"350f7840-4433-25b9-b1f2-1e5ff3d5f9ba\",hypixelPopulated:1b,Properties:{textures:[0:{Value:\"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNDZiZTY1ZjQ0Y2QyMTAxNGM4Y2RkZDAxNThiZjc1MjI3YWRjYjFmZDE3OWY0YzFhY2QxNThjODg4NzFhMTNmIn19fQ==\"}]}},display:{Lore:[0:\"§7When people right click this head they\",1:\"§7will be notified of your Twitch channel!\",2:\"\",3:\"§c§lCan only be placed once!\",4:\"\",5:\"§6Alias: §7§7/social twitch channel <Channel>\"],Name:\"§5Twitch\"}},Damage:3s}", "{id:\"minecraft:skull\",Count:1b,tag:{SkullOwner:{Id:\"7e0ff8fa-5d91-2b95-a4e3-50cc30809dd2\",hypixelPopulated:1b,Properties:{textures:[0:{Value:\"eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNzg3M2MxMmJmZmI1MjUxYTBiODhkNWFlNzVjNzI0N2NiMzlhNzVmZjFhODFjYmU0YzhhMzliMzExZGRlZGEifX19\"}]}},display:{Lore:[0:\"§7When people right click this head they\",1:\"§7will be notified of your Discord server!\",2:\"\",3:\"§c§lCan only be placed once!\",4:\"\",5:\"§6Aliases:\",6:\"§7§7/social discord server <Server>\",7:\"§7§7/social discord username <Username>\"],Name:\"§5Discord\"}},Damage:3s}", "{id:\"minecraft:shears\",Count:1b,tag:{ench:[],display:{Lore:[0:\"§7Deletes the selected region and\",1:\"§7copies it to your clipboard.\",2:\"\",3:\"§7Command alias: §b//cut\",4:\"\",5:\"§eRight click to cut.\"],Name:\"§0§bCut Tool\"}},Damage:0s}", "{id:\"minecraft:iron_horse_armor\",Count:1b,tag:{ench:[],display:{Lore:[0:\"§7Opens a menu with options to\",1:\"§7Wireframe your selected region\",2:\"§7with a block type.\",3:\"\",4:\"§7Command alias: §b//wireframe\",5:\"\",6:\"§eClick to open!\"],Name:\"§0§bWireframe Tool\"}},Damage:0s}", "{id:\"minecraft:fence\",Count:1b,tag:{ench:[],display:{Lore:[0:\"§7Opens a menu with options to\",1:\"§7Wall your selected region with a\",2:\"§7block type.\",3:\"\",4:\"§7Command alias: §b//walls\",5:\"\",6:\"§eClick to open!\"],Name:\"§0§bWalls Tool\"}},Damage:0s}"]

register('command', () => {
  Settings.openGUI()
}).setName('housingninja').setAliases(['hn'])

register('command', (dv) => {
  let item = Player.getHeldItem();
  if (!isCreative())
    return ChatLib.chat(`${prefix} &cYou must be in creative mode to use this command.`);
  if (!item)
    return ChatLib.chat(`${prefix} &cYou must be holding an item to use this command.`);
  if (!dv) return ChatLib.chat(`${getClientPrefix()} &4Invalid Usage! &c / datavalue < Data Value > `)
  if (isNaN(parseInt(dv))) return ChatLib.chat(`${getClientPrefix()} &cThe specified data value is not a number!`)
  loadItemStack(item.setLore([`§7Data Value: ${dv}`]).itemStack, Player.getHeldItemIndex() + 36);
  ChatLib.chat(`${getClientPrefix()} &aSuccessfully set the item's &7Data Value &ato &7${dv}&a!`)
}).setName('datavalue').setAliases(['dv'])

register('command', () => {
  if (!isCreative())
    return ChatLib.chat(getClientPrefix() + " &cYou must be in creative mode to use this command.");
  let index = 9
  housingItems.forEach(i => {
    item = getItemFromNBT(i)
    if (Settings.obfuscateItemLore) {
      item.setLore(["&6Blacklist Anti-Detection: " + generateKey(128)])
    }
    loadItemStack(item.itemStack, index)
    index++
  })


  ChatLib.chat(`${getClientPrefix()} &aSuccessfully loaded your inventory with all the housing items! &7(Check your inventory)`)
  World.playSound("random.pop", 1, 1)
}).setName('housingitems').setAliases(['hitems'])

register('command', () => {
  let item = Player.getHeldItem();
  if (!isCreative())
    return ChatLib.chat(getClientPrefix() + " &cYou must be in creative mode to use this command.");
  if (!item)
    return ChatLib.chat(`${getClientPrefix()} &cYou must be holding an item to use this command.`);
  let itemType = item.getRegistryName()
  let itemDamage = item.getDamage()
  if (itemType === "minecraft:stone_slab") {
    if (itemDamage === 0) {
      loadItemStack(item.setLore([`§7Data Value: 8`]).itemStack, Player.getHeldItemIndex() + 36);
    } else if (itemDamage === 1) {
      loadItemStack(item.setLore([`§7Data Value: 9`]).itemStack, Player.getHeldItemIndex() + 36);
    } else {
      return ChatLib.chat(`${getClientPrefix()} &cSorry! This item does not have a six-sided variant.`);
    }
  } else if (itemType === "minecraft:stone_slab2") {
    loadItemStack(item.setLore([`§7Data Value: 8`]).itemStack, Player.getHeldItemIndex() + 36);
  } else if (itemType === "minecraft:log") {
    if (itemDamage === 0) {
      loadItemStack(item.setLore([`§7Data Value: 12`]).itemStack, Player.getHeldItemIndex() + 36);
    } else if (itemDamage === 1) {
      loadItemStack(item.setLore([`§7Data Value: 13`]).itemStack, Player.getHeldItemIndex() + 36);
    } else if (itemDamage === 2) {
      loadItemStack(item.setLore([`§7Data Value: 14`]).itemStack, Player.getHeldItemIndex() + 36);
    } else if (itemDamage === 3) {
      loadItemStack(item.setLore([`§7Data Value: 15`]).itemStack, Player.getHeldItemIndex() + 36);
    } else { return ChatLib.chat(`${getClientPrefix()} &cSorry! This item does not have a six-sided variant.`); }
  } else if (itemType === "minecraft:log2") {
    if (itemDamage === 0) {
      loadItemStack(item.setLore([`§7Data Value: 12`]).itemStack, Player.getHeldItemIndex() + 36);
    } else if (itemDamage === 1) {
      loadItemStack(item.setLore([`§7Data Value: 13`]).itemStack, Player.getHeldItemIndex() + 36);
    } else {
      return ChatLib.chat(`${getClientPrefix()} &cSorry! This item does not have a six-sided variant.`)
    }
  } else {
    return ChatLib.chat(`${getClientPrefix()} &cSorry! This item does not have a six - sided variant.`);
  }

  ChatLib.chat(`${getClientPrefix()} &aSuccessfully converted item to be six-sided!`)
}).setName("sixside")

/*
DEV COMMAND

register('command', () => {
  itemList = []
  Player.getInventory().getItems().forEach((i) => {
    if (i) { itemList.push(i.getRawNBT()) }
  })
  ChatLib.command(`ct copy ${JSON.stringify(itemList)}`, true)
}).setName('saveinv')

*/