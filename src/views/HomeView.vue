<template>
  <div class="curve">
    <div class="curve__header">
      <div class="curve__header__title">
        <input type="file" id="uploadExcel" multiple @change="handleChange" />
        <a-button @click="draw">绘制</a-button>
        <a-button @click="exports">导出</a-button>
        <div class="fillIn">
          <div>
            <a-input
              v-model:value="echartsWidth"
              addon-before="宽度："
              addon-after="px"
              placeholder="请输入"
            />
          </div>
          <div>
            <a-input
              v-model:value="echartsHeight"
              addon-before="高度："
              addon-after="px"
              placeholder="请输入"
            />
          </div>
          <div>
            <a-input
              v-model:value="echartsYinterval"
              addon-before="刻度："
              addon-after=""
              placeholder="请输入"
            />
          </div>
          <div>
            <a-input
              v-model:value="maxValueY"
              addon-before="Y轴数据最大值："
              addon-after=""
              placeholder=""
              disabled
            />
          </div>
           <div>
            <a-input
              v-model:value="echartsMaxY"
              addon-before="Y轴最大值："
              addon-after=""
              placeholder="请输入"
            />
          </div>
          <a-button @click="reset">重置</a-button>
        </div>
      </div>
    </div>
    <div
      class="curve__body"
      :style="{
        width: echartsWidth ? echartsWidth + 'px' : '',
        height: echartsHeight ? echartsHeight + 'px' : '',
      }"
    >
      <div class="curve__body__chart" id="Charts"></div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, Ref, ref, watch } from "vue";
import * as echarts from "echarts";
import * as XLSX from "xlsx";

