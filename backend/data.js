import bcrypt from 'bcryptjs'

const data = {
    users: [
        {
            name: 'Daniil',
            email: 'admin@gmail.com',
            password: bcrypt.hashSync('12344321'),
            isAdmin: true,
        },
        {
            name: 'Basim',
            email: 'user@gmail.com',
            password: bcrypt.hashSync('12344321'),
            isAdmin: false,
        },
    ],



    products: [
        {
            //_id: '1',
            name: 'Nike Slim shirt',
            slug: 'nike-slim-shirt',
            category: 'Shirts',
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
            category: 'Shirts',
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
            category: 'Shirts',
            image: '/images/p3.jpg',
            price: 50,
            countInStock: 10,
            brand: 'Nike',
            rating: 3,
            numReviews: 10,
            description: 'hight quality shirt',
        },
    ],
};

export default data;