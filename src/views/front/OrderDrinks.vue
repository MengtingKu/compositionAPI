<template>
  <div class="container gx-2">
    <div class="row gx-3 bg-light py-3">
      <div class="col-md-4">
        <div class="list-group">
          <a
            href="javascript:void(0);"
            class="list-group-item list-group-item-action"
            :class="{ active: tempSelected.name === product.name }"
            v-for="(product, key) in products"
            :key="`${key}-${product.name}`"
            @click.prevent="selectedProducts(product)"
          >
            <h6 class="card-title mb-1">{{ product.name }}</h6>
            <div class="d-flex align-items-center justify-content-between">
              <p class="mb-0">
                <small>{{ product.engName }}</small>
              </p>
              <p class="mb-0">
                <small>NT$ {{ product.price }}</small>
              </p>
            </div>
          </a>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card mb-2">
          <div
            v-if="!tempSelected.hasOwnProperty('name')"
            class="position-absolute text-white d-flex align-items-center justify-content-center"
            style="
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              background-color: rgba(0, 0, 0, 0.65);
              z-index: 100;
            "
          >
            請先選擇飲品
          </div>
          <div class="card-body px-4">
            <div class="mb-3">
              <label for="productNum" class="form-label">數量</label>
              <input
                type="number"
                class="form-control"
                id="productNum"
                placeholder="數量"
                min="0"
                v-model="tempSelected.count"
              />
            </div>
            <div class="mb-3">
              <label for="productNum" class="form-label d-block">冰塊*</label>
              <div
                v-for="(ice, key) in iceType"
                :key="`${key}-${ice}`"
                class="form-check form-check-inline"
              >
                <input
                  class="form-check-input"
                  name="iceType"
                  type="radio"
                  :id="`${key}-${ice}`"
                  :value="ice"
                  v-model="tempSelected.ice"
                  :disabled="
                    !tempSelected.hasOwnProperty('defaults') ||
                    (tempSelected.defaults.ice !== '' && tempSelected.defaults.ice !== ice)
                  "
                />
                <label class="form-check-label" :for="`${key}-${ice}`">{{ ice }}</label>
              </div>
            </div>
            <div class="mb-3">
              <label for="productNum" class="form-label d-block">甜度*</label>
              <div
                v-for="(sugar, key) in sugarType"
                :key="`${key}-${sugar}`"
                class="form-check form-check-inline"
              >
                <input
                  class="form-check-input"
                  name="sugarType"
                  type="radio"
                  :id="`${key}-${sugar}`"
                  :value="sugar"
                  v-model="tempSelected.sugar"
                  :disabled="
                    !tempSelected.hasOwnProperty('defaults') ||
                    (tempSelected.defaults.sugar !== '' && tempSelected.defaults.sugar !== sugar)
                  "
                />
                <label class="form-check-label" :for="`${key}-${sugar}`">{{ sugar }}</label>
              </div>
            </div>
            <div class="mb-3">
              <label for="productNum" class="form-label d-block">
                加料
                <small class="text-black-50 fw-light mb-0">加一樣 10 元</small>
              </label>
              <div
                v-for="(topping, key) in toppingsType"
                :key="`${key}-${topping}`"
                class="form-check form-check-inline"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`${key}-${topping}`"
                  :value="topping"
                  v-model="tempSelected.toppings"
                  :disabled="
                    !tempSelected.hasOwnProperty('defaults') ||
                    tempSelected.defaults.toppings.includes(topping)
                  "
                />
                <label class="form-check-label" :for="`${key}-${topping}`">{{ topping }}</label>
              </div>
            </div>
            <div class="mb-3">
              <label for="productNotice" class="form-label">備註</label>
              <textarea
                v-model="tempSelected.notice"
                class="form-control"
                id="productNotice"
                rows="2"
              >
              </textarea>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-outline-primary w-100" type="button" @click="reset">
                取消
              </button>
              <button
                class="btn btn-primary w-100"
                type="button"
                @click="addToCart(tempSelected)"
                :disabled="!tempSelected.hasOwnProperty('name')"
              >
                加入
              </button>
            </div>
          </div>
        </div>
        <div class="card" v-if="cartList.length !== 0">
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">品項</th>
                  <th scope="col">冰塊</th>
                  <th scope="col">甜度</th>
                  <th scope="col">加料</th>
                  <th scope="col">單價</th>
                  <th scope="col">數量</th>
                  <th scope="col">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, key) in cartList" :key="`${key}-${item.name}`">
                  <th scope="row">
                    {{ item.name }}<br />
                    <small v-if="item.notice !== ''" class="text-muted fw-normal">
                      備註：{{ item.notice }}
                    </small>
                  </th>
                  <td>{{ item.ice }}</td>
                  <td>{{ item.sugar }}</td>
                  <td>{{ item.toppings.join(', ') }}</td>
                  <td>{{ XEUtils.commafy(item.price) }}</td>
                  <td>{{ XEUtils.commafy(item.count) }}</td>
                  <td class="text-end">{{ XEUtils.commafy(item.subtotal) }}</td>
                </tr>
              </tbody>
            </table>
            <p class="text-end">共 NT$ {{ XEUtils.commafy(total) }} 元</p>
            <div class="d-flex gap-2">
              <button
                :disabled="cartList.length === 0"
                class="btn btn-outline-secondary w-100"
                @click="resetOrder"
              >
                重新選擇
              </button>
              <button
                :disabled="cartList.length === 0"
                class="btn btn-secondary w-100"
                @click="generateOrder"
              >
                產生訂單
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-light p-3 mt-3" v-if="checkedOrder.orderList.length !== 0">
    <div class="bg-white p-3 d-flex flex-column" style="min-height: 450px">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">品項</th>
            <th scope="col">冰塊</th>
            <th scope="col">甜度</th>
            <th scope="col">加料</th>
            <th scope="col">單價</th>
            <th scope="col">數量</th>
            <th scope="col">小計</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, key) in checkedOrder.orderList"
            :key="`${key}-${checkedOrder.orderTime}`"
          >
            <th scope="row">
              {{ item.name }}<br />
              <small v-if="item.notice !== ''" class="text-muted fw-normal">備註：{{ item.notice }}</small>
            </th>
            <td>{{ item.ice }}</td>
            <td>{{ item.sugar }}</td>
            <td>{{ item.toppings.join(', ') }}</td>
            <td>{{ XEUtils.commafy(item.price) }}</td>
            <td>{{ XEUtils.commafy(item.count) }}</td>
            <td class="text-end">{{ XEUtils.commafy(item.subtotal) }}</td>
          </tr>
        </tbody>
      </table>
      <p class="mt-3 mb-1">訂單成立時間：{{ checkedOrder.orderTime }}</p>
      <p class="mb-1">餐點數： {{ XEUtils.commafy(checkedOrder.orderList.length) }}</p>
      <p class="mb-1">付款狀態：未付款</p>
      <p class="text-end mt-auto">共 NT$ {{ XEUtils.commafy(checkedOrder.total) }} 元</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import XEUtils from 'xe-utils'

