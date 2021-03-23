<template>
    <div class="cart">
        <h1 class="title">Your Basket</h1>
        <sup>
            Items you have added to your basket are shown below.<br />
            Adjust the quantities or remove items before continuing your purchase.
        </sup>

        <div class="form">
            <table class="table is-striped" v-show="products.length">
                <thead>
                    <tr class="min">
                        <td>Product</td>
                        <td class="center">Price</td>
                        <td class="center">Qty</td>
                        <td class="right">Cost</td>
                        <td class="blank"></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="p in products" track-by="id" :key="p.id">
                        <template v-if="p.quantity > 0">
                            <td>{{ p.name }}</td>
                            <td>£{{ p.price }}</td>
                            <td>
                                <div class="input-group center">
                                    <div class="input-element">
                                        <input @change="updateQuantity(p)" id="quantity" type="number" class="form-control input-number" :value="p.quantity" min="1" max="10" size="1" onfocus="this.previousValue = this.value" onkeydown="this.previousValue = this.value" oninput="validity.valid || (value = this.previousValue)" />
                                    </div>

                                    <div class="input-element right">
                                        <button @click="incrementCart(p)" type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]">+</button>
                                        <button @click="decrementCart(p)" type="button" class="btn btn-default btn-number" data-type="minus" data-field="quant[1]">-</button>
                                    </div>
                                </div>
                            </td>
                            <td class="right">£{{ (p.quantity * p.price).toFixed(2) }}</td>
                            <td class="blank">
                                <a @click="makeQuantityZero({ product: p, quantity: 0 })" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" /></svg
                                ></a>
                            </td>
                        </template>
                    </tr>
                    <br />
                    <tr></tr>
                    <tr class="blank min grey">
                        <td>Subtotal:</td>
                        <td></td>
                        <td></td>
                        <td class="right">£{{ total.toFixed(2) }}</td>
                        <td></td>
                    </tr>
                    <tr class="blank min grey">
                        <td>VAT @ 20%:</td>
                        <td></td>
                        <td></td>
                        <td class="right">£{{ (total * 0.2).toFixed(2) }}</td>
                        <td></td>
                    </tr>
                    <br />
                    <tr class="blank min">
                        <td><strong>Total Cost</strong></td>
                        <td></td>
                        <td></td>
                        <td class="right">
                            <strong>£{{ (total + total * 0.2).toFixed(2) }}</strong>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <button :disabled="total == 0" class="checkout right" @click="Checkout">Buy Now >></button>
        </div>
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
