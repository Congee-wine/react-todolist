import { useState } from 'react'
import './index.scss'

// 1. 定义组件接收的 props 类型
interface TodoFormProps {
  onAddTodo: (text: string) => void // 接收一个函数，参数是字符串，无返回值
}

function TodoForm({ onAddTodo }: TodoFormProps) {
  // 2. 创建输入框的状态
  // 用来记录用户输入的内容
  const [inputValue, setInputValue] = useState('')

  // 3. 处理添加按钮点击
  const handleAdd = () => {
    // 去除首尾空格
    const trimmedValue = inputValue.trim()

    // 如果输入为空，不做任何操作
    if (trimmedValue === '') {
      return
    }

    // 调用父组件传来的函数，添加待办事项
    onAddTodo(trimmedValue)

    // 清空输入框
    setInputValue('')
  }

  // 4. 处理按下回车键
  const handleKeyPress = (e: React.KeyboardEvent) => {
    // 如果按下的是回车键，执行添加操作
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  return (
    <div className="todo-form">
      <input
        type="text"
        className="todo-input"
        placeholder="添加新的待办事项..."
        value={inputValue} // 5. 绑定状态
        onChange={(e) => setInputValue(e.target.value)} // 6. 更新状态
        onKeyUp={handleKeyPress} // 7. 监听键盘事件
      />
      <button
        className="add-button"
        onClick={handleAdd} // 8. 绑定点击事件
      >
        添加
      </button>
    </div>
  )
}

export default TodoForm
