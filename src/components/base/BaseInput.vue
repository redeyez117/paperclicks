<template>
  <div class="base-element">
    <div class="d-flex justify-content-between align-items-center">
      <label v-if="label" :for="id" class="label font-bold mb-1">
        {{ label }}
      </label>
    </div>
    <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="updateInput"
        class="form-control"
        :placeholder="placeholder"
        :name="name"
    />
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "text"
    },
    name: {
      type: String,
      default: "text"
    },

  },
  methods: {
    updateInput(event) {
      this.$emit("input", event.target.value);
    }
  }
}
</script>

<style scoped>
.label {
  font-size: 12px;
}

input::placeholder {
  font-size: 12px;
  color: #C4C4C4;
  opacity: 0.7;
}

input {
  padding-block: 10px;
  border:1px solid #E7EAF3 !important;
  border-radius: 5px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0 !important;
}

input[type=number] {
  -moz-appearance: textfield;
}

.base-element {
  margin-block: 10px;
}
</style>