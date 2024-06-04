<template>
  <div>
    <Card shadow>
      <p slot="title"> Detail </p>
      <Row class="row-detail-container">
        <Form label-position="left" :label-width="200">
          <FormItem v-for="(value, name) in detail" :key="name" :label="name | label_title">
              <span> {{ value | viewDetailValue }} </span>
          </FormItem>
        </Form>
      </Row>
      <!-- <Button @click="close">Call the closeTag method to close this page</Button> -->
    </Card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'params',
  data () {
    return {
      detail: {}
    }
  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    close () {
      /**
       * If the closeTag method is called, the object parameters passed in by ordinary pages only need to write the name field.
       * If it is a dynamic route and a route with parameters, you need to pass in the query or params field to distinguish the page with the number of parameters to be closed.
       */
      this.closeTag({
        name: 'params',
        params: {
          id: this.$route.params.id
        }
      })
    }
  },
  mounted () {
    this.detail = this.$route.params
    console.log(this.$route)
  }
}
</script>

<style lang="less" scope>
  .row-detail-container {

    .ivu-form-item {
      margin-bottom: 0;

      .ivu-form-item-label {
          word-break: break-all;
          text-transform:capitalize;
      }
    }
  }
</style>
