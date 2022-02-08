<template>
  <div>
    <Card shadow>
      <p slot="title">Service Module</p>
      <Row>
        <Col :xs="{ span: 24 }" :lg="{ span: 22 }">
          <Input v-model="search"
            @on-enter="searchevents"
            @on-change="searchevents"
            clearable
            search placeholder="Search..."
            style="width: auto" />
          <!-- <Input :on-enter="searchevents" suffix="ios-search" placeholder="" style="width: auto" /> -->
        </Col>
        <Col :xs="{ span: 24 }" :lg="{ span: 2 }" type="flex" justify="end">
          <!-- <Select v-model="filter" style="width:200px" clearable>
            <Option value="ACTIVE">Active</Option>
              <Option value="INACTIVE">Inactive</Option>
          </Select> -->
          <Button long type="primary" @click="onCreate" icon="ios-add-circle-outline">Add</Button>
        </Col>
      </Row>
      <Divider />
      <Table :loading="loading" :columns="table.column" :data="table.dataSearch" :size="'small'"></Table>
      <Divider />
    </Card>

    <Modal v-model="showEditModal"
        :closable="false"
        :mask-closable="false"
        :title="form.model.title">
        <div>
          <Form ref="form.formValidate" :rules="form.ruleValidate" :model="form.model" :label-width="100">
            <FormItem label="Code" prop="code">
                <Input :disabled="!form.model.isCreate" v-model="form.model.code" max-length="32" placeholder="Code"></Input>
            </FormItem>
            <FormItem label="Name" prop="name">
                <Input v-model="form.model.name" placeholder="Title"></Input>
            </FormItem>
            <FormItem label="Description" prop="description">
                <Input v-model="form.model.description" placeholder="Description"></Input>
            </FormItem>
            <FormItem label="Status" prop="status">
                <Select v-model="form.model.status">
                    <Option value="ACTIVE">Active</Option>
                    <Option value="INACTIVE">Inactive</Option>
                </Select>
            </FormItem>
          </Form>
        </div>

        <div slot="footer">
            <Button type="text" @click="onCancel">Cancel</Button>
            <Button type="primary" :loading="modal_loading" @click="onSave">Save</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
