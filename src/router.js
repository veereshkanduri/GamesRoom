import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import toastr from './components/shared/service/ErrorHandler';
import {
    isLoggedIn, isHost
} from './components/shared/service/authService'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('./views/About.vue')
    },
    {
        path: '/listings',
        name: 'listings',
        component: () => import('./views/Listings.vue')
    },
    {
        path: '/listings/:id',
        name: 'listingDetails',
        component: () => import('./components/listings/ListingDetail.vue')
    },
    {
        path: '/bookings/:id',
        name: 'bookingDetails',
        component: () => import('./components/listings/BookingDetail.vue')
    },
    {
        path: '/find_listings',
        name: 'find_listings',
        component: () => import('./views/ListingsGuests.vue'),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                if(!isHost())
                next()
                else
                next({
                    name: 'home',
                    query: {
                        from: to.name
                    }
                })
            } else {
                next({
                    name: 'login',
                    query: {
                        from: to.name
                    }
                })
            }
        }
    },
    {
        path: '/previous_bookings',
        name: 'previous_bookings',
        component: () => import('./views/BookingsGuests.vue'),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                if(!isHost())
                next()
                else
                next({
                    name: 'home',
                    query: {
                        from: to.name
                    }
                })
            } else {
                next({
                    name: 'login',
                    query: {
                        from: to.name
                    }
                })
            }
        }
    },
    {
        path: '/current_bookings',
        name: 'current_bookings',
        component: () => import('./views/CurrentBookings.vue'),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                if(!isHost())
                next()
                else
                next({
                    name: 'home',
                    query: {
                        from: to.name
                    }
                })
            } else {
                next({
                    name: 'login',
                    query: {
                        from: to.name
                    }
                })
            }
        }
    },
    {
        path: '/my_listings',
        name: 'my_listings',
        component: () => import('./views/Listings.vue'),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                if(isHost())
                next()
                else
                next({
                    name: 'home',
                    query: {
                        from: to.name
                    }
                })
            } else {
                next({
                    name: 'login',
                    query: {
                        from: to.name
                    }
                })
            }
        }
    },
    {
        path: '/check_bookings',
        name: 'check_bookings',
        component: () => import('./views/BookingsGuests.vue'),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                if(isHost())
                next()
                else
                next({
                    name: 'home',
                    query: {
                        from: to.name
                    }
                })
            } else {
                next({
                    name: 'login',
                    query: {
                        from: to.name
                    }
                })
            }
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./views/login.vue')
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: () => import('./components/checkout/CheckoutModal.vue')
    }
    ]
})
