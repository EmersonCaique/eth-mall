<template>
  <div id="app">
    <div class="container p-5">
      <div class="row">
        <div class="card col-8 col-sm-12 mb-3">
          <div class="card-body">
            <form>
              <div class="form-group">
                <label>Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="E.G: Ball, Shoes"
                  v-model="name"
                />
              </div>
              <div class="form-group">
                <label>Description</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="E.G: For football"
                  v-model="description"
                />
              </div>
              <button type="submit" class="btn btn-primary" @click.prevent="addForSale">Sell</button>
            </form>
          </div>
        </div>
      </div>
      <hr />
      <div class="row">
        <div
          class="card col-4 col-8 col-sm-12 mr-lg-2 mb-2"
          v-for="(product, index) in $store.getters.products"
          :key="index"
        >
          <img class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">Product: {{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <a href="#" class="btn btn-primary">Buy</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      name: null,
      description: null
    };
  },
  async mounted() {
    await this.$store.dispatch("RefreshUser");
    await this.$store.dispatch("RefreshBalance");
    await this.$store.dispatch("RefreshContract");
    await this.$store.dispatch("LoadProducts", this);
  },
  computed: {
    ...mapGetters(["contract", "user"])
  },
  methods: {
    ...mapActions(["addProduct"]),
    async addForSale() {
      this.contract.methods
        .sellProduct(this.name, this.description)
        .send({
          from: this.user
        })
        .on("receipt", () => {
          this.addProduct({ name: this.name, description: this.description });
        });
    }
  }
};
</script>

