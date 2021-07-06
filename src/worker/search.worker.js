import { ethers } from "ethers";
import { HDNode } from "@ethersproject/hdnode";

self.onmessage = (msg) => {
  try {
    let { num, mnemonic, from } = msg.data;
    let seed = HDNode.fromMnemonic(mnemonic, null).derivePath("m/44'/60'/0'/0")

    // 查找 num 个满足要求的 index，每找到一个就将结果返回
    for (let i = 0; i < num; ++i) {
      let result = findNext(seed, from)
      self.postMessage(result)
      from = result.index + 1
    }
    // completed 字段用于标记搜索结束
    self.postMessage({
      completed: true
    })
  } catch (e) {
    self.postMessage({
      completed: true,
      error: e
    })
  }
};

/**
 * 搜索派生路径 `m/44'/60'/0'/0/${index}` 返回0x1开头的地址与对应的index
 * @param {*} seed 由助记词派生的路径为 “m/44'/60'/0'/0” 的种子 在搜索时只需要对该种子根据index进行派生即可
 * @param {*} from index 搜索的起始点
 * @returns 第一对 (index, address) 满足 index >= from && address 以 0x1 开头
 */
function findNext(seed, from) {
  let index = from
  /* eslint-disable no-constant-condition */
  while(true) {
  /* eslint-enable */
    let wallet = new ethers.Wallet(seed.derivePath(`${index}`))
    if(wallet.address.substr(0,3) === '0x1'){
      return {
        index,
        address: wallet.address
      }
    }
    index += 1;
  }
}