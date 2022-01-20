import { pactWith } from 'jest-pact'
import { Matchers } from '@pact-foundation/pact';

import { api } from '../../api';

pactWith({consumer: 'MyConsumer', provider: 'MyProvider'}, provider => {
    let client;
    beforeEach(() => {
        client = api(provider.mockService.baseUrl)
    })

    describe('health endpoint', () => {
        beforeEach(() => {
            return provider.addInteraction({
                state: "Server is healthy",
                uponReceiving: 'A request for API health',
                willRespondWith: {
                    status: 200,
                    body: {
                        status: Matchers.like('up'),
                        since: "32 hours",
                        foo: Matchers.like("bar"),
                    }
                },
                withRequest: {
                    method: 'GET',
                    path: '/health'
                }
            })
        })

        it('returns server health', () => {
            client.getHealth().then(health => {
                expect(health).toEqual('up')
            })
        })
    })

    describe('users endpoint', () => {
        beforeEach(() => {
            return provider.addInteraction({
                state: "Users state",
                uponReceiving: 'A request for Users API',
                willRespondWith: {
                    status: 200,
                    body: Matchers.eachLike({
                        name: 'Serkan',
                        lastname: 'Erip',
                        age: 23
                    })
                },
                withRequest: {
                    method: 'GET',
                    path: '/users'
                }
            })
        })

        it('returns users', () => {
            client.getUsers().then(users => {
                expect(Array.isArray(users)).toBe(true)
                if (users.length > 0) {
                    expect(users[0]).toMatchObject({
                        name: 'Serkan',
                        age: 23
                    })
                }
            })
        })
    })

    describe('posts endpoint', () => {
        beforeEach(() => {
            return provider.addInteraction({
                state: "Posts state",
                uponReceiving: 'A request for Posts API',
                willRespondWith: {
                    status: 200,
                    body: Matchers.eachLike({
                        title: 'Lorem ipsum',
                        body: 'Lorem ipsum dolar sit amet'
                    })
                },
                withRequest: {
                    method: 'GET',
                    path: '/posts'
                }
            })
        })

        it('returns posts', () => {
            client.getPosts().then(posts => {
                expect(Array.isArray(posts)).toBe(true)
                if (posts.length > 0) {
                    expect(posts[0]).toMatchObject({
                        title: 'Lorem ipsum',
                        body: 'Lorem ipsum dolar sit amet'
                    })
                }
            })
        })
    })

    describe('pong endpoint', () => {
        beforeEach(() => {
            return provider.addInteraction({
                state: "Pongs state",
                uponReceiving: 'A request for Pong API',
                willRespondWith: {
                    status: 200,
                    body: {
                        msg: "ping"
                    },
                },
                withRequest: {
                    method: 'GET',
                    path: '/pong'
                }
            })
        })

        it('returns ping', () => {
            client.pong().then(res => {
                expect(res.msg).toBe("ping")
            })
        })
    })
})