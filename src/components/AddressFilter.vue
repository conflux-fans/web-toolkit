<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="16">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入英文助记词"
            v-model="mnemonic"
            :disabled="isSearching"
          >
          </el-input>
        </el-col>
        <el-col :offset="1" :span="2">
          <el-input-number
            v-model="num"
            controls-position="right"
            :min="1"
            class="full-width"
            size="small"
            :disabled="isSearching"
          ></el-input-number>
        </el-col>
        <el-col :offset="2" :span="1">
          <el-button type="primary" size="small" @click="beginFilter" :disabled="isSearching"> 确认</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card v-if="results.length || isSearching">
      <el-table :data="results" height="283" stripe>
        <el-table-column
          prop="index"
          label="index"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="address"
          width="400"
        ></el-table-column>
      </el-table>
      <el-progress v-if="isSearching" :text-inside="true" :stroke-width="24" :percentage="results.length / num * 100" status="success" ></el-progress>

    </el-card>

  </div>
</template>

<script>
import Worker from '../worker/search.worker'
import { ethers } from "ethers";

window.ethers = ethers

export default {
  name: "AddressFilter",
  data() {
    return {
      mnemonic: "",
      cachedMnemonic: "",
      num: 1,
      cachedNum: -1,
      cachedIndex: 0,
      results: [],
      isSearching: false,
    };
  },
  methods: {
    // TODO: 符合条件时，利用上一次的结果继续算
    async asyncSearch() {
      this.results = []
      this.isSearching = true;
      
      let worker = new Worker()
      worker.postMessage({ mnemonic: this.mnemonic, num: this.num, from: 0})

      worker.onmessage = (msg) => {
        let result = msg.data;
        if (result.completed) {
          this.isSearching = false
          this.cachedMnemonic = this.mnemonic
          this.cachedNum = this.num
          if (result.error) {
            this.processError(result.error)
          }
        } else {
          this.results.push(result)
        }
      };
    },
    beginFilter() {
      if (!this.mnemonic) {
        this.mnemonic = ethers.Wallet.createRandom()._mnemonic().phrase
      }
      this.asyncSearch()
    },
    processError(err) {
      this.$alert(err.message, this.$t("message.error.error"));
    }
  },
};
</script>

<style>
.el-progress{
  margin: 20px 0 0 0;
}
</style>