let echartsImg = new Image();
const echartsWidth = ref("1000");
const echartsHeight = ref("800");
const echartsYinterval = ref("1");
const echartsMaxY = ref(0);
const initChart = (datas) => {
  console.log(datas);
  let maxValue = 0;
  for (let i = 0; i < datas.length; i++) {
    for (let j = 0; j < datas[i].data2.length; j++) {
      if (maxValue < datas[i].data2[j][1]) {
        maxValue = datas[i].data2[j][1];
      }
    }
  }
  console.log(maxValue, "maxY");
  const chartDom = document.getElementById("Charts");
  echarts.dispose(chartDom);
  const myChart = echarts.init(chartDom);
  let colorList = ["#1dadbf", "#9cce40", "#d837b7"];
  let seriesData = [];
  datas?.forEach((v, i) => {
    seriesData.push({
      data: v.data2,
      smooth: true,
      type: "line",
      symbol: "none",
      lineStyle: {
        color: colorList[i],
      },
    });
    seriesData.push({
      data: v.data1,
      smooth: true,
      type: "scatter",
      symbolSize: 5,
      itemStyle: {
        color: colorList[i],
      },
    });
  });
  let data = [
    [0, 543.48, "0.001"],
    [546, 447.1, "0.01"],
    [862, 396.45, "0.0333"],
    [974, 379.28, "0.05"],
    [1175, 349.91, "0.1"],
    [1387, 320.42, "0.2"],
    [1552, 298.61, "0.3333"],
    [1689, 281.22, "0.5"],
    [1939, 251.34, "1"],
    [2211, 221.22, "2"],
    [2431, 198.83, "3.3333"],
    [2620, 180.89, "5"],
    [2983, 149.81, "10"],
    [3423, 117.92, "20"],
    [3590, 107.39, "25"],
    [3741, 98.66, "30"],
    [4012, 84.55, "40"],
    [4265, 73.22, "50"],
    [4518, 63.57, "60"],
    [4789, 54.98, "70"],
    [4939, 50.93, "75"],
    [5107, 46.98, "80"],
    [5301, 43.06, "85"],
    [5546, 39.06, "90"],
    [5910, 34.77, "95"],
    [6319, 32.84, "97"],
    [6591, 30.55, "99"],
    [7355, 29.03, "99.9"],
    [7984, 28.74, "99.99"],
    [8530, 28.68, "99.999"],
  ];
  const data1 = [
    [2076, 184.8, "1.43"],
    [2363, 168, "2.86"],
    [2547, 165.7, "4.29"],
    [2683, 144.5, "5.71"],
    [2800, 135.5, "7.14"],
    [2897, 130, "8.57"],
    [2983, 126.5, "10"],
    [3061, 122.6, "11.43"],
    [3132, 121.5, "12.86"],
    [3198, 121.3, "14.29"],
    [3259, 113.5, "15.71"],
    [3316, 110.1, "17.14"],
    [3371, 109.9, "18.57"],
    [3423, 105.4, "20"],
    [3473, 103.7, "21.43"],
    [3522, 103.2, "22.86"],
    [3568, 101.7, "24.29"],
    [3613, 100.5, "25.71"],
    [3656, 100, "27.14"],
    [3699, 99.9, "28.57"],
    [3741, 98.5, "30"],
    [3781, 98, "31.43"],
    [3821, 97.2, "32.86"],
    [3860, 96.5, "34.29"],
    [3899, 96.5, "35.71"],
    [3937, 95, "37.14"],
    [3974, 93.4, "38.57"],
    [4012, 92.1, "40"],
    [4049, 91.2, "41.43"],
    [4085, 91, "42.86"],
    [4121, 88.2, "44.29"],
    [4157, 87.1, "45.71"],
    [4193, 86.4, "47.14"],
    [4229, 83.2, "48.57"],
    [4265, 81.6, "50"],
    [4301, 79.7, "51.43"],
    [4337, 79.7, "52.86"],
    [4373, 78.4, "54.29"],
    [4409, 78.1, "55.71"],
    [4445, 75.6, "57.14"],
    [4481, 73, "58.57"],
    [4518, 69.5, "60"],
    [4556, 69.3, "61.43"],
    [4593, 68.5, "62.86"],
    [4631, 68.2, "64.29"],
    [4670, 68, "65.71"],
    [4709, 67.5, "67.14"],
    [4749, 64.6, "68.57"],
    [4789, 64.5, "70"],
    [4831, 64, "71.43"],
    [4874, 62.1, "72.86"],
    [4917, 62, "74.29"],
    [4962, 61.4, "75.71"],
    [5008, 60.2, "77.14"],
    [5057, 59.3, "78.57"],
    [5107, 59.2, "80"],
    [5159, 58.4, "81.43"],
    [5214, 57.1, "82.86"],
    [5271, 56.1, "84.29"],
    [5332, 51.8, "85.71"],
    [5398, 50.9, "87.14"],
    [5469, 49.4, "88.57"],
    [5547, 48.8, "90"],
    [5633, 47.8, "91.43"],
    [5730, 44.8, "92.86"],
    [5845, 44.5, "94.29"],
    [5983, 43.8, "95.71"],
    [6167, 37.3, "97.14"],
    [6454, 35.6, "98.57"],
  ];
  const dataX1 = [
    [0, 0, "0.005"],
    [172, 0, "0.01"],
    [600, 0, "0.05"],
    [800, 0, "0.1"],
    [1012, 0, "0.2"],
    [1315, 0, "0.5"],
    [1564, 0, "1"],
    [1837, 0, "2"],
    [2246, 0, "5"],
    [2609, 0, "10"],
    [3049, 0, "20"],
    [3366, 0, "30"],
    [3637, 0, "40"],
    [3891, 0, "50"],
    [4144, 0, "60"],
    [4415, 0, "70"],
    [4732, 0, "80"],
    [5172, 0, "90"],
    [5535, 0, "95"],
    [5944, 0, "98"],
    [6217, 0, "99"],
    [6466, 0, "99.5"],
    [6769, 0, "99.8"],
    [6981, 0, "99.9"],
    [7181, 0, "99.95"],
    [7610, 0, "99.99"],
    [7781, 0, "99.995"],
  ];
  const data1X = [
    [172, 0, "0.01"],
    [600, 0, "0.05"],
    [800, 0, "0.1"],
    [1315, 0, "0.5"],
    [1564, 0, "1"],
    [1837, 0, "2"],
    [2246, 0, "5"],
    [2609, 0, "10"],
    [3049, 0, "20"],
    [3366, 0, "30"],
    [3637, 0, "40"],
    [3891, 0, "50"],
    [4144, 0, "60"],
    [4415, 0, "70"],
    [4732, 0, "80"],
    [5172, 0, "90"],
    [5535, 0, "95"],
    [5944, 0, "98"],
    [6217, 0, "99"],
    [6466, 0, "99.5"],
    [6981, 0, "99.9"],
    [7610, 0, "99.99"],
  ];
  const option = {
    animation: false,
    grid: {
      // 让图表占满容器
      top: "50px",
      left: "70px",
      right: "50px",
      bottom: "60px",
    },

    tooltip: {
      trigger: "axis",
      formatter: (params) => {
        let result = "";
        // console.log(params,'params')
        for (let i = 0; i < params.length; i++) {
          if (params.length > 3) {
            if (i === 0) {
              result += "量:" + params[i]?.data[1] + "<br />";
              result += "率:" + params[i]?.data[2] + "%" + "<br />";
            }
            if (i === 1) {
              result += "量:" + params[i]?.data[1] + "<br />";
              result += "率:" + params[i]?.data[2] + "%" + "<br />";
            }
          } else {
            if (i === 0) {
              result += "量:" + params[i]?.data[1] + "<br />";
              result += "率:" + params[i]?.data[2] + "%" + "<br />";
            }
          }
        }
        return result;
      },
    },
    // tooltip: {
    //   trigger: 'axis',
    //   axisPointer: {
    //     type: 'shadow'
    //   },
    //   backgroundColor: '#fff', // 悬浮框背景色
    //   borderColor: '#000', // 悬浮框边框颜色
    //   borderWidth: 1, // 悬浮框边框宽度
    //   textStyle: { // 悬浮框文字样式
    //     color: '#000',
    //     fontSize: 12
    //   },
    //   formatter: '{b}: {c}'
    // },
    xAxis: {
      name: echartsXYName[1],
      nameTextStyle: {
        // y轴name的样式调整
        color: "#000",
        fontSize: 22,
        padding: [10, 0, 0, 0], // 加上padding可以调整其位置
      },
      nameLocation: "center",
      min: 0,
      max: 7781,
      type: "value",
      interval: 1,
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        formatter: (value) => {
          let arr = data1X.find((item) => item[0] == value) || [];
          return arr[2] ? arr[2] : "";
        },
        // rotate: -45,
        showMinLabel: true,
        showMaxLabel: true,
        fontSize: 16,
      },
      axisLine: {
        lineStyle: {
          color: "#000",
        },
      },
    },
    yAxis: {
      name: echartsXYName[0],
      nameTextStyle: {
        // y轴name的样式调整
        color: "#000",
        fontSize: 22,
      },
      type: "value",
      axisTick: {
        show: false,
      },
      // max: (roundedUp(maxValue.toFixed(0))).toFixed(0),
      max: parseInt(echartsMaxY.value) || getMaxY(maxValue.toFixed(0)),
      min: 0,
      splitNumber: 100,
      interval: parseInt(echartsYinterval.value) || 1,
      splitLine: {
        show: true,
        lineStyle: {
          color: ["#000"],
          width: 1,
          type: "solid",
        },
      },
      axisLine: {
        lineStyle: {
          color: "#000",
        },
      },
      axisLabel: {
        fontSize: 16,
      },
    },
    series: [
      {
        name: "网格",
        data: dataX1.map((item) => {
          let arr = [...item];
          arr[1] = roundedUp(maxValue.toFixed(0)).toFixed(0);
          return arr;
        }),
        type: "bar",
        barWidth: 1,
        cursor: "auto",
        itemStyle: {
          normal: {
            color: "#000",
          },
          emphasis: {
            color: "#000",
          },
        },
        animation: false,
        tooltip: {
          show: false,
        },
      },
      ...seriesData,
    ],
  };

  window.addEventListener("resize", function () {
    myChart.resize();
  });
  myChart.setOption(option);
  echartsImg.src = myChart.getDataURL({
    // backgroundColor: "#fff",
    type: "png",
  });
};

