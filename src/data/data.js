export const data = [
  {
    id: 1,
    name: "Node1",
    children: [
      {
        id: 4,
        name: "Node4",
        parentId: 1,
        children: [
          {
            id: 5,
            name: "Node5",
            parentId: 4,
            children: [
              {
                id: 7,
                name: "Node7",
                parentId: 5,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Node2",
    children: [
      {
        id: 6,
        name: "Node6",
        parentId: 2,
      },
    ],
  },
  {
    id: 3,
    name: "Node3",
  },
];
