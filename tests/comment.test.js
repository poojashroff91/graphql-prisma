import 'cross-fetch/polyfill';
import seedDatabase, { userOne, commentOne, commentTwo, postTwo, postOne } from './utils/seedDatabase';
import getClient from './utils/getClient';
import prisma from '../src/prisma';
import { deleteComment, subscribeToComments } from './utils/operations';
const client = getClient();
jest.setTimeout(10000);
beforeEach(seedDatabase);

test('Should delete own comment', async (done) => {
    const client = getClient(userOne.jwt);
    const variables = {
        id: commentTwo.comment.id 
    };
    await client.mutate({ mutation: deleteComment, variables });
    const  exists = await prisma.exists.Comment({
        id: commentTwo.comment.id 
    });
    expect(exists).toBe(false);
    done();
});

test('Should not delete any other user\'s comment', async (done) => {
    const client = getClient(userOne.jwt);
    const variables = {
        id: commentOne.comment.id 
    };

    await expect(
        client.mutate({ 
                mutation: deleteComment,
                variables
            })
    ).rejects.toThrow();
    done();

});


test('Should subscribe to comments for a post', async (done) =>{
    const variables =  {
        postId: postTwo.post.id
    };
    client.subscribe({ query: subscribeToComments, variables}).subscribe({
        next(response) {
            expect(response.data.comment.mutation).toBe('DELETED');
            done();
        }
    });

    await prisma.mutation.deleteComment({where: {id: commentOne.comment.id}});
});