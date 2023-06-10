<template>
  <div class="container gx-2">
    <div class="row h-100 py-3">
      <div class="col-md-3 h-100 d-flex flex-column">
        <div class="form-floating mb-2">
          <input
            v-model="searchKeyWord"
            type="text"
            class="form-control"
            id="search"
            placeholder="search"
          />
          <label for="search">search</label>
        </div>
        <div class="list-group option">
          <label
            v-for="(item, keys) in selectedArea"
            class="list-group-item"
            :key="keys + 'filter'"
          >
            <input
              @click="searchArea = item"
              class="form-check-input me-1"
              type="radio"
              :value="item"
              name="area"
              :checked="searchArea.Name === item.Name"
            />
            {{ item.Name }}
          </label>
        </div>
      </div>
      <div class="col-md-8 h-100 d-flex flex-column">
        <div class="form-floating">
          <select
            v-model="searchArea"
            id="searchArea"
            class="form-select w-50 mb-2"
            aria-label="select example"
          >
            <option selected :value="searchArea" disabled>瀏覽紀錄</option>
            <option v-for="(item, keys) in browseLog" :key="keys" :value="item">
              {{ keys + 1 }}. {{ item.Name }}
            </option>
          </select>
          <label for="searchArea">瀏覽紀錄</label>
        </div>
        <div class="card overflow-y-auto">
          <div v-if="searchArea.Name">
            <img :src="searchArea.Picture1" class="card-img-top" :alt="searchArea.Name" />
            <iframe
              width="100%"
              height="300"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              :src="`https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${searchArea.Py},${searchArea.Px}(${searchArea.Name})&z=16&output=embed`"
            ></iframe>
            <div class="card-body">
              <h5 class="card-title">{{ searchArea.Name }}</h5>
              <p>{{ searchArea.Description }}</p>
            </div>
          </div>
          <div v-else class="card-body">請選擇場域</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import axios from 'axios'

const datastore = ref([])
const searchKeyWord = ref('')
const browseLog = ref([])
const searchArea = ref('')
const selectedArea = computed(() => {
  return datastore.value.filter((item) => item.Name.match(searchKeyWord.value))
})

watch(searchArea, () => {
  if (browseLog.value.length > 10) {
    browseLog.value.shift()
  }
  browseLog.value.push(searchArea.value)
})

const fetchApiData = async () => {
  try {
    const res = await axios.get(
      'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json'
    )
    datastore.value = res.data.result.records
  } catch (err) {
    console.log(err)
  }
}
onMounted(() => {
  fetchApiData()
})
</script>

<style lang="scss" scoped>
.container{
    height: 86vh;
  }

.option {
    overflow-y: auto;
  }
</style>