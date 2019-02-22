import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
});

// prisma.query.users(null, `{ id name email posts { id title } }` ).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.query.comments(null, `{ id text author { id name } }`).then((data)=> {
//     console.log(JSON.stringify(data, undefined, 2));
// });


// prisma.mutation.createPost({
//     data: {
//         title: "GraphQL 101!",
//         body: "",
//         published: false,
//         author: {
//             connect: {
//                 id: "cjs9ye0e101w90884ynrs27xn"
//             }
//         }
//     }
// }, '{ id title body published }').then ((data) => {
//     console.log(data);
//     return prisma.query.users(null, '{ id name email posts { id title } }');
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
// })

prisma.mutation.updatePost({
    where: {
        id: "cjsfqj3xg002m0884d1zcyirl"
    },
    data: {
        body: "This is the body of the previous post",
        published: true
    }
}, '{ id title body published }').then((data) => {
    console.log(data);
    return prisma.query.posts(null, '{ id title body published }');
}). then ((data)=> {
    console.log(JSON.stringify(data, undefined, 2));
})