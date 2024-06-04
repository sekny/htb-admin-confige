<template>
  <div>
    <Card shadow>
      <p slot="title">Role</p>
      Change Loading Status <Switch v-model="loading"></Switch>
      <Switch v-model="switch1" @on-change="change" />
      <Table :loading="loading" :columns="table.column" :data="table.data"></Table>
      <!-- <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="100" :current="1" @on-change="changePage"></Page>
        </div>
      </div> -->
    </Card>
  </div>
</template>
<script>
import axios from '@/libs/api.request'
// import { Spin } from 'iview'
export default {
  name: 'role',
  data () {
    return {
      loading: false,
      switch1: false,
      table: {
        column: [],
        data: [ ],
        page: 1,
        per_page: 50,
        total: 12,
        total_pages: 2
      }
    }
  },
  methods: {
    change (status) {
      this.$Message.info('Switch' + status)
    }
  },
  async mounted () {
    try {
      // Spin.show()
      await axios.request({
        url: 'users', // 'unknown',
        method: 'get'
      }).then(res => {
        console.log(res)
        this.table.column = Object.keys(res.data.data[0]).map((item) => {
          var col = {
            title: this.capitalizeFirstLetter(item),
            key: item
          }

          if (item === 'id') {
            col.width = 60
          }

          if (item === 'avatar') {
            col.render = (h, params) => {
              const row = params.row
              return h('Avatar', {
                props: {
                  src: row.avatar
                }
              })
            }
          }

          return col
        })
        this.table.data = res.data.data
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        // Spin.hide()
      })
    } catch (err) {
      console.log(err.message)
      this.$Message.error(err.message)
      // Spin.hide()
    }
  }
}
</script>
