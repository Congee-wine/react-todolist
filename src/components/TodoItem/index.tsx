import './index.scss'

// 1. 定义 Todo 类型
interface Todo {
  id: number
  text: string
  selected: boolean
  completed: boolean
}

// 2. 定义组件接收的 props 类型
interface TodoItemProps {
  todo: Todo
  onToggleSelect: (id: number) => void // 切换选中状态
  onToggleComplete: (id: number) => void // 切换完成状态
  onDelete: (id: number) => void // 删除
}

function TodoItem({
  todo,
  onToggleSelect,
  onToggleComplete,
  onDelete,
}: TodoItemProps) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.selected} // 绑定选中状态
        onChange={() => onToggleSelect(todo.id)} // 切换选中
      />
      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
        {todo.text}
      </span>
      <button
        className="button complete"
        onClick={() => onToggleComplete(todo.id)}
      >
        {todo.completed ? '取消完成' : '完成'}
      </button>
      <button onClick={() => onDelete(todo.id)} className="button delete">
        删除
      </button>
    </div>
  )
}

export default TodoItem
