<template>
    <div class="basket-container">
        <h1 class="title">Your Basket</h1>
        <p class="title">
            Items you have added to your basket are shown below.<br />
            Adjust the quantities or remove items before continuing your purchase.
        </p>

        <div class="basket basket-header">
            <span><strong>Product</strong></span>
            <span><strong>Price</strong></span>
            <span class="center"><strong>Qty</strong></span>
            <span class="right"><strong>Cost</strong></span>
        </div>
        <div class="basket basket-items" v-for="p in products" track-by="id" :key="p.id">
            <template v-if="p.quantity > 0">
                <span>{{ p.name }}</span>
                <span>£{{ p.price }}</span>
                <span>
                    <div class="input-group center">
                        <div class="input-element">
                            <input @change="updateQuantity(p)" type="number" class="input-number" :value="p.quantity" min="1" max="10" size="1" onfocus="this.previousValue = this.value" onkeydown="this.previousValue = this.value" oninput="validity.valid || (value = this.previousValue)" />
                        </div>
                        <div class="input-element right">
                            <button @click="incrementCart(p)" type="button" class="button-increment" data-type="plus" data-field="quant[1]">+</button>
                            <button @click="decrementCart(p)" type="button" class="button-decrement" data-type="minus" data-field="quant[1]">-</button>
                        </div>
                    </div>
                </span>
                <span class="right container-delete">
                    £{{ (p.quantity * p.price).toFixed(2) }}
                    <a class="button-delete" @click="makeQuantityZero({ product: p, quantity: 0 })" href="#" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-label="Delete item">
                            <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" /></svg
                    ></a>
                </span>
            </template>
        </div>

        <div class="basket-footer">
            <div class="container-flex">
                <div class="row">Subtotal:</div>
                <div class="row">£{{ total.toFixed(2) }}</div>
            </div>
            <div class="container-flex">
                <div class="row">VAT @ 20%:</div>
                <div class="row">£{{ (total * 0.2).toFixed(2) }}</div>
            </div>
            <div class="container-flex total">
                <div class="row">Total Cost</div>
                <div class="row">£{{ (total + total * 0.2).toFixed(2) }}</div>
            </div>
        </div>

        <button :disabled="total == 0" class="button-checkout right" @click="Checkout">Buy Now >></button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
    computed: {
        ...mapGetters({
            products: 'cartProducts',
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
            axios.post('/pay', this.products).then(
                (response) => {
                    console.log(response);
                },
                (error) => {
                    console.log(error);
                }
            );
            console.log('JSON posted with axios request:');
            console.log(this.products);
            alert('You have successfully paid £' + this.totalPlusVat + ' for your items.');
        },
        ...mapActions(['incrementCart', 'decrementCart', 'makeQuantityZero', 'updateQuantity']),
    },
};
</script>

<style></style>
