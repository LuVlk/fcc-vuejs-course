<template>
  <header class="top-bar spread">
    <nav class="top-bar-nav">
      <router-link to="/" class="top-bar-link">
        <i class="icofont-spoon-and-fork"></i>
        <span>Home</span>
      </router-link>

      <router-link to="/products" class="top-bar-link">
        <span>Products</span>
      </router-link>

      <router-link to="/past-orders" class="top-bar-link">
        <span>Past Orders</span>
      </router-link>
    </nav>

    <div @click="toggleSidebar" class="top-bar-cart-link">
      <i class="icofont-cart-alt icofont-1x"></i>
      <span>Cart ({{ totalQuantity }})</span>
    </div>
  </header>
  <router-view :inventory="inventory" :addToCart="addToCart"/>
  <Sidebar
    v-if="showSidebar"
    :toggle="toggleSidebar"
    :cart="cart"
    :remove="removeFromCart"
  />
</template>

<script>
import Sidebar from '@/components/Sidebar'
import food from '@/food.json'

export default {
  components: { Sidebar },
  data () {
    return {
      showSidebar: false,
      inventory: food,
      cart: {}
    }
  },
  computed: {
    totalQuantity () {
      return Object.values(this.cart).reduce((acc, cartItem) => {
        return acc + cartItem.quantity
      }, 0)
    }
  },
  methods: {
    addToCart (product) {
      if (!this.cart[product.id]) {
        this.cart[product.id] = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 0
        }
      }
      this.cart[product.id].quantity += product.quantity
      product.quantity = 0
    },
    removeFromCart (product) {
      delete this.cart[product.id]
    },
    toggleSidebar () {
      this.showSidebar = !this.showSidebar
    }
  }
}
</script>
