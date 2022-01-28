let app = Vue.createApp({
  data() {
    return {
      showSidebar: false,
      inventory: [],
      cart: {}
    }
  },
  computed: {
    totalQuantity() {
      return Object.values(this.cart).reduce((acc, cartItem) => {
        return acc + cartItem.quantity
      }, 0)
    }
  },
  methods: {
    addToCart(product) {
      if (!this.cart[product.id]) this.cart[product.id] = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 0
      }
      this.cart[product.id].quantity += product.quantity
      product.quantity = 0
    },
    removeFromCart(product) {
      delete this.cart[product.id]
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar
    }
  },
  async mounted() {
    const res = await fetch('./food.json')
    this.inventory = await res.json()
  }
})

app.component('sidebar', {
  props: ['toggle', 'cart', 'remove'],
  computed: {
    cartTotal() {
      return Object.values(this.cart).reduce((acc, cartItem) => {
        return acc + cartItem.quantity * cartItem.price.USD;
      }, 0).toFixed(2);
    }
  },
  template: `
      <aside class="cart-container">
        <div class="cart">
          <h1 class="cart-title spread">
            <span>
              Cart
              <i class="icofont-cart-alt icofont-1x"></i>
            </span>
            <button @click="toggle" class="cart-close">&times;</button>
          </h1>

          <div class="cart-body">
            <table class="cart-table">
              <thead>
                <tr>
                  <th><span class="sr-only">Product Image</span></th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th><span class="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in cart" >
                  <td><i class="icofont-carrot icofont-3x"></i></td>
                  <td>{{ product.name }}</td>
                  <td>\${{ product.price.USD}}</td>
                  <td class="center">{{ product.quantity }}</td>
                  <td>\${{ (product.quantity * product.price.USD).toFixed(2) }}</td>
                  <td class="center">
                    <button class="btn btn-light cart-remove"
                      @click="remove(product)">
                      &times;
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <p class="center" v-if="!Object.values(cart).length"><em>No items in cart</em></p>
            <div class="spread">
              <span><strong>Total:</strong> \${{ cartTotal }}</span>
              <button class="btn btn-light">Checkout</button>
            </div>
          </div>
        </div>
      </aside>
  `
})

app.mount('#app')
