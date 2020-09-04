import { screen, render } from "@testing-library/react"
import React from 'react'
import { Todos } from './Todos'

test('should show input for new todo', () => {
    render(<Todos />)
    const input = screen.getByPlaceholderText(/add something/i)
    expect(input).toBeVisible();
})
