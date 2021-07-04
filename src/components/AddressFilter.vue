<template>
  <div>
    <el-card>
      <el-row class="bold-font">
        <el-col :span="15"> {{ $t("message.addressFilter.mnemonic") }}</el-col>
        <el-col :offset="1" :span="2">{{
          $t("message.addressFilter.filterAmount")
        }}</el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="15">
          <el-input
            type="textarea"
            autosize
            :placeholder="$t('message.addressFilter.mnemonicPlaceholder')"
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
        <el-col :offset="1" :span="1">
          <el-button
            type="primary"
            size="small"
            @click="beginFilter"
            :disabled="isSearching"
          >
            {{ $t("message.addressFilter.confirm") }}</el-button
          >
        </el-col>
        <el-col :offset="1" :span="2">
          <el-button
            type="info"
            size="small"
            @click="generateRandom"
            :disabled="isSearching"
            >{{ $t("message.addressFilter.generateRandom") }}</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    
    <el-card v-if="results.length || isSearching">
      <el-tag v-if="isSearching" type="warning"
        ><i class="el-icon-loading"></i>{{ $t("message.onSearching") }}</el-tag
      >
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
        <el-table-column label="operation">
          <template slot-scope="scope">
            <el-button size="mini" @click="copyRowAddress(scope.row.address)"
              >{{ $t("message.addressFilter.copyAddress") }}</el-button
            >
            <el-button
              size="mini"
              type="warning"
              @click="copyRowSk(scope.row.index, scope.row.address)"
              >{{ $t("message.addressFilter.copySk") }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-progress
        v-if="isSearching"
        :text-inside="true"
        :stroke-width="24"
        :percentage="parseInt((results.length / num) * 100)"
        status="success"
      ></el-progress>
    </el-card>
    <el-card>
      <ul>
        <li>
          {{ $t('message.addressFilter.info.usage') }}
        </li>
        <li>
          {{ $t('message.addressFilter.info.noServer') }}
        </li>
        <li>
          {{ $t('message.addressFilter.info.useEnv') }}
        </li>
        <li>
          {{ $t('message.addressFilter.info.clipboard') }}
        </li>
        <li>
          {{ $t('message.addressFilter.info.random') }}
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
import Worker from "../worker/search.worker";
import { ethers } from "ethers";

window.ethers = ethers;

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
      this.results = [];
      this.isSearching = true;

      let worker = new Worker();
      worker.postMessage({ mnemonic: this.mnemonic, num: this.num, from: 0 });

      worker.onmessage = (msg) => {
        let result = msg.data;
        if (result.completed) {
          this.isSearching = false;
          this.cachedMnemonic = this.mnemonic;
          this.cachedNum = this.num;
          if (result.error) {
            this.processError(result.error);
          }
        } else {
          this.results.push(result);
        }
      };
    },
    async copyRowAddress(address) {
      await navigator.clipboard.writeText(address)
      this.$message({
        message: this.$t('message.addressFilter.copyAddressSuccess'),
        type: 'success'
      })
    },
    async copyRowSk(index, address) {
      try {
        let tmp;
        const mnemonic = this.cachedMnemonic ? this.cachedMnemonic : this.mnemonic;
        
        tmp = ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${index}`)
        // 使用address 校验一下以防出错
        if (tmp.address !== address) {
          throw new Error("Something wrong happens: derived address is not consistent with computed one")
        }
        await navigator.clipboard.writeText(tmp.privateKey)
        this.$message({
          message: this.$t('message.addressFilter.copySkSuccess'),
          type: 'success'
        })
        
      } catch (e) {
        this.processError(e)
      }
    },
    generateRandom() {
      this.mnemonic = ethers.Wallet.createRandom()._mnemonic().phrase;
    },
    beginFilter() {
      if (!this.mnemonic) {
        this.mnemonic = ethers.Wallet.createRandom()._mnemonic().phrase;
      }
      this.asyncSearch();
    },
    processError(err) {
      this.$alert(err.message, this.$t("message.error.error"));
    },
  },
};
</script>

<style scoped>
.el-progress {
  margin: 20px 0 0 0;
}
li {
  padding: 10px;
  list-style-type: circle;
}
</style>