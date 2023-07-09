import getClientPrefix from "../utils/getClientPrefix";
const Base64 = Java.type("java.util.Base64");
const JString = Java.type("java.lang.String")
let copyActionData;

register('command', () => {
    let item = Player.getHeldItem()
    if (!item)
        return ChatLib.chat(`${getClientPrefix()} &cYou must be holding an item to use this command.`);
    if (!item.getNBT()?.getCompoundTag('tag')?.getCompoundTag("ExtraAttributes")?.getString('interact_data')) return ChatLib.chat(`${getClientPrefix()} &cThis item has no click actions!`)

    const actionToken = item.getNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes').getString('interact_data')
    const parts = actionToken.split('.');
    const header = JSON.parse(new JString(Base64.getDecoder().decode(parts[0])))
    const payload = JSON.parse(new JString(Base64.getDecoder().decode(parts[1])))
    const signature = parts[2]

    let encodedActionData = payload['data']
    var bytearray = java.util.Base64.getDecoder().decode(encodedActionData);
    var inputstream = new java.io.ByteArrayInputStream(bytearray);
    var decodedActionDataNBT = net.minecraft.nbt.CompressedStreamTools.func_74796_a(inputstream);

    let decodedActionData = new NBTTagCompound(decodedActionDataNBT).toObject()
    copyActionData = decodedActionDataNBT
    var itemActions = new Message(
        new TextComponent(
            "\n&bHeld Item Action Data &3&l(&3Click to Copy&3&l)\n\n" +
            JSON.stringify(decodedActionData, null, 4) +
            "\n"
        )
            .setHoverValue("&eClick to copy")
            .setClick("run_command", `/copy-ad`)
    );
    ChatLib.chat(itemActions)
}).setName('viewactions').setAliases(['va'])

register('command', () => {
    ChatLib.command(`ct copy ${copyActionData}`, true)
    ChatLib.chat(`${getClientPrefix()} &aCopied action data to clipboard.`)
}).setName('copy-ad')