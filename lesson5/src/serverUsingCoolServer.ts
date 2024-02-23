import { CoolServer } from "./CoolServer";

let todoLists: { id: string; text: string; toggled: boolean }[] = [];

const server = new CoolServer({ port: 3000 });
server.start();

server.registerPost({
  url: "/list",
  fn: (p) => {
    return todoLists;
  },
});

server.registerPost({
  url: "/create",
  fn: (p) => {
    const newItem = p.body;
    todoLists.push(newItem);
    return newItem;
  },
});

server.registerPost({
  url: "/toggle",
  fn: (p) => {
    const t1 = p.body;
    todoLists = todoLists.map((item) => {
      if (t1.id === item.id) {
        return {
          id: item.id,
          text: item.text,
          toggled: !item.toggled,
        };
      } else {
        return item;
      }
    });
    return {};
  },
});
server.registerPost({
  url: "/delete",
  fn: (p) => {
    const d1 = p.body;
    todoLists = todoLists.filter((item) => d1.id !== item.id);
    return {};
  },
});
