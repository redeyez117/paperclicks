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
            name="name"
            v-validate="'required'"
        />
        <span class="error-message">{{ errors.first('name') }}</span>
      </div>
      <div class="col-12 col-md-6">
        <div class="google-wrapper">
                    <span class="google-location">
                    <input @change="googleMap = !googleMap" class="google-checkbox" :value="googleMap" type="checkbox"/>
                      Use Google Location
                  </span>
          <BaseInput
              v-if="!googleMap"
              id="address"
              label="Address"
              :model-value="address.street"
              v-model="address.street"
              type="text"
              placeholder="Reter 43"
              v-validate="'required'"
              name="address"
          />
          <div style="padding-top: 8px;" class="form-group" v-if="googleMap">
            <label id="address" class="label" for="address">
              Address
            </label>
            <vue-google-autocomplete name="address" ref="address" v-model="address.street" id="map" classname="form-control" placeholder="Start typing" v-on:placechanged="getAddressData"/>
          </div>
          <span class="error-message">{{ errors.first('address') }}</span>
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
            v-validate="'required'"
            name="username"
        />
        <span class="error-message">{{ errors.first('username') }}</span>
      </div>
      <div class="col-12 col-md-6">
        <BaseInput
            id="city"
            label="City"
            v-model="address.city"
            :model-value="address.city"
            type="text"
            placeholder="Tirana"
            v-validate="'required'"
            name="city"
        />
        <span class="error-message">{{ errors.first('city') }}</span>
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
            v-validate="'required|email'"
            name="email"
        />
        <span class="error-message">{{ errors.first('email') }}</span>
      </div>
      <div class="col-12 col-md-6">
        <BaseInput
            id="zipcode"
            label="Zip Code"
            v-model="address.zipcode"
            :model-value="address.zipcode"
            type="text"
            placeholder="1001"
            v-validate="'required'"
            name="zip code"
        />
        <span class="error-message">{{ errors.first('zip code') }}</span>
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
            v-validate="'required'"
            name="phone number"
        />
        <span class="error-message">{{ errors.first('phone number') }}</span>
      </div>
        <div v-if="googleMap" class="col-12 col-md-3">
          <BaseInput
              id="latitude"
              label="Latitude"
              v-model="address.geo.lat"
              :model-value="address.geo.lat"
              type="text"
              v-validate="'required'"
              placeholder="12.454"
              name="latitude"
          />
          <span class="error-message">{{ errors.first('latitude') }}</span>
        </div>
        <div v-if="googleMap" class="col-12 col-md-3">
          <BaseInput
              id="phone"
              label="Longitude"
              v-model="address.geo.long"
              :model-value="address.geo.long"
              type="number"
              placeholder="-32.454"
              v-validate="'required'"
              name="longitude"
          />
          <span class="error-message">{{ errors.first('longitude') }}</span>
        </div>
    </div>
    <div class="d-flex mt-4 justify-content-end">
      <button @click="saveUser" class="btn btn-primary saveBtn">Save</button>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
import {createUser} from "@/utils/createUser";
import VueGoogleAutocomplete from "vue-google-autocomplete";
export default {
  name: "CreateUserForm",
  components: {BaseInput, VueGoogleAutocomplete},
  mounted() {
    if(this.$refs.address) {
      this.$refs.address.focus();
    }
  },
  data() {
    return {
      rerender: 0,
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
    saveUser() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          this.createdUser = await createUser(this.name, this.username, this.phone, this.email, this.address)
          this.$emit('refreshTable', this.createdUser)
          this.$emit('closeModal')
          await this.clearInputFields()
        } else {
          alert('Correct them errors!');
        }
      });
    },

    getAddressData: function (addressData) {
      this.address.street = addressData.route;
      this.address.city = addressData.locality
      this.address.zipcode = addressData.postal_code
      this.address.geo.lat = addressData.latitude
      this.address.geo.long = addressData.longitude
      this.$nextTick(() => {
        this.$forceUpdate()
      })
    },

    clearInputFields() {
      this.name = "",
          this.address = {
            city: "",
            zipcode: "",
            street: "",
            geo: {
              lat: null,
              long: null
            }
          },
          this.username = "",
          this.email = "",
          this.zip_code = "",
          this.phone = ""
    }
  }
}
</script>

<style>

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

.error-message {
  font-size: 12px;
  font-style: italic;
  color: red;
}

.label {
  font-size: 12px;
}

.pac-container.pac-logo { z-index: 999999; }

</style>