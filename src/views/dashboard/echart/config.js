import { barOption, lineOption, mapOption, pieOption } from "../option"

// 默认样式
let style = {
  height: 350 + "px",
  width: 350 + "px"
}

// 默认不需要处理数据
let extract = true
// 默认数据不需要排序
let sort = true

export default {
  option: {
    "dailyAddUser": {
      "id": "dailyAddUser",
      "type": "line",
      "style": {
        height: 350 + "px",
        width: 480 + "px"
      },
      "option": lineOption.dailyAddUser,
      "extract": extract,
      "sort": sort,
      "url": "/report/userIncreaseDayCount"
    },
    "certUse": {
      "id": "certUse",
      "style": {
        height: 350 + "px",
        width: 480 + "px"
      },
      "type": "line",
      "option": lineOption.certUse,
      "extract": extract,
      "sort": sort,
      "url": "/report/userCertDayCount"
    },
    "areaUserProfile": {
      "id": "areaUserProfile",
      "type": "map",
      "style": {
        height: 500 + "px"
      },
      "option": mapOption.mapOption,
      "extract": false,
      "sort": true,
      "url": "/report/userProvinceCount"
    },
    "monthAddUser": {
      "id": "monthAddUser",
      "type": "bar",
      "style": style,
      "option": barOption.monthAddUser,
      "extract": extract,
      "sort": sort,
      "url": "/report/userIncreaseMonthCount"
    },
    "industryUserProfile": {
      "id": "industryUserProfile",
      "type": "pie",
      "style": style,
      "option": pieOption.industryUserProfile,
      "extract": false,
      "sort": true,
      "url": "/report/userIndustryCount"
    },
    "topCity": {
      "id": "topCity",
      "type": "bar",
      "style": style,
      "option": barOption.topCity,
      "extract": extract,
      "sort": true,
      "url": "/report/userAreaCount"
    }
  }
}
