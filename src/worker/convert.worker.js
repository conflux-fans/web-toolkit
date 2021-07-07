import { parse } from "papaparse";
import { default as sdk } from "js-conflux-sdk";

self.onmessage = (msg) => {
  let data = msg.data;
  try {
    const { text, filename, netId } = data;
    const rows = parse(text).data;
    let convertedAddresses = [];
    let csv_msg = [`Error occured in ${filename}:`];

    for (let i = 0; i < rows.length; ++i) {
      const results = rows[i];

      // 空行，会跳过其他判断直接进行下一行的处理
      if (results.length === 1 && !results[0]) {
        continue;
      }

      // 对每一行都进行错误检查 最后将所有行的错误一起抛出
      try {
        if (results.length !== 1) {
          throw new Error("column count is not 1");
        }

        const addr = results[0].trim();

        // 对标题行的判断
        if (i === 0) {
          if (addr === "address") {
            continue;
          }
        }
        // one line
        convertedAddresses.push([convertAddressTo(addr, netId)]);
      } catch (e) {
        csv_msg.push(`ERROR: CSV ROW ${i + 1} - ${e.message}`);
      }
    }
    if (csv_msg.length > 1) {
      throw new Error(csv_msg.join("\n"));
    } else {
      self.postMessage({
        from: 'convert',
        convertedAddresses,
        filename,
        netId
      })
    }
  } catch (err) {
    self.postMessage({
      from: "convert",
      error: err,
    });
  }
};

function convertAddressTo(address, netId) {
  if (netId == -1) {
    return sdk.format.hexAddress(address);
  }
  return sdk.format.address(address, parseInt(netId));
}
