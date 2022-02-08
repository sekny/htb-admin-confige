<template>
  <div>
        <Card shadow>
            <p slot="title"> {{ $route.meta.title }} </p>
            <Row>
            <Col :xs="{ span: 24 }" :lg="{ span: 22 }">
            </Col>
            <Col :xs="{ span: 24 }" :lg="{ span: 2 }" type="flex" justify="end">
                <Button long type="primary" @click="onCreate" icon="ios-add-circle-outline">Add</Button>
            </Col>
            </Row>
            <Divider />
            <Table :columns="table.column" :data="table.data" :size="'small'"></Table>
        </Card>

        <Modal v-model="showModal"
            :closable="false"
            :mask-closable="false"
            :title="form.model.title">
            <div>
              <Form ref="form.formValidate" :rules="form.ruleValidate" :model="form.model" :label-width="100">
                <FormItem label="Name" prop="name">
                    <Input v-model="form.model.name" placeholder="Name"></Input>
                </FormItem>
                <FormItem label="Roles" prop="roles">
                    <Tree :data="roles" show-checkbox></Tree>
                </FormItem>
              </Form>

            </div>

            <div slot="footer">
                <Button type="text" @click="onCancel">Cancel</Button>
                <Button type="primary" :loading="loading" @click="onSave">Save</Button>
            </div>
        </Modal>
  </div>
</template>
<script>
export default {
  name: 'role',
  data () {
    return {
      showModal: false,
      loading: false,
      form: {
        model: {}, // crud fields
        formValidate: {
          roles: [],
          name: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: 'Name cannot be empty', trigger: 'blur' }
          ],
          roles: [
            { required: true, trigger: 'blur' }
          ]
        }
      },
      roles: [
        {
          title: 'All',
          expand: true,
          children: [
            {
              title: 'User',
              expand: true,
              children: [
                {
                  title: 'Create'
                },
                {
                  title: 'Update'
                },
                {
                  title: 'Delete'
                },
                {
                  title: 'View',
                  checked: true
                },
                {
                  title: 'View All'
                }
              ]
            },
            {
              title: 'Employee',
              expand: true,
              children: [
                {
                  title: 'Create'
                },
                {
                  title: 'Update'
                },
                {
                  title: 'Delete'
                },
                {
                  title: 'Import'
                },
                {
                  title: 'Export'
                },
                {
                  title: 'View',
                  checked: true
                },
                {
                  title: 'View All'
                }
              ]
            }
          ]
        }
      ],
      table: {
        column: [
          {
            key: "id",
            title: "Id",
            maxWidth: 60
          },
          {
            key: "name",
            title: "Name",
            maxWidth: 200
          },
          {
            key: "status",
            title: "Status"
          }
        ],
        data: [
          {
            id: 1,
            name: 'Admin',
            status: 'Active'
          },
          {
            id: 2,
            name: 'User',
            status: 'Active'
          },
          {
            id: 3,
            name: 'Readonly',
            status: 'Disable'
          }
        ]
      }
    }
  },
  methods: {
    onCreate () {
      this.$refs['form.formValidate'].resetFields()
      this.showModal = true
      this.form.model = {
        isCreate: true,
        title: `Create New Role`
      }
    },
    onEdit () {
      this.showModal = true
      this.form.model = {
        isCreate: false,
        title: `Edit Role `
      }
    },
    onSave () {
      console.log(this.form.model)
      this.onCancel()
    },
    onCancel () {
      this.showModal = false
    }
  }
}
</script>
<style lang="less" scope>
  .ivu-tree {
    ul {
      li {
        margin-top: 0;
      }
    }
  }
</style>
