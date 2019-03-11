import prisma from '../../src/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userOne = {
    input: {
        name: 'Jen',
        email: 'jen@example.com',
        password: bcrypt.hashSync('Red98!@#$')
    },
    user: undefined,
    jwt: undefined
};

const seedDatabase = async () => {
    // Delete test data
    await prisma.mutation.deleteManyPosts();
    await prisma.mutation.deleteManyUsers();
    
    // Create user one
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    });
    userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

    await prisma.mutation.createPost({
        data: {
            title: 'Unpublished test post',
            body: '...',
            published: false,
            author: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    });
    await prisma.mutation.createPost({
        data: {
            title: 'Published test post',
            body: '...',
            published: true,
            author: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    });

};

export { seedDatabase as default, userOne };