/**
 * Todo Service Tests
 * 
 * Test suite for todo service functionality
 */

const todoService = require('../services/todoService');
const fs = require('fs');
const path = require('path');

// Mock data file for testing
const TEST_DATA_FILE = path.join(__dirname, '../data/todos.json');

describe('Todo Service', () => {
  beforeEach(() => {
    // Clean up test data before each test
    if (fs.existsSync(TEST_DATA_FILE)) {
      fs.unlinkSync(TEST_DATA_FILE);
    }
  });

  afterAll(() => {
    // Clean up after all tests
    if (fs.existsSync(TEST_DATA_FILE)) {
      fs.unlinkSync(TEST_DATA_FILE);
    }
  });

  test('should create a new todo', () => {
    const todo = todoService.createTodo('Test todo', 'This is a test');
    
    expect(todo).toHaveProperty('id');
    expect(todo.title).toBe('Test todo');
    expect(todo.description).toBe('This is a test');
    expect(todo.completed).toBe(false);
    expect(todo.priority).toBe('medium');
  });

  test('should get all todos', () => {
    todoService.createTodo('Todo 1');
    todoService.createTodo('Todo 2');
    
    const todos = todoService.getAllTodos();
    
    expect(todos.length).toBe(2);
    expect(todos[0].title).toBe('Todo 1');
    expect(todos[1].title).toBe('Todo 2');
  });

  test('should get a todo by ID', () => {
    const created = todoService.createTodo('Find me');
    const found = todoService.getTodoById(created.id);
    
    expect(found).not.toBeNull();
    expect(found.id).toBe(created.id);
    expect(found.title).toBe('Find me');
  });

  test('should update a todo', () => {
    const created = todoService.createTodo('Original');
    const updated = todoService.updateTodo(created.id, {
      title: 'Updated',
      completed: true
    });
    
    expect(updated.title).toBe('Updated');
    expect(updated.completed).toBe(true);
  });

  test('should delete a todo', () => {
    const created = todoService.createTodo('Delete me');
    const deleted = todoService.deleteTodo(created.id);
    const found = todoService.getTodoById(created.id);
    
    expect(deleted).toBe(true);
    expect(found).toBeNull();
  });

  test('should toggle todo completion', () => {
    const created = todoService.createTodo('Toggle me');
    const toggled = todoService.toggleTodoCompletion(created.id);
    
    expect(toggled.completed).toBe(true);
    
    const toggled2 = todoService.toggleTodoCompletion(created.id);
    expect(toggled2.completed).toBe(false);
  });

  test('should get todos by priority', () => {
    todoService.createTodo('Low priority');
    const todo2 = todoService.createTodo('High priority');
    todoService.updateTodo(todo2.id, { priority: 'high' });
    
    const highPriority = todoService.getTodosByPriority('high');
    
    expect(highPriority.length).toBe(1);
    expect(highPriority[0].priority).toBe('high');
  });

  test('should get completed todos', () => {
    const todo1 = todoService.createTodo('Task 1');
    todoService.toggleTodoCompletion(todo1.id);
    todoService.createTodo('Task 2');
    
    const completed = todoService.getCompletedTodos();
    
    expect(completed.length).toBe(1);
    expect(completed[0].completed).toBe(true);
  });

  test('should get incomplete todos', () => {
    const todo1 = todoService.createTodo('Task 1');
    todoService.toggleTodoCompletion(todo1.id);
    todoService.createTodo('Task 2');
    
    const incomplete = todoService.getIncompleteTodos();
    
    expect(incomplete.length).toBe(1);
    expect(incomplete[0].completed).toBe(false);
  });

  test('should search todos', () => {
    todoService.createTodo('Buy milk', 'Grocery item');
    todoService.createTodo('Buy bread', 'Grocery item');
    todoService.createTodo('Learn coding');
    
    const results = todoService.searchTodos('Buy');
    
    expect(results.length).toBe(2);
  });

  test('should get statistics', () => {
    const todo1 = todoService.createTodo('Task 1');
    const todo2 = todoService.createTodo('Task 2');
    const todo3 = todoService.createTodo('Task 3');
    
    todoService.toggleTodoCompletion(todo1.id);
    todoService.toggleTodoCompletion(todo2.id);
    
    const stats = todoService.getStatistics();
    
    expect(stats.total).toBe(3);
    expect(stats.completed).toBe(2);
    expect(stats.incomplete).toBe(1);
    expect(stats.completionRate).toBe(66);
  });

  test('should clear completed todos', () => {
    const todo1 = todoService.createTodo('Complete me');
    todoService.createTodo('Keep me');
    
    todoService.toggleTodoCompletion(todo1.id);
    const cleared = todoService.clearCompletedTodos();
    
    expect(cleared).toBe(1);
    expect(todoService.getAllTodos().length).toBe(1);
  });
});
