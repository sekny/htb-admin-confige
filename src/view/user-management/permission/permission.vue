<template>
    <div>
        <p slot="title"> {{ $route.meta.title }} </p>
        <Tree :data="table.data" show-checkbox></Tree>
    </div>
</template>
<script>
export default {
  data () {
    return {
      showModal: false,
      table: {
        data: [
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
        ]
      }
    }
  }
}
</script>
<style lang="less" scope>

</style>
