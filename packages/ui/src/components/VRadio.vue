<template>
  <div class="field is-horizontal has-addons v-radio">
    <label
      v-if="label"
      class="label"
    >
      {{ label }}
    </label>
    <div
      v-for="option in options"
      :key="'label' + getKeyString(option)"
      class="control"
    >
      <label
        :class="{'is-info is-selected': getOptionParameter(option, 'val') === value}"
        :for="id + getKeyString(option)"
        class="button is-multiline"
      >
        {{ getOptionParameter(option, 'key') }}
        <span
          v-if="option.help"
          class="help"
        >
          {{ option.help }}
        </span>
      </label>
      <input
        v-model="selected"
        :id="id + getKeyString(option)"
        :name="name"
        :value="getOptionParameter(option, 'val')"
        type="radio"
      >
    </div>
    <p
      v-if="error"
      class="help is-danger"
    >
      {{ error }}
    </p>
  </div>
</template>

<script>
import getOptionParameter from '@endpass/utils/getOptionParameter';

export default {
  name: 'VRadio',
  props: {
    value: {
      type: [Number, String],
      default: null,
    },
    id: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: null,
    },
  },
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(newVal) {
        this.$emit('input', newVal);
      },
    },
  },
  methods: {
    getOptionParameter,
    getKeyString: item => item.key || item.val || item,
  },
};
</script>

<style lang="css">
.v-radio input {
  display: none;
}
</style>
