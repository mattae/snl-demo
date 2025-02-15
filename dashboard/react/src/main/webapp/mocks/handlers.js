import {  http, HttpResponse } from 'msw';

export const handlers = [
    http.get('/api/rc/tutorials', () => {
        return HttpResponse.json([
            {
                "id": 1,
                "title": "Introduction to Java",
                "description": "A beginner's guide to Java programming language.",
                "published": true
            },
            {
                "id": 2,
                "title": "Understanding Spring Boot",
                "description": "A comprehensive tutorial on building RESTful APIs using Spring Boot.",
                "published": false
            },
            {
                "id": 3,
                "title": "Hibernate Basics",
                "description": "Learn the basics of Hibernate ORM framework and database mappings.",
                "published": true
            },
            {
                "id": 4,
                "title": "Advanced Java",
                "description": "Dive into advanced topics of Java programming like concurrency and streams.",
                "published": false
            },
            {
                "id": 5,
                "title": "Microservices Architecture",
                "description": "Understand the principles and patterns of designing microservices.",
                "published": true
            }
        ])
    }),
];
