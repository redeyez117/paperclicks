<template>
  <div id="app">
    <div class="container">
      <div class="title">
        <h1>Users</h1>
      </div>
      <div class="table-section">
        <div class="d-flex justify-content-end mb-4">
          <CreateUserModal @pushToArray="showNewUser($event)"/>
        </div>
        <UsersTable @editedUser="editedUser($event)" @deleteUser="deleteSpecificUser($event)" :rows="rows"
                    :headers="headers"/>
      </div>
    </div>
  </div>
</template>

<script>
import {headers} from "@/utils/headers";
import {fetchUsers} from "@/utils/fetchUsers";
import UsersTable from "@/components/UsersTable";
import CreateUserModal from "@/components/create/CreateUserModal";

export default {
  name: 'App',
  components: {
    CreateUserModal,
    UsersTable
  },
  async mounted() {
    this.rows = await fetchUsers()
  },
  data() {
    return {
      headers,
      rows: [],
      showModal: false
    }
  },
  methods: {
    showNewUser(event) {
      this.rows.push(event)
    },
    deleteSpecificUser(event) {
      this.rows = this.rows.filter(item => item.id !== event)
    },
    editedUser(event) {
      this.rows = this.rows.map(item => item.id === event.id ? {...event} : {...item})
    }
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.table-section {
  margin-top: 7rem;
}

.title {
  text-align: center;
}
</style>
