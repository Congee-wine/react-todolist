import { useState } from 'react'
import './index.scss'

function ThemeSwitcher() {
  // 1. 使用 useState 创建状态
  // 'blue' 是默认值，表示当前选中的主题
  // currentTheme 是当前的主题值
  // setCurrentTheme 是用来修改主题值的函数
  const [currentTheme, setCurrentTheme] = useState('blue')

  // 2. 处理主题切换的函数
  // 当用户点击主题按钮时，这个函数会被调用
  const handleThemeChange = (theme: string) => {
    // 更新状态
    setCurrentTheme(theme)

    // 根据主题设置 body 的 data-theme 属性
    // 这样 CSS 变量就会自动切换
    if (theme === 'blue') {
      document.body.removeAttribute('data-theme')
    } else {
      document.body.setAttribute('data-theme', theme)
    }
  }

  return (
    <div className="theme-switcher">
      <button
        className={`theme-button ${currentTheme === 'blue' ? 'active' : ''}`}
        onClick={() => handleThemeChange('blue')}
        title="蓝色主题"
      >
        <span className="theme-color blue"></span>
      </button>
      <button
        className={`theme-button ${currentTheme === 'pink' ? 'active' : ''}`}
        onClick={() => handleThemeChange('pink')}
        title="粉色主题"
      >
        <span className="theme-color pink"></span>
      </button>
      <button
        className={`theme-button ${currentTheme === 'green' ? 'active' : ''}`}
        onClick={() => handleThemeChange('green')}
        title="绿色主题"
      >
        <span className="theme-color green"></span>
      </button>
      <button
        className={`theme-button ${currentTheme === 'purple' ? 'active' : ''}`}
        onClick={() => handleThemeChange('purple')}
        title="紫色主题"
      >
        <span className="theme-color purple"></span>
      </button>
    </div>
  )
}

export default ThemeSwitcher
