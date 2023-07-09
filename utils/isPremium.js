function isPremium() {
    returnJSON.parse(FileLib.read("HousingNinja", "./data/moddata.json"))["isPremium"]
}
export default isPremium