import { ethers } from "ethers";
import { HDNode } from "@ethersproject/hdnode";

self.onmessage = (msg) => {
  try {
    let { num, mnemonic, from } = msg.data;
    let seed = HDNode.fromMnemonic(mnemonic, null).derivePath("m/44'/60'/0'/0")

    for (let i = 0; i < num; ++i) {
      let result = findNext(seed, from)
      self.postMessage(result)
      from = result.index + 1
    }
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

function findNext(seed, from) {
  let index = from
  /* eslint-disable no-constant-condition */
  while(true) {
  /* eslint-enable */
    let wallet = new ethers.Wallet(seed.derivePath(`${index}`))
    // console.log(wallet.address)
    if(wallet.address.substr(0,3) === '0x1'){
      return {
        index,
        address: wallet.address
      }
    }
    index += 1;
  }
}