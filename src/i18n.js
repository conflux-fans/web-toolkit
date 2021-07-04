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
        netId: "Net ID",
        convert: "convert",
        reset: "RESET",
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
        networkLoadingWarning: 'Network status is on loading or unofficial network is in use，please check it in ConfluxPortal'
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
          multi: 'Multiple CSVs can be processed simultaneously. Click "convert" button after all CSVs are uploaded',
          big: 'May wait for a while for big CSV files',
          checkExample: 'Check example',
        },
      }
    },
  },
  "zh-CN": {
      message:{
        title: "Toolkits",
        selectToken: '代币选择',
        selectText: "下拉选择或键入搜索",
        claim: '领取',
        successClaim: '领取成功！',
        connect: '连接钱包',
        onRequest: "请求中...",
        onSearching: "计算中...",
        currentAccountAddress: '当前账户地址',
        toConfluxScan: '在 ConfluxScan 上查看',
        latestOperationStatus: '最新操作状态',
        ok: '确认',
        token: '代币',
        operationType: '操作类型',
        tokenAmount: '代币数',
        transactionHash: '交易哈希',
        operator: '操作者',
        tokenContractAddress: '代币合约地址',
        currentTransactionStatus: '当前交易状态',
        homeMessage: '点击上侧选项 选择小工具',
        addressConverter: {
          // addressConverter: '',
          sourceFormat: "源格式",
          targetFormat: "目标格式",
          netId: "目标网络ID",
          convert: "转换",
          reset: "重置",
        },
        addressFilter: {
          mnemonic: "助记词",
          filterAmount: '筛选数量',
          mnemonicPlaceholder: '请输入英文助记词',
          confirm: '确认',
          generateRandom: "使用随机助记词",
          copyAddress: "复制地址",
          copySk: '复制私钥',
          copyAddressSuccess: '已复制地址',
          copySkSuccess: '已复制私钥',
          info: {
            usage: '本工具用于筛选与 Conflux 兼容的以太坊地址',
            noServer: '本工具为纯前端网页，不会将您的任何数据发送至任何服务器',
            useEnv: '为了尽量避免助记词泄露，建议您在无痕窗口中离线地使用本工具（如另存至本地打开）',
            clipboard: '如果进行了助记词或私钥的复制，请注意与剪贴板相关的安全风险',
            random: '本页中生成随机助记词功能仅供测试与开发使用，请勿直接将相关助记词用于生产环境',
          }
        },
        error: {
          networkError: '网络错误',
          error: "错误",
          transactionError: '交易执行错误',
          installationError: '未检测到 ConfluxPortal',
        },
        warning: {
          connectionWarning: '请连接钱包',
          tokenWarning: '请选择Token',
          changeNetworkWarning: '请在 ConfluxPortal 中切换至测试网, 并手动刷新页面',
          networkLoadingWarning: '当前网络情况仍在加载中或使用了非官方的测试网络，请在 ConfluxPortal 中确认当前网络情况'
        },
        tooltip: {
          networkTooltip: '在 ConfluxPortal 中切换网络',
          faucet: {
            frequency: {
              beg: 'Conflux测试网水龙头每 ',
              mid: ' 可以领取一次{token}。每次可领取 ',
              end: ' {token}',
            },
            portal: {
              beg: "使用Conflux测试网水龙头需要安装浏览器插件",
              end: "",
            }
          },
          successClaim: '交易已执行，但尚未确认',
          csv: {
            drag: '将CSV文件拖到此处，或',
            clickToUpload: '点击上传',
            resolve: '支持的格式：.csv',
            format: '每行仅一条数据，为待转换的地址',
            titleLine: '不需要添加标题行，如果添加，标题行格式只能为 address',
            multi: '可以同时转换多个文件。全部上传后点击“转换”按钮下载转换后的CSV文件',
            big: '文件较大时请稍作等待',
            checkExample: '查看示例',
          },
        }
      }
  }
};

const i18n = new VueI18n({
  locale: "zh-CN", // 设置地区
  fallbackLocale: "zh-CN",
  messages, // 设置地区信息
})

export default i18n;
