var groups = [
    {
        total: 8,
        fields: [
            {x: 1, y: 1},
            {x: 1, y: 2}
        ]
    },
    {
        total: 27,
        fields: [
            {x: 2, y: 1},
            {x: 3, y: 1},
            {x: 4, y: 1},
            {x: 2, y: 2},
            {x: 2, y: 3}
        ]
    },
    {
        total: 10,
        fields: [
            {x: 5, y: 1},
            {x: 5, y: 2}
        ]
    },
    {
        total: 4,
        fields: [
            {x: 6, y: 1},
            {x: 7, y: 1}
        ]
    },
    {
        total: 6,
        fields: [
            {x: 8, y: 1},
            {x: 9, y: 1}
        ]
    },
    {
        total: 14,
        fields: [
            {x: 3, y: 2},
            {x: 4, y: 2}
        ]
    },
    {
        total: 9,
        fields: [
            {x: 6, y: 2},
            {x: 6, y: 3}
        ]
    },
    {
        total: 12,
        fields: [
            {x: 7, y: 2},
            {x: 7, y: 3}
        ]
    },
    {
        total: 14,
        fields: [
            {x: 8, y: 2},
            {x: 9, y: 2}
        ]
    },
    {
        total: 15,
        fields: [
            {x: 1, y: 3},
            {x: 1, y: 4},
            {x: 2, y: 4}
        ]
    },
    {
        total: 6,
        fields: [
            {x: 3, y: 3},
            {x: 3, y: 4}
        ]
    },
    {
        total: 10,
        fields: [
            {x: 4, y: 3},
            {x: 5, y: 3}
        ]
    },
    {
        total: 12,
        fields: [
            {x: 8, y: 3},
            {x: 9, y: 3},
        ]
    },
    {
        total: 23,
        fields: [
            {x: 4, y: 4},
            {x: 5, y: 4},
            {x: 5, y: 5},
            {x: 5, y: 6},
            {x: 6, y: 6}
        ]
    },
    {
        total: 18,
        fields: [
            {x: 6, y: 4},
            {x: 7, y: 4},
            {x: 8, y: 4}
        ]
    },
    {
        total: 10,
        fields: [
            {x: 9, y: 4},
            {x: 9, y: 5},
        ]
    },
    {
        total: 8,
        fields: [
            {x: 1, y: 5},
            {x: 1, y: 6},
        ]
    },
    {
        total: 9,
        fields: [
            {x: 2, y: 5},
            {x: 3, y: 5},
            {x: 4, y: 5},
        ]
    },
    {
        total: 20,
        fields: [
            {x: 6, y: 5},
            {x: 7, y: 5},
            {x: 8, y: 5},
        ]
    },
    {
        total: 21,
        fields: [
            {x: 2, y: 6},
            {x: 3, y: 6},
            {x: 4, y: 6},
        ]
    },
    {
        total: 6,
        fields: [
            {x: 7, y: 6},
            {x: 7, y: 7},
        ]
    },
    {
        total: 13,
        fields: [
            {x: 8, y: 6},
            {x: 9, y: 6},
            {x: 9, y: 7}
        ]
    },
    {
        total: 14,
        fields: [
            {x: 1, y: 7},
            {x: 2, y: 7}
        ]
    },
    {
        total: 11,
        fields: [
            {x: 3, y: 7},
            {x: 3, y: 8}
        ]
    },
    {
        total: 10,
        fields: [
            {x: 4, y: 7},
            {x: 4, y: 8}
        ]
    },
    {
        total: 7,
        fields: [
            {x: 5, y: 7},
            {x: 6, y: 7}
        ]
    },
    {
        total: 28,
        fields: [
            {x: 8, y: 7},
            {x: 8, y: 8},
            {x: 8, y: 9},
            {x: 7, y: 9},
            {x: 6, y: 9},
        ]
    },
    {
        total: 14,
        fields: [
            {x: 1, y: 8},
            {x: 2, y: 8}
        ]
    },
    {
        total: 14,
        fields: [
            {x: 5, y: 8},
            {x: 5, y: 9}
        ]
    },
    {
        total: 9,
        fields: [
            {x: 6, y: 8},
            {x: 7, y: 8}
        ]
    },
    {
        total: 8,
        fields: [
            {x: 9, y: 8},
            {x: 9, y: 9},
        ]
    },
    {
        total: 3,
        fields: [
            {x: 1, y: 9},
            {x: 2, y: 9}
        ]
    },
    {
        total: 12,
        fields: [
            {x: 3, y: 9},
            {x: 4, y: 9}
        ]
    }
];

groups.forEach(group => {
    group.fields.forEach(field => {
        field.x--;
        field.y--;
        if(!field.value) field.value = 0;
    });
});

export default groups;