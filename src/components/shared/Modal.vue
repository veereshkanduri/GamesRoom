<template>
     <div class="modal edit-product showModal" id="editProduct" tabindex="-1" role="dialog" aria-labelledby="editProductLabel" aria-hidden="true" >
            <div class="modal-dialog" role="document" style="overflow-y: initial !important; z-index:9999">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editProductLabel">{{header}}</h5>
                        <button type="button" class="close" @click="$emit('close')" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" style="height:570px; overflow-y: auto;">
                    <slot></slot>
                    <br>
                    </div>
                    
                </div>
            </div>
        </div>
</template>
<script>
export default {
  props: ["header"],
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss">
.showModal {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>