const iceType = ref(['正常冰', '少冰', '微冰', '去冰', '熱'])
const sugarType = ref(['全糖', '七分', '半糖', '三分', '無糖'])
const toppingsType = ref(['珍珠', '粉條', '小粉圓', '椰果', '芋頭'])
const products = ref([
  {
    name: '珍珠鮮奶茶',
    engName: 'Pearl Milk Tea',
    price: 60,
    defaults: {
      toppings: ['珍珠'],
      sugar: '',
      ice: ''
    }
  },
  {
    name: '椰果鮮奶茶',
    engName: 'Coconut Milk Tea',
    price: 60,
    defaults: {
      toppings: ['椰果'],
      sugar: '',
      ice: ''
    }
  },
  {
    name: '鮮奶茶',
    engName: 'Milk Tea',
    price: 50,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: ''
    }
  },
  {
    name: '古意冬瓜茶 (糖固定)',
    engName: 'Winter Melon Drink',
    price: 30,
    defaults: {
      toppings: [''],
      sugar: '全糖',
      ice: ''
    }
  },
  {
    name: '蜜香紅茶',
    engName: 'Black Tea',
    price: 30,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: ''
    }
  },
  {
    name: '包種青茶',
    engName: 'Black Tea',
    price: 35,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: ''
    }
  },
  {
    name: '檸檬烏龍',
    engName: 'Lemon Oolong Tea',
    price: 55,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: ''
    }
  },
  {
    name: '薑母茶 (熱飲)',
    engName: 'Ginger Tea',
    price: 55,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: '熱'
    }
  },
  {
    name: '青草茶',
    engName: 'Herbal Tea',
    price: 35,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: ''
    }
  },
  {
    name: '金桔檸檬',
    engName: 'Kumquat Lemonade',
    price: 40,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: ''
    }
  },
  {
    name: '柳澄青茶',
    engName: 'Orange Mountain Tea',
    price: 45,
    defaults: {
      toppings: [''],
      sugar: '',
      ice: ''
    }
  }
])
const tempSelected = reactive({})
const cartList = ref([])
const total = ref(0)
const checkedOrder = reactive({
  orderTime: '',
  orderList: [],
  total: 0
})

function selectedProducts(product) {
  Object.assign(tempSelected, {
    ...product,
    count: 1,
    ice: product.defaults.ice !== '' ? product.defaults.ice : '正常冰',
    sugar: product.defaults.sugar !== '' ? product.defaults.sugar : '全糖',
    toppings: [],
    notice: ''
  })
}
function reset() {
  for (const key in tempSelected) {
    delete tempSelected[key]
  }
}
function addToCart(item) {
  cartList.value.push(
    Object.assign(
      {},
      {
        ...item,
        subtotal: (item.price + item.toppings.length * 10) * item.count
      }
    )
  )
  countTotal()
  reset()
}
function countTotal() {
  total.value = cartList.value.reduce((acc, item) => acc + item.subtotal, 0)
}
function resetOrder() {
  cartList.value = []
  total.value = 0
}
function generateOrder() {
  if(checkedOrder.orderList.length) {
    const newOrderList = cartList.value.map(item => ({
    ...item,
    subtotal: (item.price + item.toppings.length * 10) * item.count
  }))
  checkedOrder.orderList = checkedOrder.orderList.concat(newOrderList)
  cartList.value = []
  } else {
  checkedOrder.orderList = [...cartList.value]
  }
  checkedOrder.total = checkedOrder.orderList.reduce((acc, item) => acc + item.subtotal, 0);

  checkedOrder.orderTime = new Date().toLocaleString()
  cartList.value = []
}
</script>
