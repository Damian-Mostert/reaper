async function main(){
    await require("../server/build").server()
    await require("../server/build").client()
}
main()