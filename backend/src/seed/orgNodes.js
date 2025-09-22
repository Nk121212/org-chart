export default [
  { id: 1, name: "Alice Johnson", title: "CEO", parent_id: null },
  { id: 2, name: "Bob Williams", title: "CTO", parent_id: 1 },
  { id: 3, name: "Charlie Kim", title: "Senior Developer", parent_id: 2 },
  { id: 4, name: "Dana Lee", title: "Junior Developer", parent_id: 2 },
  { id: 5, name: "Eva Martinez", title: "CFO", parent_id: 1 },
  { id: 6, name: "Frank Zhao", title: "Finance Officer", parent_id: 5 },
  { id: 7, name: "Grace Tan", title: "HR Manager", parent_id: 1 },
  { id: 8, name: "Henry Patel", title: "HR Staff", parent_id: 7 }
];
