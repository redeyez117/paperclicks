<template>
  <div class="registration-form">
    <div class="row">
      <div class="col-12 col-md-6">
        <BaseInput
            id="name"
            label="Full Name"
            v-model="name"
            type="text"
            placeholder="John Gonzales"
        />
      </div>
      <div class="col-12 col-md-6">
        <div class="google-wrapper">
                    <span class="google-location">
                    <input class="google-checkbox" :value="googleMap" type="checkbox"/>
                      Use Google Location
                  </span>
          <BaseInput
              id="address"
              label="Address"
              v-model="address.street"
              type="text"
              placeholder="Reter 43"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <BaseInput
            id="username"
            label="Username"
            v-model="username"
            type="text"
            placeholder="johngonzales13"
        />
      </div>
      <div class="col-12 col-md-6">
        <BaseInput
            id="city"
            label="City"
            v-model="address.city"
            type="text"
            placeholder="Tirana"
        >
        </BaseInput>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <BaseInput
            id="email"
            label="Email"
            v-model="email"
            type="email"
            placeholder="johngonzales1332@gmail.com"
        />
      </div>
      <div class="col-12 col-md-6">
        <BaseInput
            id="zipcode"
            label="Zip Code"
            v-model="address.zipcode"
            type="text"
            placeholder="1001"
        >
        </BaseInput>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <BaseInput
            id="phone"
            label="Phone Nr"
            v-model="phone"
            type="number"
            placeholder="+355 69 76 76 654"
        />
      </div>
    </div>
    <div class="d-flex mt-4 justify-content-end">
      <button @click="saveUser" class="btn btn-primary saveBtn">Save</button>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/BaseInput";
import {createUser} from "@/utils/createUser";

export default {
  name: "CreateUserForm",
  components: {BaseInput},
  data() {
    return {
      name: '',
      address: {
        city: '',
        zipcode: '',
        street: '',
        geo: {
          lat: null,
          long: null
        }
      },
      city: '',
      username: '',
      email: '',
      zip_code: '',
      phone: '',
      googleMap: false,
      createdUser: null
    }
  },
  methods: {
    async saveUser() {
      this.createdUser = await createUser(this.name,this.username,this.phone,this.email,this.address)
      this.$emit('refreshTable',this.createdUser)
      this.$emit('closeModal')
    }
  }
}
</script>

<style scoped>

.google-checkbox {
  margin-right: 5px;
}

.google-location {
  font-size: 12px;
  color: #4E5964;
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
}

.google-wrapper {
  position: relative;
}

.saveBtn {
  width: 100px;
}

</style>