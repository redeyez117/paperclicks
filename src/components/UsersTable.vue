<template>
<div class="table">
  <div class="table-headers">
    <h5 class="header" :key="index" v-for="(th,index) in headers">{{th.label}}</h5>
  </div>
  <div class="table-rows" :key="row.label" v-for="(row) in rows">
    <p class="table-data" :key="item.label" v-for="(item) in headers">
      {{row[item.field]}}
      <span v-if="item.field === 'actions'">
      <img src="/edit-2.svg" class="icon editIcon"/>
      <img src="/trash-2.svg" class="icon deleteIcon"/>
    </span>
    </p>
  </div>
</div>
</template>

<script>
export default {
  name: "UsersTable",
  props: {
    headers: {
      type: Array,
    },
    rows: {
      type: Array, Object
    }
  },
}
</script>

<style scoped>

.table {
  display: table;
}

.table-headers {
  width: 100%;
  color: #4E5964;
  text-align: left;
  display: flex;
}

.icon {
  width: 18px;
  color: #4E5964;
}

.editIcon {
  margin-right: 10px;
}

.header {
  padding-left: 15px;
  font-size: 18px;
  flex:1 1 0;
}

.header:first-child {
  flex: 0 0 100px;
}

.header:last-child {
  flex: 0 0 100px;
}

.table .table-rows {
  color: #4E5964;
  text-align: left;
  margin-block: 10px;
  border-radius: 5px;
  border: 1px solid #E7EAF3;
}

.table-rows {
  display: flex;
  align-items: center;
}

.table-data {
  padding-block: 10px;
  padding-inline: 15px;
  flex: 1 1 0;
  margin-bottom: 0;
  color: #4E5964;
}

.table-data:first-child {
  flex: 0 0 100px;
}

.table-data:last-child {
  flex: 0 0 100px;
}
</style>