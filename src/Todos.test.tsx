import { screen, render, fireEvent } from "@testing-library/react"
import React from 'react'
import { Todos } from './Todos'

test('should show input for new todo', () => {
    render(<Todos />)
    const input = screen.getByPlaceholderText(/add something/i)
    expect(input).toBeVisible();
})
test('should add new todo', () => {
    render(<Todos />)
    const input = screen.getByPlaceholderText(/add something/i)
    const addButton = screen.getByRole('button', { name: 'add' })
    const todo = "Test Todo"
    fireEvent.change(input, { target: { value: todo } })
    fireEvent.click(addButton);

    const todoElement = screen.getByText(todo);

    expect(todoElement).toBeVisible();
})
test('should clear new todo after adding', () => {
    render(<Todos />)
    const input = screen.getByPlaceholderText(/add something/i)
    const addButton = screen.getByRole('button', { name: 'add' })
    const todo = "Test Todo"
    fireEvent.change(input, { target: { value: todo } })
    fireEvent.click(addButton);

    expect(input).toHaveValue('');
})
