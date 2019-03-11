import prisma from '../../src/prisma';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
    await prisma.mutation.deleteManyPosts();
    await prisma.mutation.deleteManyUsers();
    const user = await prisma.mutation.createUser({
        data: {
            name: 'Jen',
            email: 'jen@example.com',
            password: bcrypt.hashSync('Red98!@#$')
        }
    });
    await prisma.mutation.createPost({
        data: {
            title: 'Unpublished test post',
            body: '...',
            published: false,
            author: {
                connect: {
                    id: user.id
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
                    id: user.id
                }
            }
        }
    });

};

export { seedDatabase as default };