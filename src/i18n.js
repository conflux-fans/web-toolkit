import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
  en: {
    message: {
      title: "Toolkits",
      selectToken: 'Select Token',
      selectText: "Click or type to select token",
      claim: 'CLAIM',
      successClaim: 'Successfully claimed the token!',
      connect: 'Connect',
      onRequest: "Requesting...",
      onSearching: "Computing...",
      currentAccountAddress: 'Current Account Address',
      toConfluxScan: 'Go to ConfluxScan',
      latestOperationStatus: 'Latest Operation Status',
      ok: 'OK',
      token: 'Token',
      operationType: 'Operation',
      tokenAmount: 'Amount',
      transactionHash: 'Transaction Hash',
      operator: 'Operator',
      tokenContractAddress: 'Token Address',
      currentTransactionStatus: 'Current Transaction Status',
      homeMessage: 'Click the upper options to choose the tool you need',
      addressConverter: {
        // addressConverter: '',
        sourceFormat: "Source Format",
        targetFormat: "Target Format",
        netId: "Network ID",
        netPlaceholder: 'Select network',
        converting: "converting",
        reset: "RESET",
        download: "Download",
        success: "Convertion completed!",
        noCsv: 'No CSV is selected',
        noNet: 'Network ID is not selected',
      },
      addressFilter: {
        mnemonic: "Mnemonic",
        filterAmount: 'Filter Amount',
        mnemonicPlaceholder: 'Please input mnemonic (in English)',
        confirm: 'Confirm',
        generateRandom: "Random Mnemonic",
        copyAddress: "Copy Address",
        copySk: 'Copy Secret Key',
        copyAddressSuccess: 'Address is copied',
        copySkSuccess: 'Secret key is copied',
        info: {
          usage: 'This tool is used for filtering Ethereum address compatible with Conflux',
          noServer: 'This is a PURE frontend app and will NEVER send any data to any remote server',
          useEnv: 'In order to minimize the risks of mnemonic leakage, it is recommended the tool be used offline in an incognito window',
          clipboard: 'Please be aware of clipboard-related security risks if mnemonic or secret key is copied',
          random: 'The random mnemonic feature is used for testing and development. NEVER use it in production environment',
        }
      },
      error: {
        networkError: 'Network Error',
        error: "ERROR",
        transactionError: 'Transaction Error',
        installationError: 'ConfluxPortal Not Detected',
      },
      warning: {
        connectionWarning: 'Please connect to your wallet',
        tokenWarning: 'Please select token',
        changeNetworkWarning: 'Please change network to Conflux Testnet in Conflux Poral, and then manually refresh page',
        networkLoadingWarning: 'Network status is on loading or unofficial network is in use???please check it in ConfluxPortal'
      },
      tooltip: {
        networkTooltip: 'Change network in ConfluxPortal',
        faucet: {
          frequency: {
            beg: 'Conflux Testnet Faucet is available every ',
            mid: ' for {token}. Faucet drips ',
            end: ' {token} for each claim',
          },
          portal: {
            beg: "Chrome extension ",
            end: " is required for Conflux Testnet Faucet",
          }
        },
        successClaim: 'Transaction is executed, but not confirmed.',
        csv: {
          drag: 'Drag CSV here, or ',
          clickToUpload: 'click to upload',
          resolve: 'Accepted: .csv',
          format: 'Each row only contains 1 column: address to be converted',
          titleLine: 'Title line is not required. If added, title line MUST be "address"',
          big: 'May wait for a while for big CSV files',
          checkExample: 'Check example',
        },
      }
    },
  },
  "zh-CN": {
      message:{
        title: "Toolkits",
        selectToken: '????????????',
        selectText: "???????????????????????????",
        claim: '??????',
        successClaim: '???????????????',
        connect: '????????????',
        onRequest: "?????????...",
        onSearching: "?????????...",
        currentAccountAddress: '??????????????????',
        toConfluxScan: '??? ConfluxScan ?????????',
        latestOperationStatus: '??????????????????',
        ok: '??????',
        token: '??????',
        operationType: '????????????',
        tokenAmount: '?????????',
        transactionHash: '????????????',
        operator: '?????????',
        tokenContractAddress: '??????????????????',
        currentTransactionStatus: '??????????????????',
        homeMessage: '?????????????????? ???????????????',
        addressConverter: {
          // addressConverter: '',
          sourceFormat: "?????????",
          targetFormat: "????????????",
          netId: "Network ID",
          netPlaceholder: '????????????',
          converting: "?????????",
          reset: "??????",
          download: "??????",
          success: "??????????????????",
          noCsv: '????????????CSV',
          noNet: '????????????Network ID',
        },
        addressFilter: {
          mnemonic: "?????????",
          filterAmount: '????????????',
          mnemonicPlaceholder: '????????????????????????',
          confirm: '??????',
          generateRandom: "?????????????????????",
          copyAddress: "????????????",
          copySk: '????????????',
          copyAddressSuccess: '???????????????',
          copySkSuccess: '???????????????',
          info: {
            usage: '???????????????????????? Conflux ????????????????????????',
            noServer: '?????????????????????????????????????????????????????????????????????????????????',
            useEnv: '?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
            clipboard: '???????????????????????????????????????????????????????????????????????????????????????',
            random: '??????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
          }
        },
        error: {
          networkError: '????????????',
          error: "??????",
          transactionError: '??????????????????',
          installationError: '???????????? ConfluxPortal',
        },
        warning: {
          connectionWarning: '???????????????',
          tokenWarning: '?????????Token',
          changeNetworkWarning: '?????? ConfluxPortal ?????????????????????, ?????????????????????',
          networkLoadingWarning: '?????????????????????????????????????????????????????????????????????????????? ConfluxPortal ???????????????????????????'
        },
        tooltip: {
          networkTooltip: '??? ConfluxPortal ???????????????',
          faucet: {
            frequency: {
              beg: 'Conflux????????????????????? ',
              mid: ' ??????????????????{token}?????????????????? ',
              end: ' {token}',
            },
            portal: {
              beg: "??????Conflux?????????????????????????????????????????????",
              end: "",
            }
          },
          successClaim: '?????????????????????????????????',
          csv: {
            drag: '???CSV????????????????????????',
            clickToUpload: '????????????',
            resolve: '??????????????????.csv',
            format: '?????????????????????????????????????????????',
            titleLine: '?????????????????????????????????????????????????????????????????? address',
            big: '??????????????????????????????',
            checkExample: '????????????',
          },
        }
      }
  }
};

const i18n = new VueI18n({
  locale: "zh-CN", // ????????????
  fallbackLocale: "zh-CN",
  messages, // ??????????????????
})

export default i18n;