const echartsData = new Map();
const handleChange = (info) => {
  let fileList = info.target.files;
  console.log(fileList);
  if (fileList) {
    let reader = new FileReader();
    let file = fileList[0];
    reader.readAsBinaryString(file);
    reader.addEventListener("load", function (e) {
      console.log(e); //FileReader实例对象
      let data = e.target?.result; //读取成功后result中的数据
      let wb = XLSX.read(data, { type: "binary" }); //以base64方法读取 结果
      console.log(wb, "wb");
      wb.SheetNames.length &&
        wb.SheetNames.forEach((v, index) => {
          let sheets = wb.Sheets[v];
          // //将数据解析为json字符串
          let dataList2 = JSON.stringify(XLSX.utils.sheet_to_json(sheets));
          let dataList3 = JSON.parse(dataList2);
          echartsData.set(v, dataList3);
        });
    });
  }
};

const echartsXYName = [];
const getEchartsData = (key) => {
  let data = echartsData.get(key);
  let data1 = [];
  let data2 = [];
  data.forEach((v, i) => {
    if (i !== 0) {
      const a = 1 - Number(v["经验历史数据"]) / 100;
      let c = Number(normsinv(a).toFixed(3));
      let b = (Number(3.891 - c) * 1000).toFixed(0);
      let v1 = [b, v["__EMPTY"], v["经验历史数据"].toString()];
      data1.push(v1);
      if (v["理论数据"]) {
        const a = 1 - Number(v["理论数据"]) / 100;
        let c = Number(normsinv(a).toFixed(3));
        let b = (Number(3.891 - c) * 1000).toFixed(0);
        let v1 = [b, v["__EMPTY_1"], v["理论数据"].toString()];
        data2.push(v1);
      }
    } else {
      echartsXYName[0] = v["__EMPTY"];
      echartsXYName[1] = v["经验历史数据"];
    }
  });
  return { data1, data2 };
};
const echartsData1 = ref([]);

