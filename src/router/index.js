import Vue from 'vue';
import Router from 'vue-router';

import Home from '../views/Home';
import Movie from '../views/Movie';
import Music from '../views/Music';
import Book from '../views/Book';
import Event from '../views/Event';
import MovieSubject from '../views/MovieSubject';
import MusicSubject from '../views/MusicSubject';
import BookSubject from '../views/BookSubject';
import EventSubject from '../views/EventSubject';
import Search from '../views/Search';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/movie',
        name: 'Movie',
        components: {
            movie: Movie
        }
    }, {
        path: '/movie/subject/:id',
        name: 'MovieSubject',
        component: MovieSubject
    }, {
        path: '/music',
        name: 'Music',
        components: {
            music: Music
        }
    }, {
        path: '/music/subject/:id',
        name: 'MusicSubject',
        component: MusicSubject
    }, {
        path: '/book',
        name: 'Book',
        components: {
            book: Book
        }
    }, {
        path: '/book/subject/:id',
        name: 'BookSubject',
        component: BookSubject
    }, {
        path: '/event',
        name: 'Event',
        component: Event
    }, {
        path: '/event/subject/:id',
        name: 'EventSubject',
        component: EventSubject
    }, {
        path: '/search/:type/:field/:keyword',
        name: 'Search',
        component: Search
    }]
});
