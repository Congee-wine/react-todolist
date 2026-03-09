// 本地存储的 key 名称
const STORAGE_KEY = 'todos'

// 定义 Todo 类型
export interface Todo {
  id: number
  text: string
  selected: boolean // 是否被选中（复选框）
  completed: boolean // 是否已完成（完成状态）
}

// 1. 从 localStorage 读取待办事项
export const loadTodos = (): Todo[] => {
  try {
    // 从 localStorage 获取数据
    const todosJson = localStorage.getItem(STORAGE_KEY)

    // 如果没有数据，返回空数组
    if (!todosJson) {
      return []
    }

    // 将 JSON 字符串转换为对象数组
    return JSON.parse(todosJson)
  } catch (error) {
    // 如果出错（比如 JSON 格式错误），返回空数组
    console.error('读取待办事项失败:', error)
    return []
  }
}

// 2. 保存待办事项到 localStorage
export const saveTodos = (todos: Todo[]): void => {
  try {
    // 将对象数组转换为 JSON 字符串
    const todosJson = JSON.stringify(todos)

    // 保存到 localStorage
    localStorage.setItem(STORAGE_KEY, todosJson)
  } catch (error) {
    // 如果出错（比如存储空间满了），打印错误
    console.error('保存待办事项失败:', error)
  }
}
