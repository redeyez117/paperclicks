<template>
  <div class="edit-form">
    <div class="row">
      <div class="col-12 col-md-6">
        <BaseInput
            id="name"
            label="Full Name"
            :model-value="updatedUser.name"
            v-model="updatedUser.name"
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
              label="Address"
              v-if="!googleMap"
              id="address"
              :model-value="updatedUser.address.street"
              v-model="updatedUser.address.street"
              type="text"
              placeholder="Reter 43"
              v-validate="'required'"
              name="address"
          />
          <div style="padding-top: 8px;" class="form-group" v-if="googleMap">
            <label id="address" class="label" for="address">
              Address
            </label>
            <vue-google-autocomplete name="address" ref="address" v-model="updatedUser.address.street" id="map"
                                     classname="form-control" placeholder="Start typing"
                                     v-on:placechanged="getAddressData"/>
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
            :model-value="updatedUser.username"
            v-model="updatedUser.username"
            type="text"
            placeholder="johngonzales13"
            v-validate="'required'"
            name="username"
        />
        <span class="error-message">{{ errors.first('username') }}</span>
      </div>
      <div class="col-12 col-md-6">
        <BaseInput
            v-if="updatedUser"
            id="city"
            label="City"
            :model-value="updatedUser.address.city"
            v-model="updatedUser.address.city"
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
            :model-value="updatedUser.email"
            v-model="updatedUser.email"
            type="email"
            placeholder="johngonzales1332@gmail.com"
            v-validate="'required|email'"
            name="email"
        />
        <span class="error-message">{{ errors.first('email') }}</span>
      </div>
      <div class="col-12 col-md-6">
        <BaseInput
            v-if="updatedUser"
            id="zipcode"
            label="Zip Code"
            :model-value="updatedUser.address.zipcode"
            v-model="updatedUser.address.zipcode"
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
            :model-value="updatedUser.phone"
            v-model="updatedUser.phone"
            type="text"
            placeholder="+355 69 76 76 654"
            v-validate="'required|numeric'"
            name="phone number"
        />
        <span class="error-message">{{ errors.first('phone number') }}</span>
      </div>
      <div v-if="googleMap" class="col-12 col-md-3">
        <BaseInput
            id="latitude"
            label="Latitude"
            v-model="updatedUser.address.geo.lat"
            :model-value="updatedUser.address.geo.lat"
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
            v-model="updatedUser.address.geo.long"
            :model-value="updatedUser.address.geo.long"
            type="text"
            placeholder="-32.454"
            v-validate="'required'"
            name="longitude"
        />
        <span class="error-message">{{ errors.first('longitude') }}</span>
      </div>
    </div>
    <div class="d-flex mt-4 justify-content-end">
      <button @click="updateUser" class="btn btn-primary">Update User</button>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
import VueGoogleAutocomplete from "vue-google-autocomplete";
export default {
  name: "EditUserForm",
  components: {BaseInput,VueGoogleAutocomplete},
  props: ['user'],
  data() {
    return {
      googleMap: false,
    }
  },
  computed: {
    updatedUser() {
      return {...this.user}
    }
  },
  methods: {
    updateUser() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$emit('updateUser', this.updatedUser)
          this.$emit('closeModal')
        } else {
          alert('Correct them errors!');
        }
      })
    },
    getAddressData: function (addressData) {
      this.updatedUser.address.street = addressData.route;
      this.updatedUser.address.city = addressData.locality
      this.updatedUser.address.zipcode = addressData.postal_code
      this.updatedUser.address.geo.lat = addressData.latitude
      this.updatedUser.address.geo.long = addressData.longitude
      this.$nextTick(() => {
        this.$forceUpdate()
      })
    },
  }
}
</script>
