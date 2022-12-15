import { useGlobalContext } from '../context'

const Mode = () => {
    const { darkMode, changeMode } = useGlobalContext()

    return (
        <div className="toggle-container">
            <button
                className={darkMode ? "toggle-dark" : "toggle-light"}
                onClick={changeMode}
            >
                Toggle Theme
            </button>
        </div>

    )
}
export default Mode