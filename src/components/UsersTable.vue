<template>
  <div>
    <div class="table">
      <div class="table-headers">
        <h5 class="header" :key="index" v-for="(th,index) in headers">{{ th.label }}</h5>
      </div>
      <div class="table-rows" :key="row.label" v-for="(row) in rows">
        <p class="table-data" :key="item.label" v-for="(item) in headers">
          {{ row[item.field] }}
          <span v-if="item.field === 'actions'">
      <img @click="editUser(row)" src="/edit-2.svg" class="icon editIcon"/>
      <img @click="deleteUser(row.id)" src="/trash-2.svg" class="icon deleteIcon"/>
    </span>
        </p>
      </div>
    </div>
    <div class="modal fade modal-center" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit User Info</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            </button>
          </div>
          <div class="modal-body">
            <EditUserForm @closeModal="editModal.hide()" @updateUser="editSelectedUserData($event)" v-if="selectedUser"
                          :user="selectedUser"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditUserForm from "@/components/edit/EditUserForm";
import {Modal} from "bootstrap";

export default {
  name: "UsersTable",
  components: {EditUserForm},
  data() {
    return {
      selectedUser: null,
      editModal: null
    }
  },
  props: {
    headers: {
      type: Array,
    },
    rows: {
      type: Array, Object
    }
  },
  mounted() {
    this.editModal = new Modal(`#editModal`, {
      keyboard: false,
      backdrop: true
    })
  },
  methods: {
    deleteUser(id) {
      this.$emit('deleteUser', id)
    },
    editUser(user) {
      this.selectedUser = user
      this.editModal.show()
    },
    editSelectedUserData(event) {
      this.$emit('editedUser', event)
    }
  }
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
  flex: 1 1 0;
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