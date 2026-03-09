import './index.scss'
import { useState, useEffect } from 'react'
import { loadTodos, saveTodos, type Todo } from '@/utils/storage'
import Header from '@/components/Header'
import TodoForm from '@/components/TodoForm'
import TodoList from '@/components/TodoList'

function Layout() {
  // 1. 创建待办事项列表的状态
  const [todos, setTodos] = useState<Todo[]>(() => {
    return loadTodos()
  })

  // 2. 监听 todos 变化，自动保存到 localStorage
  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  // 3. 添加待办事项
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: text,
      selected: false, // 默认未选中
      completed: false, // 默认未完成
    }
    setTodos([newTodo, ...todos])
  }

  // 4. 切换选中状态（复选框）
  const toggleSelect = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, selected: !todo.selected } : todo,
      ),
    )
  }

  // 5. 切换完成状态（完成按钮）
  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  // 6. 全选/反选（复选框）
  const toggleAllSelect = (checked: boolean) => {
    setTodos(todos.map((todo) => ({ ...todo, selected: checked })))
  }

  // 7. 一键完成选中的事项
  const completeSelected = () => {
    setTodos(
      todos.map((todo) =>
        todo.selected ? { ...todo, completed: true, selected: false } : todo,
      ),
    )
  }

  // 8. 取消选中事项的完成状态
  const uncompleteSelected = () => {
    setTodos(
      todos.map((todo) =>
        todo.selected ? { ...todo, completed: false, selected: false } : todo,
      ),
    )
  }

  // 9. 删除单个事项
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="app-container">
      <Header />
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todos={todos}
        onToggleSelect={toggleSelect}
        onToggleComplete={toggleComplete}
        onToggleAllSelect={toggleAllSelect}
        onCompleteSelected={completeSelected}
        onUncompleteSelected={uncompleteSelected}
        onDeleteTodo={deleteTodo}
      />
    </div>
  )
}

export default Layout
