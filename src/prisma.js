import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
});

const createPostForUser = async (authorId, data) => {
    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, `{ id }`)
    const user = await prisma.query.user({
        where: {
            id: authorId
        }
    }, `{ id name email posts { id title published }}`)
    return user
}
// Sample usage

/*
createPostForUser("cjs9ye0e101w90884ynrs27xn", {
    title: "Great books to read",
    body: "Game of thrones",
    published: true
}).then ((user) => {
    console.log(JSON.stringify(user, undefined, 2));
}) */

const updatePost = async (postId, data) => {

    const {author} = await prisma.mutation.updatePost({
        where: {
            id: postId
        },
        data: data
    }, '{ author { id } }')
    
    const user = await prisma.query.user({
        where: {
            id: author.id
        }
    }, `{ id name email posts { id title published }}`)
    return user

}
// Sample usage

/*
updatePost("cjsh7k1i9004a08845qxals7b", {
    title: "Great books to read",
    published: false
}).then ((user) => {
    console.log(JSON.stringify(user, undefined, 2));
})*/