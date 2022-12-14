import bcrypt from 'bcryptjs'

const data = {
    users: [
        {
            name: 'Daniil',
            email: 'admin@gmail.com',
            password: bcrypt.hashSync('12344321'),
            image: '/images/noimg.jpg',
            link: 'https://www.linkedin.com/in/daniil-kniazkin-1b6518243/',
            isAdmin: true,
        },
        {
            name: 'Basim',
            email: 'user@gmail.com',
            image: '/images/noimg.jpg',
            link: 'https://www.linkedin.com/in/daniil-kniazkin-1b6518243/',
            password: bcrypt.hashSync('12344321'),
            isAdmin: false,
        },
    ],



    products: [
        {
            name: 'PlayStation 5',
            slug: 'playstation',
            category: 'Product',
            image: '/images/ps5.jpg',
            price: 499,
            countInStock: 12,
            brand: 'Sony',
            rating: 4.5,
            numReviews: 10,
            description: 'Ps5',
        },
        {
            name: 'Christmas Candle',
            slug: 'christmas-candle',
            category: 'Product',
            image: '/images/candle.jpg',
            price: 120,
            countInStock: 200,
            brand: 'Candle-shop',
            rating: 4.5,
            numReviews: 10,
            description: 'Beautiful New Year candle',
        },
        {
            name: 'Furniture repair',
            slug: 'furniture-repair',
            category: 'Service',
            image: '/images/repair.jpg',
            price: 45,
            //countInStock: 10,
            //brand: 'Nike',
            rating: 3,
            numReviews: 10,
            description: 'Quick furniture repair',
        },
        {
            //_id: '3',
            name: 'Roof repair',
            slug: 'roof-repair',
            category: 'Service',
            image: '/images/p5.jpg',
            price: 50,
            //countInStock: 0,
            //brand: 'Nike',
            rating: 0,
            numReviews: 0,
            description: 'Fast and quality roof repair',
            contact: '+420774657845',
        },
    ],
};

export default data;