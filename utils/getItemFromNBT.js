const getItemFromNBT = (nbtStr) => {
    const MCItemStack = Java.type("net.minecraft.item.ItemStack");
    const nbt = net.minecraft.nbt.JsonToNBT.func_180713_a(nbtStr);
    return new Item(MCItemStack.func_77949_a(nbt));
}
export default getItemFromNBT