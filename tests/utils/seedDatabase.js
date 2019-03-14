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
const userTwo = {
    input: {
        name: 'Jeff',
        email: 'jeff@example.com',
        password: bcrypt.hashSync('Pink98!@#$')
    },
    user: undefined,
    jwt: undefined
};

const postOne = {
    input: {
        title: 'Unpublished test post',
        body: '...',
        published: false
    },
    post: undefined
};

const postTwo = {
    input: {
        title: 'Published test post',
        body: '...',
        published: true,
    },
    post: undefined
};

const commentOne = {
    input: {
        text: 'Thank you for the post'
    },
    comment: undefined
};

const commentTwo = {
    input: {
        text: 'You are welcome'
    },
    comment: undefined
};

const seedDatabase = async () => {
    // Delete test data
    await prisma.mutation.deleteManyComments();
    await prisma.mutation.deleteManyPosts();
    await prisma.mutation.deleteManyUsers();
    
    // Create user one
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    });
    userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

    userTwo.user = await prisma.mutation.createUser({
        data: userTwo.input
    });
    userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);

    postOne.post = await prisma.mutation.createPost({
        data: {
            ...postOne.input,
            author: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    });
    postTwo.post = await prisma.mutation.createPost({
        data: {
            ...postTwo.input,
            author: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    });

    commentOne.comment = await prisma.mutation.createComment({
        data: {
            ...commentOne.input,
            author: {
                connect: {
                    id: userTwo.user.id
                }
            },
            post: {
                connect: {
                    id: postTwo.post.id
                }
            }
        }
    });

    commentTwo.comment = await prisma.mutation.createComment({
        data: {
            ...commentTwo.input,
            author: {
                connect: {
                    id: userOne.user.id
                }
            },
            post: {
                connect: {
                    id: postTwo.post.id
                }
            }
        }
    });



};

export { seedDatabase as default, userOne, userTwo, postOne, postTwo, commentOne, commentTwo};