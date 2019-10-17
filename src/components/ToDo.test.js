import React from "react";
import { mount } from "enzyme";
import ToDo from "./ToDo";

describe("<ToDo/>", () => {
  const app = mount(<ToDo />);

  it("Renders without crashing", () => {
    expect(app.length).toEqual(1);
  });

  describe("The default UI", () => {
    it("Renders two default todo items", () => {
      expect(app.find(".ToDoItem").length).toBe(2);
    });

    it("Has an input field", () => {
      expect(app.find("input").length).toEqual(1);
    });

    it("Has an add button", () => {
      expect(app.find(".ToDo-Add").length).toEqual(1);
    });
  });

  describe("Adding items", () => {
    afterAll(() => {
      app.find(".ToDoItem-Delete").simulate("click");
    });
    window.alert = jest.fn();
    it("When the add button is pressed, if the input field is empty, prevent item from being added", () => {
      app.find(".ToDo-Add").simulate("click");
      expect(app.find(".ToDoItem").length).toBe(2);
    });

    it("When the add button is pressed, if the input field is empty, prevent item from being added", () => {
      app.find(".ToDo-Add").simulate("click");
      expect(window.alert).toHaveBeenCalled();
    });

    it("When the add button is pressed, if the input field has text, it creates a new todo item", () => {
      const event = { target: { value: "Create more tests" } };
      app.find("input").simulate("change", event);
      app.find(".ToDo-Add").simulate("click");

      expect(
        app
          .find(".ToDoItem-Text")
          .at(2)
          .text()
      ).toEqual("Create more tests");
    });
  });

  describe("Deleting items", () => {
    it("When the delete button is pressed for a todo item, it removes the entire item", () => {
      app
        .find(".ToDoItem-Delete")
        .first()
        .simulate("click");

      expect(app.find(".ToDoItem").length).toBe(2);
    });
    it("means that because the first toDoItem was deleted, the first toDoItem should now be buy milk", () => {
      expect(
        app
          .find(".ToDoItem-Text")
          .first()
          .text()
      ).toEqual("buy milk");
    });
  });
});
