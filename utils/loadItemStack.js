const C10PacketCreativeInventoryAction = Java.type(
    "net.minecraft.network.play.client.C10PacketCreativeInventoryAction"
);

const loadItemStack = (itemStack, slot) => {
    Client.sendPacket(
        new C10PacketCreativeInventoryAction(
            slot,
            itemStack
        )
    );
};

export default loadItemStack