const maxValueY = ref(0);
const draw = () => {
  for (let key of echartsData.keys()) {
    const data = getEchartsData(key);
    echartsData1.value.push(data);
  }
  nextTick(() => {
    let maxValue = 0;
    for (let i = 0; i < echartsData1.value.length; i++) {
      for (let j = 0; j < echartsData1.value[i].data2.length; j++) {
        if (maxValue < echartsData1.value[i].data2[j][1]) {
          maxValue = echartsData1.value[i].data2[j][1];
        }
      }
    }
    console.log(maxValue, "maxY");
    maxValueY.value = parseInt(maxValue.toFixed(0));
    initChart(echartsData1.value);
  });
};

const exports = () => {
  let canvas = document.createElement("canvas");
  canvas.width = echartsImg.width;
  canvas.height = echartsImg.height;
  console.log(canvas.width, canvas.height);
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx?.fillRect(0, 0, canvas.width, canvas.height);
  ctx?.drawImage(echartsImg, 0, 0);
  let dataURL = canvas.toDataURL("image/png");
  let a = document.createElement("a");
  let event = new MouseEvent("click");
  a.download = "echarts.png";
  a.href = dataURL;
  a.dispatchEvent(event);
  a.remove();
};

const reset = () => {
  echartsWidth.value = "";
  echartsHeight.value = "";
  console.log(echartsHeight.value, echartsWidth.value);
  draw();
};

const roundedUp = (num) => {
  if (typeof num !== "number") {
    num = parseFloat(num);
  }
  if (num < 100) {
    return 100;
  } else {
    let a;
    a = (num / 100).toFixed(0);
    let b = Number(a) + 1;
    return b * 100;
  }
};

const getMaxY = (num) => {
  if (typeof num !== "number") {
    num = parseFloat(num);
  }
  console.log(num, "getMaxY");

  if (num < 100) {
    return num;
  } else {
    let a;
    a = (num / 100).toFixed(0);
    let b = Number(a) + 1;
    return b * 100;
  }
};

function normsinv(p) {
  const LOW = 0.02425;
  const HIGH = 0.97575;

  const a = [
    -3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2,
    1.38357751867269e2, -3.066479806614716e1, 2.506628277459239,
  ];

  const b = [
    -5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2,
    6.680131188771972e1, -1.328068155288572e1,
  ];

  const c = [
    -7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838,
    -2.549732539343734, 4.374664141464968, 2.938163982698783,
  ];

  const d = [
    7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996,
    3.754408661907416,
  ];

  let q, r;

  if (p < LOW) {
    q = Math.sqrt(-2 * Math.log(p));
    return (
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  } else if (p > HIGH) {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return (
      -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  } else {
    q = p - 0.5;
    r = q * q;
    return (
      ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) *
        q) /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
    );
  }
}

onMounted(() => {
  nextTick(() => {
    // initChart()
  });
});
</script>
<style scoped lang="less">
.curve {
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.curve__header {
  width: 100%;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
}

.curve__header__title {
  font-size: 20px;
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
  .fillIn {
    margin-left: 20px;
    display: flex;
    width: 900px;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    > div {
      width: 40%;
      display: flex;
      align-items: center;
    }
  }
}

.curve__body {
  width: 100%;
  height: calc(100% - 60px);
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
}

.curve__body__chart {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
