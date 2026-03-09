import { useState } from 'react'
import './index.scss'
import TodoItem from '@/components/TodoItem'

// 1. 定义 Todo 类型
interface Todo {
  id: number
  text: string
  selected: boolean
  completed: boolean
}

// 2. 定义筛选类型
type FilterType = 'all' | 'active' | 'completed'

// 3. 定义组件接收的 props 类型
interface TodoListProps {
  todos: Todo[]
  onToggleSelect: (id: number) => void // 切换选中
  onToggleComplete: (id: number) => void // 切换完成
  onToggleAllSelect: (checked: boolean) => void // 全选
  onCompleteSelected: () => void // 完成选中的
  onUncompleteSelected: () => void // 取消完成
  onDeleteTodo: (id: number) => void // 删除
}

function TodoList({
  todos,
  onToggleSelect,
  onToggleComplete,
  onToggleAllSelect,
  onCompleteSelected,
  onUncompleteSelected,
  onDeleteTodo,
}: TodoListProps) {
  // 1. 创建筛选状态，默认显示"全部"
  const [filter, setFilter] = useState<FilterType>('all')

  // 2. 判断是否有待办事项
  const hasTodos = todos.length > 0

  // 3. 根据筛选条件过滤待办事项
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true // 全部：显示所有
    if (filter === 'active') return !todo.completed // 未完成：只显示未完成的
    if (filter === 'completed') return todo.completed // 已完成：只显示已完成的
    return true
  })

  // 4. 计算是否全部选中
  const allSelected = hasTodos && todos.every((todo) => todo.selected)

  // 5. 处理全选复选框点击
  const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggleAllSelect(e.target.checked)
  }

  return (
    <div className="todo-list-wrapper">
      {hasTodos && (
        <div className="todo-list-header">
          <div className="select-all-section">
            <input
              type="checkbox"
              className="select-all-checkbox"
              title="全选/取消全选"
              checked={allSelected}
              onChange={handleToggleAll}
            />
            <span className="select-all-label">全选</span> |
            <button
              className="function-button active"
              onClick={onCompleteSelected}
            >
              一键完成
            </button>
            <button
              className="function-button active"
              onClick={onUncompleteSelected}
            >
              取消完成
            </button>{' '}
            |
          </div>

          <div className="filter-section">
            <button
              className={`function-button ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              全部
            </button>
            <button
              className={`function-button ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              未完成
            </button>
            <button
              className={`function-button ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              已完成
            </button>
          </div>
        </div>
      )}
      <div className="todo-list">
        {/* 4. 使用 map 遍历过滤后的数组，渲染每个待办事项 */}
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleSelect={onToggleSelect}
            onToggleComplete={onToggleComplete}
            onDelete={onDeleteTodo}
          />
        ))}
      </div>
    </div>
  )
}

export default TodoList
