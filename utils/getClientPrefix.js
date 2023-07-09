function getClientPrefix() {
    return JSON.parse(FileLib.read("HousingNinja", "./data/moddata.json"))["prefix"]
}

export default getClientPrefix