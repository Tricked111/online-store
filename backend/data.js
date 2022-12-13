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
            //_id: '1',
            name: 'Nike Slim shirt',
            slug: 'nike-slim-shirt',
            category: 'Product',
            image: '/images/p1.jpg',
            price: 120,
            countInStock: 0,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'hight quality shirt',
        },
        {
            //_id: '2',
            name: 'Puma Slim shirt',
            slug: 'puma-slim-shirt',
            category: 'Product',
            image: '/images/p2.jpg',
            price: 120,
            countInStock: 12,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'hight quality shirt',
        },
        {
            //_id: '3',
            name: 'Adidas Slim shirt',
            slug: 'adidas-slim-shirt',
            category: 'Product',
            image: '/images/p3.jpg',
            price: 50,
            countInStock: 10,
            brand: 'Nike',
            rating: 3,
            numReviews: 10,
            description: 'hight quality shirt',
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