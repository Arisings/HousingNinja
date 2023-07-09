import { @Vigilant, @SwitchProperty, @CheckboxProperty, @ButtonProperty, @PercentSliderProperty, @TextProperty } from 'Vigilance';


@Vigilant("HousingNinja", "HousingNinja Settings")
class Settings {

    @SwitchProperty({
        name: "Obfuscate \"/housingitems\" housing items",
        description: "Obfuscate the lore of the housing items from /housingitems to prevent FreeBuild blacklist systems that detect items based on their NBT from detecting the items.",
        category: "Settings",
        subcategory: "Commands"
    })
    obfuscateItemLore = false

    constructor() {
        this.initialize(this);
    }
}

export default new Settings();