const { ethers} = require("ethers");

const ALCHEMY_URL = '';  //输入你的rpc节点
const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_URL);

const privateKey = ''   //输入你的私钥
const wallet = new ethers.Wallet(privateKey, provider)

const abiDuDu = [
    "function publicMint(uint256) public payable",
];
const addressDuDu = '0x365D87a8d31c656ED1479C0F54F19E3BE9F19537'
const contractDuDu = new ethers.Contract(addressDuDu, abiDuDu, wallet)



async function functioncall() {

    const address = await wallet.getAddress()
    console.log('调用mint函数')

    const tx = await contractDuDu.publicMint(1,{value: ethers.utils.parseEther("0.05")})
    await tx.wait()

    console.log(`交易详情：`)
    console.log(tx)

}


async function polling() { 

    try {
        const address = await wallet.getAddress()
        const tx = await contractDuDu.callStatic.publicMint(1, {value: ethers.utils.parseEther("0.05") })
        return false
    } catch (e) {
        return true
    }
    
}

async function main() { 

    while (await polling()) { 
        console.log("未开始mint")
    }
    
    try {
        console.log("开始")
        await functioncall()
        console.log("成功")
    } catch (e) {
        console.log("失败")
    }    
    
}


main().catch ((error) => {
    console.error(error);
    process.exitCode = 1;
  });