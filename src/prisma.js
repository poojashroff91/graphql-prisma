import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466',
    secret: 'keyboardmouse'
});

export {prisma as default}

/*
const createPostForUser = async (authorId, data) => {

    const userExists = await prisma.exists.User({
        id: authorId
    })

    if(!userExists) {
        throw new Error('The user does not exist')
    }

    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, `{ author { id name email posts { id title published } } }`)
    
    return post.author
}

 * * Usage of create Post
createPostForUser("cjsa3tdew007u0984hz2t2dda", {
    title: "Great books to read",
    body: "Game of thrones",
    published: true
}).then ((user) => {
    console.log(JSON.stringify(user, undefined, 2));
}) .catch ((error) => {
    console.log(error.message);
})*/
/*
const updatePostForUser = async (postId, data) => {

    const postExists = await prisma.exists.Post({
        id: postId
    })

    if(!postExists) {
        throw new Error('The post does not exist')
    }

    const post = await prisma.mutation.updatePost({
        where: {
            id: postId
        },
        data: data
    }, '{ author { id name email posts { id title published }} }')  
    return post.author

}


* * Usage of update Post
updatePostForUser("cjsh7k1i9004a08845qxals7b", {
    title: "Great book to read",
    published: true
}).then ((user) => {
    console.log(JSON.stringify(user, undefined, 2));
}).catch ((error) => {
    console.log(error.message);
})*/