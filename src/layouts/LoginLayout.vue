<template>
  <q-layout class="bg-yellow-1" view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="text-secondary text-weight-bold">
          ESD
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <transition
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'LoginLayout'
}
</script>
