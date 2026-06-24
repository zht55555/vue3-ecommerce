<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="clickSpecs(item, val)"
            v-if="val.picture"
            :src="val.picture"
          />
          <span
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="clickSpecs(item, val)"
            v-else
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<script setup lang="ts">
import { watchEffect } from 'vue'
import getPowerSet from './power-set.ts'

defineOptions({
  name: 'GoodSku',
})

type PathMap = Record<string, string[]>

interface SpecValue {
  name: string
  picture?: string
  selected?: boolean
  disabled?: boolean
}

interface SpecItem {
  id: string
  name: string
  values: SpecValue[]
}

interface SkuSpec {
  name: string
  valueName: string
}

interface SkuItem {
  id: string
  inventory: number
  price: number
  oldPrice: number
  specs: SkuSpec[]
}

interface GoodsSkuData {
  specs: SpecItem[]
  skus: SkuItem[]
}

const props = withDefaults(
  defineProps<{
    goods?: GoodsSkuData
  }>(),
  {
    goods: () => ({
      specs: [],
      skus: [],
    }),
  },
)

const emit = defineEmits<{
  change: [
    payload:
      | {
          skuId: string
          price: number
          oldPrice: number
          inventory: number
          specsText: string
        }
      | Record<string, never>,
  ]
}>()

const spliter = '★'

// 根据skus数据得到路径字典对象
const getPathMap = (skus: SkuItem[]): PathMap => {
  const pathMap: PathMap = {}
  if (skus && skus.length > 0) {
    skus.forEach((sku) => {
      // 1. 过滤出有库存有效的sku
      if (sku.inventory) {
        // 2. 得到sku属性值数组
        const specs = sku.specs.map((spec) => spec.valueName)
        // 3. 得到sku属性值数组的子集
        const powerSet = getPowerSet(specs) as string[][]
        // 4. 设置给路径字典对象
        powerSet.forEach((set) => {
          const key = set.join(spliter)
          // 如果没有就先初始化一个空数组
          if (!pathMap[key]) {
            pathMap[key] = []
          }
          pathMap[key].push(sku.id)
        })
      }
    })
  }
  return pathMap
}

// 初始化禁用状态
function initDisabledStatus(specs: SpecItem[], pathMap: PathMap) {
  if (specs && specs.length > 0) {
    specs.forEach((spec) => {
      spec.values.forEach((val) => {
        // 设置禁用状态
        val.disabled = !pathMap[val.name]
      })
    })
  }
}

// 得到当前选中规格集合
const getSelectedArr = (specs: SpecItem[]): Array<string | undefined> => {
  const selectedArr: Array<string | undefined> = []
  specs.forEach((spec, index) => {
    const selectedVal = spec.values.find((val) => val.selected)
    if (selectedVal) {
      selectedArr[index] = selectedVal.name
    } else {
      selectedArr[index] = undefined
    }
  })
  return selectedArr
}

// 更新按钮的禁用状态
const updateDisabledStatus = (specs: SpecItem[], pathMap: PathMap) => {
  // 遍历每一种规格
  specs.forEach((item, i) => {
    // 拿到当前选择的项目
    const selectedArr = getSelectedArr(specs)
    // 遍历每一个按钮
    item.values.forEach((val) => {
      if (!val.selected) {
        selectedArr[i] = val.name
        // 去掉undefined之后组合成key
        const key = selectedArr.filter((value) => value).join(spliter)
        val.disabled = !pathMap[key]
      }
    })
  })
}

let pathMap: PathMap = {}

watchEffect(() => {
  // 得到所有字典集合
  pathMap = getPathMap(props.goods.skus)
  // 组件初始化的时候更新禁用状态
  initDisabledStatus(props.goods.specs, pathMap)
})

const clickSpecs = (item: SpecItem, val: SpecValue) => {
  if (val.disabled) return

  // 选中与取消选中逻辑
  if (val.selected) {
    val.selected = false
  } else {
    item.values.forEach((bv) => {
      bv.selected = false
    })
    val.selected = true
  }

  // 点击之后再次更新选中状态
  updateDisabledStatus(props.goods.specs, pathMap)

  // 把选择的sku信息传出去给父组件
  const selectedArr = getSelectedArr(props.goods.specs).filter((value): value is string =>
    Boolean(value),
  )

  // 如果选中的规格数量和传入规格总数相等则传出完整信息
  if (selectedArr.length === props.goods.specs.length) {
    const skuId = pathMap[selectedArr.join(spliter)]?.[0]
    const sku = props.goods.skus.find((skuItem) => skuItem.id === skuId)

    if (!sku) {
      emit('change', {})
      return
    }

    emit('change', {
      skuId: sku.id,
      price: sku.price,
      oldPrice: sku.oldPrice,
      inventory: sku.inventory,
      specsText: sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '').trim(),
    })
  } else {
    emit('change', {})
  }
}
</script>

<style scoped lang="less">
.sku-state-mixin() {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: @xtxColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      > img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        .sku-state-mixin();
      }

      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        .sku-state-mixin();
      }
    }
  }
}
</style>
