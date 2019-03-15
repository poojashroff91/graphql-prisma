import 'cross-fetch/polyfill';
import seedDatabase, { userOne, postOne, postTwo } from './utils/seedDatabase';
import getClient from './utils/getClient';
import prisma from '../src/prisma';
import {getPosts, myPosts, updatePost, createPost, deletePost, subscribeToPosts} from './utils/operations';
jest.setTimeout(10000);
const client = getClient();

beforeEach(seedDatabase);


test('Should expose published posts', async (done) => {
    const response = await client.query({
        query: getPosts
    });
    expect(response.data.posts.length).toBe(1);
    expect(response.data.posts[0].published).toBe(true);
    done();
});

test('Should fetch users posts', async (done) => {
    const client = getClient(userOne.jwt);
    
    const { data } = await client.query({ query: myPosts });

    expect(data.myPosts.length).toBe(2);
    done();
});

test('Should be able to update own post', async (done) => {
    const client = getClient(userOne.jwt);
    const variables = {
        id: postOne.post.id,
        data: {
            published: false
        }
    };
    const { data } = await client.mutate({ 
        mutation: updatePost,
        variables
    });
    const exists = await prisma.exists.Post({
        id: postOne.id,
        published: false
    });
    expect(data.updatePost.published).toBe(false);
    expect(exists).toBe(true);
    done();
});

test('Should be able to create a post', async (done) => {
    const client = getClient(userOne.jwt);
    const variables = {
        data : {
            title: "Test post",
            body: "...",
            published: true
        }
    };
    const { data } = await client.mutate({ mutation: createPost, variables });
    const  exists = await prisma.exists.Post({
        id: createPost.id
    });
    expect(exists).toBe(true);
    expect(data.createPost.title).toBe("Test post");
    expect(data.createPost.body).toBe("...");
    expect(data.createPost.published).toBe(true);
    done();
});

test('Should be able to delete a post', async (done) => {
    const client = getClient(userOne.jwt);
    const variables = {
        id: postTwo.post.id 
    };
    await client.mutate({ mutation: deletePost, variables });
    const  exists = await prisma.exists.Post({
        id: postTwo.post.id
    });
    expect(exists).toBe(false);
    done();
});

test('Should subscribe to a post', async (done) =>{
    client.subscribe({ query: subscribeToPosts }).subscribe({
        next(response) {
            expect(response.data.post.mutation).toBe('DELETED');
            done();
        }
    });

    await prisma.mutation.deletePost({where: {id: postTwo.post.id}});
});