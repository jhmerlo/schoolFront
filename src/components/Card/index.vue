<template>
  <div class="shadow-10 full-height q-pa-md rounded-borders">
    <div class="flex justify-between items-center">
      <h6 class="q-my-none q-pa-sm">{{label}}</h6>
      <q-icon :name="icon" size="md"/>
      <q-separator class="q-mt-sm"/>
    </div>
    <slot>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String
    }
  }
}
</script>
