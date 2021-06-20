<template>
  <div>
    <el-card>
      <el-row class="bold-font">
        <el-col :span="5"> Source Format </el-col>
        <el-col :offset="1" :span="5"> Target Format </el-col>
        <el-col :offset="1" :span="4">
          <div v-if="!toHex">Net ID</div>
        </el-col>
        <el-col> </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="5">
          <label>Any</label>
        </el-col>
        <el-col :span="1">
          <i class="el-icon-right"></i>
        </el-col>
        <el-col :span="5">
          <el-select v-model="toHex" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :offset="1" :span="4">
          <el-input-number
            v-if="!toHex"
            v-model="selectedNetId"
            controls-position="right"
            :min="1"
            class="full-width"
            size="small"
          ></el-input-number>
          <div>&nbsp;</div>
        </el-col>
        <el-col :offset="1" :span="3">
          <el-button
            @click="convertFile"
            :disabled="!fileList.length"
            size="small"
            type="primary"
            >convert <i class="el-icon-refresh"></i>
          </el-button>
        </el-col>
        <el-col :offset="1" :span="3">
          <el-button
            @click="clearFiles"
            :disabled="!fileList.length"
            size="small"
            type="info"
            >RESET
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card v-if="isCsvError">
      <el-row >
        <i style="float: right; cursor: pointer" class="el-icon-close" @click="hideError"></i>

        <div
          style="color: red; height: 240px; overflow: scroll"
          class="bold-font"
        >
          <ul>
            <li v-for="msg in csvErrorMessageList" v-bind:key="msg">
              {{ msg }}
            </li>
          </ul>
        </div>
      </el-row>
    </el-card>
    <el-card>
      <el-row type="flex">
        <el-upload
          class="upload-demo full-width"
          drag
          ref="upload"
          action="#"
          :on-change="handleChange"
          :auto-upload="false"
          :multiple="false"
          accept="text/csv"
        >
          <!-- <i class="el-icon-upload2" style="font-size: 8em"></i> -->
          <i class="el-icon-upload" style="font-size: 8em"></i>
          <div class="el-upload__text">
            {{ $t("message.tooltip.csv.drag")
            }}<em>{{ $t("message.tooltip.csv.clickToUpload") }}</em>
          </div>
          <el-row slot="tip" type="flex" justify="space-between">
            <el-col :span="6">{{ $t("message.tooltip.csv.resolve") }}</el-col>
            <el-col :span="6">
              <div class="right-align">
                <el-link
                  href="./convert-example.csv"
                  type="info"
                  target="_blank"
                  >{{ $t("message.tooltip.csv.checkExample")
                  }}<i class="el-icon-notebook-1"></i
                ></el-link>
              </div>
            </el-col>
          </el-row>
          <div class="el-upload__tip" slot="tip">
            <el-row>
              {{ $t("message.tooltip.csv.format") }}
            </el-row>
            <el-row>
              {{ $t("message.tooltip.csv.titleLine") }}
            </el-row>
            <el-row>
              {{ $t("message.tooltip.csv.big") }}
            </el-row>
          </div>
        </el-upload>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { parse, unparse } from "papaparse";
import { default as sdk } from "js-conflux-sdk";

window.sdk = sdk;

export default {
  name: "AddressConverter",
  data() {
    return {
      csvError: null,
      fileUploaded: false,
      selectedNetId: "1",
      toHex: true,
      // file: null,
      fileList: [],
      options: [
        {
          value: true,
          label: "hex40",
        },
        {
          value: false,
          label: "base32",
        },
      ],
    };
  },
  computed: {
    isCsvError() {
      return Boolean(this.csvError);
    },
    csvErrorMessageList() {
      return this.csvError.message.split("\n");
    },
  },
  watch: {
    fileList(newVal) {
      console.log(newVal);
    },
  },
  methods: {
    hideError() {
      this.csvError = null;
    },
    clearFiles() {
      this.csvError = null;
      this.$refs.upload.clearFiles();
    },
    handleChange(file, fileList) {
      console.log(file);
      console.log(fileList);
      this.fileList = fileList;
    },

    // static tool function
    convertAddressTo(address, netId) {
      if (netId == -1) {
        return sdk.format.hexAddress(address);
      }
      return sdk.format.address(address, parseInt(netId));
    },
    async convertFile() {
      try {
        for (let i = 0; i < this.fileList.length; ++i) {
          await this.convertSingleFile(this.fileList[i].raw);
        }
      } catch (err) {
        err._type = "csvError";
        this.processError(err);
      }
    },
    async convertSingleFile(file) {
      const c = await file.text();
      const rows = parse(c).data;

      let convertedAddresses = [];
      let csv_msg = [`Error occured in ${file.name}:`];

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
          const netId = this.toHex ? -1 : this.selectedNetId;
          convertedAddresses.push([this.convertAddressTo(addr, netId)]);
        } catch (e) {
          csv_msg.push(`ERROR: CSV ROW ${i + 1} - ${e.message}`);
        }
      }

      if (csv_msg.length > 1) {
        throw new Error(csv_msg.join("\n"));
      } else {
        // console.log(unparse(convertedAddresses))
        let csvContent =
          "data:text/csv;charset=utf-8," + unparse(convertedAddresses);
        let encodedUri = window.encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);

        let namesplice = file.name.split(".");

        const suffix = this.toHex ? "hex" : `netId-${this.selectedNetId}`;

        namesplice.splice(namesplice.length - 1, 0, suffix);

        link.setAttribute("download", namesplice.join("."));
        document.body.appendChild(link);

        link.click();
      }
    },
    processError(err) {
      if (err._type === "csvError") {
        this.csvError = err;
      } else {
        this.$alert(err.message, this.$t("message.error.error"));
      }
    },
  },
};
</script>

<style scoped>
.upload-demo /deep/ .el-upload-dragger {
  width: 100%;
}
.upload-demo /deep/ .el-upload {
  width: 100%;
}
.el-upload__tip /deep/ .el-row {
  margin: 2px;
}

li {
  margin: 8px;
}
</style>