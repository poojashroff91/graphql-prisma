import uuidv4 from 'uuid/v4';
import { PubSub } from 'graphql-yoga';

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        return prisma.mutation.createUser({
            data: args.data
        })
    },
    async updateUser(parent, args, { prisma }, info){
        return prisma.mutation.updateUser({
            where: {
                id: args.id
            },
            data: args.data
        })
    },
    async deleteUser(parent, args, { prisma }, info) {
        return prisma.mutation.deleteUser({
            where: {
                id: args.id
            }
        }, info)
    },

    async createPost(parent, args, { prisma }, info) {
        
        return prisma.mutation.createPost({
            data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                    connect: {
                        id: args.data.author
                    }
                }
            }
        }, info)
    },
    async updatePost(parent, args, { prisma }, info){
        return prisma.mutation.updatePost({
            data: args.data,
            where: {
                id: args.id
            }
        }, info)
    },
    async deletePost(parent, args, { prisma }, info) {
        return prisma.mutation.deletePost({
            where: {
                id: args.id
            } 
        }, info)
    },

    async createComment(parent, args, { prisma }, info){
        return prisma.mutation.createComment({
            data: {
                text: args.data.text,
                author: {
                    connect: {
                        id: args.data.author
                    }
                },
                post: {
                    connect: {
                        id: args.data.post
                    }
                }
            }
        }, info)
    },
    async updateComment(parent, args, { prisma }, info) {
        return prisma.mutation.updateComment ({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    },
    async deleteComment(parent, args, { prisma }, info) {
        return prisma.mutation.deleteComment({
            where: {
                id: args.id
            }
        }, info);
    }
};

export { Mutation as default };