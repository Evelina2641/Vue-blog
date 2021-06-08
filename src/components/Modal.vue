<template>
  <div class="modal">
    <div class="modal_item">
      <slot name="header"></slot>
      <div class="buttons">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
};
</script>

<style scoped>
.modal {
  background: var(--primary-color);
  position: fixed;
  top: 40vh;
  left: 0;
  right: 0;
  bottom: 50px;
  height: 20vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: all 0.2s ease-in;
}
.modal .modal_item {
  z-index: 1;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.modal .modal_item h3 {
  font-size: 1.7em;
  margin-bottom: 5px;
}
.modal .modal_item .buttons > button {
  padding: 15px 25px;
  background: var(--secondary-color);
  margin: 5px;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 1.2em;
}
</style>
