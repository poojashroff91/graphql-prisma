const Query = {
    users (parent, args, { db, prisma }, info) {

        return prisma.query.users(null, info)

        // if(args.query){
        //     return db.users.filter((user) => {
        //         return user.name.toLowerCase().includes(args.query.toLowerCase());
        //     });
        // } else {
        //     return db.users;
        // }
    },
    posts (parent, args, { db, prisma }, info) {

        return prisma.query.posts(null, info) 
        // if(args.query){
        //     return db.posts.filter((post) => {
        //         const titleMatch =  post.title.toLowerCase().includes(args.query.toLowerCase());
        //         const bodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
        //         return titleMatch || bodyMatch;
        //     });
        // } else {
        //     return db.posts;
        // }
    },
    comments (parent, args, { db }, info) {
        return db.comments;
    }
};

export { Query as default };