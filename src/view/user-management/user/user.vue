<template>
  <div>
    <Card shadow>
      <p slot="title"> {{ $route.meta.title }} </p>
      <Row>
        <Col :xs="{ span: 24 }" :lg="{ span: 22 }"> </Col>
        <Col :xs="{ span: 24 }" :lg="{ span: 2 }" type="flex" justify="end">
          <Button
            long
            type="primary"
            @click="onCreate"
            icon="ios-add-circle-outline"
            >Add</Button
          >
        </Col>
      </Row>
      <Divider />
      <Table :columns="table.column" :data="table.data" :size="'small'"></Table>
    </Card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      table: {
        column: [
          {
            key: "id",
            title: "Id",
            width: 60
          },
          {
            key: "avatar",
            title: "User Info",
            maxWidth: 200,
            render: (h, params) => {
              const row = params.row

              return h('div', [
                h('Avatar', {
                  props: {
                    src: row.avatar
                  }
                }),
                h('span', {}, `${row.first_name} ${row.last_name}`)
              ])
            }
          },
          {
            key: "email",
            title: "Email",
            maxWidth: 200
          },
          // {
          //   key: "first_name",
          //   title: "first_name",
          // },
          // {
          //   key: "last_name",
          //   title: "last_name",
          // },
          {
            key: "roles",
            title: "Roles",
            render: (h, params) => {
              const row = params.row
              return h('Div', [
                ...row.roles.map((m) => {
                  return h('Tag', {
                    type: 'border'
                  }, m)
                })
              ])
            }
          }
        ],
        data: [
          {
            id: 1,
            email: "george.bluth@reqres.in",
            first_name: "George",
            last_name: "Bluth",
            avatar: "https://reqres.in/img/faces/1-image.jpg",
            roles: ["User", 'Super Admin']
          },
          {
            id: 2,
            email: "janet.weaver@reqres.in",
            first_name: "Janet",
            last_name: "Weaver",
            avatar: "https://reqres.in/img/faces/2-image.jpg",
            roles: ["User", "Kak User"]
          },
          {
            id: 3,
            email: "emma.wong@reqres.in",
            first_name: "Emma",
            last_name: "Wong",
            avatar: "https://reqres.in/img/faces/3-image.jpg",
            roles: ["User"]
          },
          {
            id: 4,
            email: "eve.holt@reqres.in",
            first_name: "Eve",
            last_name: "Holt",
            avatar: "https://reqres.in/img/faces/4-image.jpg",
            roles: ["User"]
          },
          {
            id: 5,
            email: "charles.morris@reqres.in",
            first_name: "Charles",
            last_name: "Morris",
            avatar: "https://reqres.in/img/faces/5-image.jpg",
            roles: ["User"]
          },
          {
            id: 6,
            email: "tracey.ramos@reqres.in",
            first_name: "Tracey",
            last_name: "Ramos",
            avatar: "https://reqres.in/img/faces/6-image.jpg",
            roles: ["User"]
          }
        ],
        page: 1,
        per_page: 50,
        total: 12,
        total_pages: 2
      }
    }
  },
  methods: {
    onCreate () {
      this.$Message.info('Click ey!!!')
      console.log("Hit create")
    }
  }
}
</script>
<style lang="less" scope>
.ivu-table {
  .ivu-avatar{
    margin-right: 5px;
  }
}
</style>
