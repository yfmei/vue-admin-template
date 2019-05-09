/**
 * 请求基本数据的url和参数, todo 放到json中
 * @returns
 */
let baseData = (function baseData() {
  let parDataUrl = {
    type: "/par/type/getParTypeList", // 数据类型
    jobType: "/permission/aiJob/queryAiJobList", // 管理员 -> 角色类型
    allAlgorithmType: "/par/algorithm/getAlgorithmTypeList", // 所有算法类型
    algorithmType: "/ca/$/getCaAlgorithmType", // 不同ca不同算法类型
    status: "/par/status/getParStatusList", // 状态
    province: "/par/area/getProvinceInfoList", // 省份
    city: "/par/area/getAreaInfoList", // 地市
    county: "/par/area/getCountryInfoList", // 区县列表
    dataSource: "/par/dataSource/getDataSourceList", // 数据来源列表
    idType: "/par/type/getParTypeList", // 证件类型列表
    ca: "/ca/$/getAllCaWithIdAndName", // ca列表
    system: "/system/$/getAllSysIds", // 可访问系统列表
    product: "/product/$/getAllProductWithIdAndName",
    app: "/accessconfig/getAccessConfigWithIdAndName",
    groupRelation: "/accessconfig/getAccessConfigByGroupId"
  }

  return {
    // 应用列表
    app: {
      url: parDataUrl.app,
      data: {}
    },
    groupRelation: {
      url: parDataUrl.groupRelation,
      data: {}
    },
    // 是否需要校验ip
    isIpVerify: {
      url: parDataUrl.type,
      data: {
        moduleId: "140"
      }
    },
    // ip校验类型
    verifyType: {
      url: parDataUrl.type,
      data: {
        moduleId: "130"
      }
    },
    // 管理员 -> 角色类型
    jobType: {
      url: parDataUrl.jobType,
      data: {}
    },
    // 产品列表
    product: {
      url: parDataUrl.product,
      data: {}
    },
    // ca列表
    ca: {
      url: parDataUrl.ca,
      data: {}
    },
    // 系统列表
    system: {
      url: parDataUrl.system,
      data: {}
    },
    // 类型
    idType: {
      url: parDataUrl.type,
      data: {
        moduleId: "10"
      }
    },
    sex: {
      url: parDataUrl.type,
      data: {
        moduleId: "100"
      }
    },
    // 算法标识
    algorithmType: {
      url: parDataUrl.algorithmType,
      data: {}
    },
    allAlgorithmType: {
      url: parDataUrl.allAlgorithmType,
      data: {}
    },
    salgorithmType: { // 查询条件
      url: parDataUrl.algorithmType,
      data: {}
    },
    algorithmTypeLength: {
      url: parDataUrl.type,
      data: {
        moduleId: "110"
      }
    },
    cardType: {
      url: parDataUrl.type,
      data: {
        moduleId: "30"
      }
    },
    // 行业类型
    industry: {
      url: parDataUrl.type,
      data: {
        moduleId: "160"
      }
    },
    logType: {
      url: parDataUrl.type,
      data: {
        moduleId: "40"
      }
    },
    operationType: {
      url: parDataUrl.type,
      data: {
        moduleId: "50"
      }
    },
    // 用户登录类型
    userType: {
      url: parDataUrl.type,
      data: {
        moduleId: "60"
      }
    },
    // 算法类型
    pwdType: {
      url: parDataUrl.type,
      data: {
        moduleId: "70"
      }
    },
    // 角色 -> 角色类型
    roleType: {
      url: parDataUrl.type,
      data: {
        moduleId: "80"
      }
    },
    taskType: {
      url: parDataUrl.type,
      data: {
        moduleId: "90"
      }
    }, // 类型 end
    // 状态
    approvalStatus: {
      url: parDataUrl.status,
      data: {
        moduleId: "40"
      }
    },
    userStatus: {
      url: parDataUrl.status,
      data: {
        moduleId: "10"
      }
    },
    taskStatus: {
      url: parDataUrl.status,
      data: {
        moduleId: "20"
      }
    },
    messageStatus: {
      url: parDataUrl.status,
      data: {
        moduleId: "30"
      }
    },
    orderStatus: {
      url: parDataUrl.status,
      data: {
        moduleId: "100"
      }
    },
    productStatus: {
      url: parDataUrl.status,
      data: {
        moduleId: "110"
      }
    },
    commonStatus: {
      url: parDataUrl.status,
      data: {
        moduleId: "0"
      }
    },
    // 状态 end
    // 地市
    province: {
      url: parDataUrl.province,
      data: {}
    },
    city: {
      url: parDataUrl.city,
      data: {}
    },
    county: {
      url: parDataUrl.county,
      data: {}
    }, // 地市 end
    // 数据来源
    productDataSource: {
      url: parDataUrl.dataSource,
      data: {
        moduleId: "10"
      }
    },
    loginDataSource: {
      url: parDataUrl.dataSource,
      data: {
        moduleId: "20"
      }
    },
    userDataSource: {
      url: parDataUrl.dataSource,
      data: {
        moduleId: "30"
      }
    },
    msgDataSource: {
      url: parDataUrl.dataSource,
      data: {
        moduleId: "40"
      }
    }// 数据来源 end
  }
})()

export default baseData
