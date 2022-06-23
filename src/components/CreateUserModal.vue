<template>
  <div>
    <button type="button" class="btn btn-primary" @click="createModal.show()">
      <img class="icon plusIcon" src="/plus.svg"/>
      Create New User
    </button>
    <div class="modal fade modal-center" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">New User Info</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            </button>
          </div>
          <div class="modal-body">
            <CreateUserForm @refreshTable="addedUser($event)" @closeModal="createModal.hide()"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import CreateUserForm from "@/components/CreateUserForm";
import { Modal } from 'bootstrap'
export default {
  name: "CreateUserModal",
  props: ['users'],
  components: {CreateUserForm},
  mounted() {
    this.createModal  = new Modal('#exampleModal',{
      keyboard: false,
      backdrop: true
    })
  },
  data() {
    return {
      createModal: null
    }
  },
  methods: {
    addedUser(event) {
      this.$emit('pushToArray',event)
    }
  }
}
</script>

<style scoped>

.icon {
  width: 22px;
}

.modal-dialog {
  max-width: 37% !important;
}

</style>