import axios from '@/libs/api.request'
// import { Spin } from 'iview'
import dayjs from 'dayjs'
export default {
  name: 'configure',
  data () {
    return {
      loading: false,
      showEditModal: false,
      modal_loading: false,
      form: {
        model: {},
        formValidate: {
          status: '',
          code: '',
          name: '',
          description: ''
        },
        ruleValidate: {
          code: [
            { required: true, message: 'Code cannot be empty', trigger: 'blur' }
          ],
          name: [
            { required: true, message: 'Name cannot be empty', trigger: 'blur' }
          ],
          status: [
            { required: true, message: 'Status cannot be empty', trigger: 'blur' }
          ]
        }
      },
      table: {
        column: [],
        data: [],
        dataSearch: []
      },
      search: '',
      filter: ''
    }
  },
  methods: {
    searchevents: function () {
      console.log('search event hit')
      if (!this.search) {
        this.table.dataSearch = [ ...this.table.data ]
      }
      let result = this.table.data
      const search = this.search.toLowerCase()

      let filterData = result.filter((item) => {
        return item.code.toLowerCase().includes(search) || item.name.toLowerCase().includes(search) || item.description.toLowerCase().includes(search)
      })
      this.table.dataSearch = filterData
    },
    init () {
      this.$Message.info('Calling API')
      // Spin.show()
      this.loading = true
      axios.request({
        url: 'services/modules', // 'unknown',
        method: 'get'
      }).then(res => {
        console.log(res)
        var columns = [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: 'Actions',
            key: 'action',
            render: (h, params) => {
              return h('ButtonGroup', [
                // h('Icon', {
                //   props: {
                //     type: 'ios-paper-outline',
                //     size: 24,
                //     trigger: 'click',
                //     // color: '#2D8cF0'
                //   },
                //   on: {
                //     click: () => {
                //       this.viewDetail(params.index)
                //     }
                //   }
                // }),
                // h('Icon', {
                //   props: {
                //     type: 'ios-create-outline',
                //     size: 24,
                //     trigger: 'click',
                //     color: '#2D8cF0'
                //   },
                //   on: {
                //     click: () => {
                //       this.edit(params.index)
                //     }
                //   }
                // }),
                // h('Icon', {
                //   props: {
                //     type: 'ios-trash-outline',
                //     size: 24,
                //     trigger: 'click',
                //     color: '#ed4014'
                //   },
                //   on: {
                //     click: () => {
                //       this.onClickDelete(params.index)
                //     }
                //   }
                // })

                h('Button', {
                  props: {
                    type: 'default',
                    icon: 'ios-paper-outline',
                    size: 'small',
                    title: 'View'
                  },
                  on: {
                    click: () => {
                      this.viewDetail(params.index)
                    }
                  }
                }),
                h('Button', {
                  props: {
                    type: 'primary',
                    icon: 'ios-create-outline',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.edit(params.index)
                    }
                  }
                }),
                h('Button', {
                  props: {
                    type: 'error',
                    icon: 'ios-trash-outline',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.onClickDelete(params.index)
                    }
                  }
                })
              ])
            }
          }
        ]
        Object.keys(res.data.data[0]).map((item) => {
          var col = {
            title: this.capitalizeFirstLetter(item),
            key: item,
            sortable: true
          }

          if ((['created_at', 'modified_at']).includes(item)) {
            col.render = (h, params) => {
              const row = params.row
              return h('div', row[item] ? dayjs(row[item]).format('DD-MMM-YYYY') : '')
            }
          } else if (item === 'status') {
            // <Tag color="blue">blue</Tag>
            col.render = (h, params) => {
              const row = params.row
              return h('Tag', {
                props: {
                  size: 'small',
                  color: row[item] === 'ACTIVE' ? 'blue' : 'volcano'
                }
              }, row[item])
            }
            col.filters = [
              {
                label: 'Active',
                value: 'ACTIVE'
              },
              {
                label: 'Inactive',
                value: 'INACTIVE'
              }
            ]
            col.filterMultiple = false
            col.filterMethod = (value, row) => {
              // return row[item].indexOf(value) > -1
              return row[item] === value
            }
          }

          columns.push(col)
          // return col
        })
        this.table.column = columns
        this.table.data = res.data.data
        this.table.dataSearch = [...res.data.data]
      }).catch(err => {
        if (err && err.message) {
          this.$Message.error(err.message)
        }
      }).finally(() => {
        // Spin.hide()
        this.loading = false
      })
    },
    edit (index) {
      this.modal_loading = false
      this.$refs['form.formValidate'].resetFields()
      this.showEditModal = true
      var item = this.table.dataSearch[index]
      this.form.model = {
        ...item,
        title: `Edit ${item.name}`
      }
      // this.form.model.title = `Edit ${this.form.model.name}`
    },
    onCreate () {
      this.$refs['form.formValidate'].resetFields()
      this.form.model = {
        status: 'ACTIVE',
        title: 'Add New',
        isCreate: true
      }
      this.showEditModal = true
    },
    onSave () {
      this.modal_loading = true
      this.$refs['form.formValidate'].validate((valid) => {
        if (!valid) {
          this.modal_loading = false
        } else {
          this.modal_loading = true
          axios.request({
            url: 'services/modules' + (this.form.model.isCreate ? '' : '/' + this.form.model.code),
            method: this.form.model.isCreate ? 'post' : 'patch',
            data: {
              ...this.form.model,
              create_by: 'sys'
            }
          }).then(res => {
            this.init()
          }).catch(err => {
            if (err && err.message) {
              this.$Message.error(err.message)
            }
          }).finally(() => {
            this.modal_loading = false
            this.showEditModal = false
          })
        }
      })
    },
    onCancel () {
      // this.$Message.info('Clicked cancel')
      this.showEditModal = false
    },
    onSearch () {
      console.log(this.search)
    },
    onClickDelete (index) {
      console.log(index)
      this.$Modal.confirm({
        title: 'Title',
        content: '<p>The dialog box will be closed after 2 seconds</p>',
        loading: true,
        onOk: () => {
          setTimeout(() => {
            this.$Modal.remove()
            this.$Message.info('Asynchronously close the dialog box')
          }, 2000)
        }
      })
    },
    viewDetail (index) {
      var item = this.table.dataSearch[index]
      delete item.title
      const route = {
        name: 'viewDetail',
        params: {
          ...item
        },
        query: {
          title: `View Detail | ${this.$route.meta.title} | ${item.name}`
        }
      }
      this.$router.push(route)
    }
  },
  watch: {
  },
  async mounted () {
  },
  created: function () {
    try {
      this.init()
    } catch (err) {
      console.log(err.message)
      this.$Message.error(err.message)
      // Spin.hide()
      this.loading = false
    }
  }
}
</script>
<style lang="less" scope>
  .ivu-table-cell {
    i {
      cursor: pointer;
    }
    button:not(:first-child) {
      margin-left: 5px;
    }
  }
</style>
