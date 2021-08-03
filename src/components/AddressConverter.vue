<template>
  <div>
    <el-card>
      <el-row class="bold-font">
        <el-col :span="5">
          {{ $t("message.addressConverter.targetFormat") }}
        </el-col>
        <el-col :offset="1" :span="4">
          <div v-if="!toHex">{{ $t("message.addressConverter.netId") }}</div>
        </el-col>
        <el-col> </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="5">
          <el-select
            v-model="toHex"
            size="small"
            :disabled="isConverting"
            >
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
          <el-select
            :disabled="isConverting"
            v-if="!toHex"
            v-model="selectedNetId"
            clearable
            filterable
            allow-create
            default-first-option
            size="small"
            :placeholder="$t('message.addressConverter.netPlaceholder')"
          >
            <el-option
              v-for="item in networkOptions"
              :key="item.value"
              :value="item.value"
            >
              <span style="float: left">{{ item.value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.label
              }}</span>
            </el-option>
          </el-select>
          <div>&nbsp;</div>
        </el-col>
        
        <el-col :offset="1" :span="3">
          <el-button
            @click="downloadConvertedCsv"
            :disabled="!this.result"
            size="small"
            :type="status"
            >{{ $t("message.addressConverter.download") }}
            <i class="el-icon-download"></i>
          </el-button>
        </el-col>
        <el-col :offset="1" :span="3">
          <el-tag
            v-if="isConverting"
            type="primary"
            >{{ $t("message.addressConverter.converting") }}
            <i :class="convertIcon"></i>
          </el-tag>
        </el-col>
      </el-row>
    </el-card>
    <el-card v-if="isCsvError">
      <el-row>
        <i
          style="float: right; cursor: pointer"
          class="el-icon-close"
          @click="hideError"
        ></i>

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
          :disabled="isConverting"
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
import { unparse } from "papaparse";
import Worker from "../worker/convert.worker";

export default {
  name: "AddressConverter",
  data() {
    return {
      isConverting: false,
      result: null,
      csvError: null,
      selectedNetId: "1029",
      toHex: false,
      fileList: [],
      options: [
        {
          value: true,
          label: "hex",
        },
        {
          value: false,
          label: "base32",
        },
      ],
      networkOptions: [
        {
          value: "1",
          label: "cfxtest",
        },
        {
          value: "1029",
          label: "cfx",
        },
      ],
    };
  },
  computed: {
    status() {
      if (this.result)
        return 'success'
      return 'info'
    },
    convertIcon() {
      if (this.isConverting)
        return "el-icon-loading"
      return "el-icon-refresh"
    },
    convertDisabled() {
      return !this.fileList.length || this.selectedNetId === "";
    },
    isCsvError() {
      return Boolean(this.csvError);
    },
    csvErrorMessageList() {
      return this.csvError.message.split("\n");
    },
  },
  watch: {},
  methods: {
    hideError() {
      this.csvError = null;
    },
    clearFiles() {
      this.csvError = null;
      this.fileList = [];
      this.$refs.upload.clearFiles();
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
      this.convertFile();
      this.$refs.upload.clearFiles();
    },
    async convertFile() {
      this.csvError = null;
      try {
        if (!this.toHex) {
          if (this.selectedNetId === "")
            throw new Error("Invalid empty network Id")
          var r = /^[0-9]*$/; // 正整数
          if (!r.test(this.selectedNetId))
            throw new Error(`Invalid network Id: ${this.selectedNetId}`);
        }

        const worker = new Worker()

        this.isConverting = true
        this.result = null
        this.receivedCount = 0

        worker.onmessage = (msg) => {
          let result = msg.data;
          if (result.from !== "convert")
            return;
          if (result.error) {
            result.error._type = "csvError"
            this.processError(result.error)
          } else {
            this.result = result
            this.$notify({
              type: 'success',
              title: this.$t('message.addressConverter.success'),
              offset: 60,
              duration: 6000,
            })
          }
          this.isConverting = false
          
        }

        await this.postConvertMessage(worker, this.fileList[0].raw);
      } catch (err) {
        err._type = "csvError";
        this.processError(err);
      }
    },
    async postConvertMessage(worker, file) {
      const filename = file.name
      const text = await file.text()
      const netId = this.toHex ? -1 : this.selectedNetId;
      worker.postMessage({
        filename,
        text,
        netId
      })
    },
    downloadConvertedCsv() {
      const { convertedAddresses, filename, netId } = this.result
      let csvContent =
        "data:text/csv;charset=utf-8," + unparse(convertedAddresses);
      let encodedUri = window.encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);

      let namesplice = filename.split(".");

      const suffix = this.toHex ? "hex" : `netId-${netId}`;

      namesplice.splice(namesplice.length - 1, 0, suffix);

      link.setAttribute("download", namesplice.join("."));
      document.body.appendChild(link);

      link.click();
    },
    processError(err) {
      if (err._type === "csvError") {
        if (!this.csvError) {
          this.csvError = err;
        }
        else {
          err.message = `${this.csvError.message}\n${err.message}`
          this.csvError = err
        }
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