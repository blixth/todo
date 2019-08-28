import TodoService from "../services/todo.services";
import ValidationError from "../models/validation.error.model";
import TodoModel from "../models/todo.model";

describe("The TodoService", () => {
  describe("When retrieving all todos", () => {
    it("should return the todos in created_date order", () => {
      for (var i = 0; i < 10; i++) {
        TodoService.create(
          i.toString(),
          new Date()
        );
      }

      let todos = TodoService.retrieveAll();

      for (var i = 0; i < 10; i++) {
        expect(todos[i].description).toEqual(i.toString());
      }
    });
  });
});

describe("The TodoService", () => {
  describe("When retrieving a todo", () => {
    it("should throw Error if todo is not found", () => {
      expect(() => {
        TodoService.retrieve("does not exist!");
      }).toThrow(Error);
    });
  });
});

describe("The TodoService", () => {
  describe("When retrieving a todo", () => {
    it("should return the correct todo item", () => {
      let createdTodo = TodoService.create(
        "Test 1",
        new Date()
      );

      let retrievedTodo = TodoService.retrieve(createdTodo.guid);

      expect(retrievedTodo.guid).toEqual(createdTodo.guid);
      expect(retrievedTodo.created_date).toEqual(createdTodo.created_date);
      expect(retrievedTodo.expiration_date).toEqual(
        createdTodo.expiration_date
      );
    });
  });
});

describe("The TodoService", () => {
  describe("When deleting a todo", () => {
    it("should throw error if the todo is not found", () => {
      expect(() => {
        TodoService.retrieve("does not exist!");
      }).toThrow(Error);
    });
  });
});

describe("The TodoService", () => {
  describe("When deleting a todo", () => {
    it("should delete the todo and it should throw error when trying to retrieve it", () => {
      let createdTodo = TodoService.create(
        "Test 1",
        new Date()
      );

      TodoService.delete(createdTodo.guid);

      expect(() => {
        TodoService.retrieve("does not exist!");
      }).toThrow(Error);
    });
  });
});

describe("The TodoService", () => {
  describe("When creating a Todo", () => {
    it("should return an object", () => {
      expect(
        typeof TodoService.create(
          "Test 1",
          new Date()
        )
      ).toEqual("object");
    });
  });
});

describe("The TodoService", () => {
  describe("When creating a Todo", () => {
    it("should return correct data", () => {
      let date = new Date();
      let createdTodo = TodoService.create(
        "Test 1",
        date
      );

      date.setHours(0,0,0,0);

      expect(createdTodo.description).toEqual("Test 1");
      expect(createdTodo.expiration_date).toEqual(date);
      expect(createdTodo.is_completed).toEqual(false);
      expect(createdTodo.guid).toBeTruthy();
      expect(createdTodo.created_date).toBeTruthy();
    });
  });
});

describe("The TodoService", () => {
  describe("When updating a Todo", () => {
    it("is_completed should be updated", () => {
      let createdTodo = TodoService.create(
        "Test 1",
        new Date()
      );

      TodoService.update(createdTodo.guid, true);

      expect(createdTodo.is_completed).toEqual(true);
    });
  });
});

describe("The TodoService", () => {
  describe("When validating a todo", () => {
    it("should throw exception when missing required field: description", () => {
      expect(() => {
        TodoService.create("", new Date() );
      }).toThrow(ValidationError);
    });
  });
});

describe("The TodoService", () => {
  describe("When validating a todo", () => {
    it("should throw exception when exceeding the max length of description", () => {
      expect(() => {
        TodoService.create(
          "123456789012345678901234567890123456789012345678901",
          new Date()
        );
      }).toThrow(ValidationError);
    });
  });
});

describe("The TodoModel", () => {
  describe("When creating a todo", () => { 
    it("should set is_expired correctly", () => {
      let todo = new TodoModel("", "", new Date(2018,1), new Date(), false);

      expect(todo.is_expired).toEqual(true);
    })
  })
})

describe("The TodoModel", () => {
  describe("When creating a todo", () => { 
    it("should set is_expired correctly", () => {
      let todo = new TodoModel("", "", new Date(2020,1), new Date(), false);
      
      expect(todo.is_expired).toEqual(false);
    })
  })
})
