import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
});

// prisma.mutation.updatePost({
//     where: {
//         id: "cjsfqj3xg002m0884d1zcyirl"
//     },
//     data: {
//         body: "This is the body of the previous post",
//         published: true
//     }
// }, '{ id title body published }').then((data) => {
//     console.log(data);
//     return prisma.query.posts(null, '{ id title body published }');
// }). then ((data)=> {
//     console.log(JSON.stringify(data, undefined, 2));
// });

/*
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

createPostForUser("cjs9ye0e101w90884ynrs27xn", {
    title: "Great books to read",
    body: "Game of thrones",
    published: true
}).then ((user) => {
    console.log(JSON.stringify(user, undefined, 2));
}) */