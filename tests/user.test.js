import 'cross-fetch/polyfill';
import ApolloBoost, { gql } from 'apollo-boost';
import prisma from '../src/prisma';
import bcrypt from 'bcryptjs';

const client = new ApolloBoost({
    uri: 'http://localhost:4000'
});

beforeEach( async () => {
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

});

test('Should create a new user', async () => {
    const createUser = gql`
        mutation {
            createUser(
                data: {
                    name: "Andrew Mead",
                    email: "andrew@example.com",
                    password: "MyPass123"
                }
            ) {
                token,
                user {
                    id
                }
            }
        }
    `;
    const response = await client.mutate({
        mutation: createUser
    });

    const userExists = await prisma.exists.User({
        id: response.data.createUser.user.id
    });

    expect(userExists).toBe(true);

});