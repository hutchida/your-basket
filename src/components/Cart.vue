<template>
  <div class="cart">
    <h1 class="title">Your Basket</h1>
    <p>
      Items you have added to your basket are shown below.<br />
      Adjust the quantities or remove items before continuing your purchase.
    </p>
    <table class="table is-striped" v-show="products.length">
      <thead>
        <tr>
          <td>Product</td>
          <td>Price</td>
          <td>Qty</td>
          <td>Cost</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in products" track-by="id" :key="p.id">
          <template v-if="p.quantity > 0">
            <td>{{ p.name }}</td>
            <td>£{{ p.price }}</td>
            <td>
              <div class="input-group">
                <div class="input-element">
                  <input
                    @change="updateQuantity(p)"
                    size="2"
                    id="quantity"
                    type="number"
                    class="form-control input-number"
                    :value="p.quantity"
                    min="1"
                    max="10"
                    onfocus="this.previousValue = this.value"
                    onkeydown="this.previousValue = this.value"
                    oninput="validity.valid || (value = this.previousValue)"
                  />
                </div>

                <div class="input-element">
                  <button
                    @click="incrementCart(p)"
                    type="button"
                    class="btn btn-default btn-number"
                    data-type="plus"
                    data-field="quant[1]"
                  >
                    +
                  </button>
                  <button
                    @click="decrementCart(p)"
                    type="button"
                    class="btn btn-default btn-number"
                    data-type="minus"
                    data-field="quant[1]"
                  >
                    -
                  </button>
                </div>
              </div>
            </td>
            <td>£{{ (p.quantity * p.price).toFixed(2) }}</td>
            <td>
              <a @click="makeQuantityZero({ product: p, quantity: 0 })" href="#"
                ><img src="../assets/trash.svg" alt="Remove"
              /></a>
            </td>
          </template>
        </tr>

        <tr></tr>
        <tr>
          <td>Subtotal:</td>
          <td></td>
          <td></td>
          <td>£{{ total.toFixed(2) }}</td>
          <td></td>
        </tr>
        <tr>
          <td>VAT @ 20%:</td>
          <td></td>
          <td></td>
          <td>£{{ (total * 0.2).toFixed(2) }}</td>
          <td></td>
        </tr>
        <tr>
          <td><b>Total Cost</b></td>
          <td></td>
          <td></td>
          <td>
            <b>£{{ (total + total * 0.2).toFixed(2) }}</b>
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td><br/>
            <button :disabled="total == 0" class="checkout" @click="Checkout">
              Buy Now >>
            </button>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  computed: {
    ...mapGetters({
      products: "cartProducts",
    }),
    selectedItems() {
      return this.products.reduce(this.selectedItems, this.p);
    },
    total() {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity;
      }, 0);
    },
    totalPlusVat() {
      return (this.total + this.total * 0.2).toFixed(2);
    },
  },

  methods: {
    Checkout() {
      axios.post("/pay", this.products).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
      console.log("JSON posted with axios request:");
      console.log(this.products);
      alert(
        "You have successfully paid £" + this.totalPlusVat + " for your items."
      );
    },
    ...mapActions([
      "incrementCart",
      "decrementCart",
      "makeQuantityZero",
      "updateQuantity",
    ]),
  },
};
</script>

<style>
.input-element {
  float: left;
}

.input-number {
  height: 30px;
  text-align: right;
}
.input-group button {
  display: block;
  width: 25px;
  height: 18px;
}
.checkout {
  color: white;
  box-shadow: 3px 3px 0px #888888;
  border-radius: 10px;
  background-color: #3a3670;
  padding: 10px 20px;
}
input#quantity {
  text-align: right;
  border: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  margin: 0px 5px 0px 0px;
  width: 40px;
  height: 32px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
