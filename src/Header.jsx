import logonew from "./assets/logonew.png";
import { Dialog4 } from "./Dialog.jsx";
function Header({ theme, setTheme }) {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar md:px-6 md:py-3 flex md:justify-between items-center bg-base-300 w-full">
          <div className="absolute md:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Hamburger icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-start max-h-17">
            <img src={logonew} alt="StudyTrack" className="w-[45%] max-w-50" />
          </div>
          <div className="hidden md:block ">
            <ul className="menu-lg menu-horizontal gap-4">
              <li>
                <button
                  onClick={() =>
                    document.getElementById("my_modal_4").showModal()
                  }
                  className="btn"
                >
                  About
                </button>
              </li>
              <li>
                <button className="btn">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/Karannn3011/studytrack-app"
                  >
                    GitHub
                  </a>
                </button>
              </li>
              <li>
                <div
                  className="btn"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  Theme:{" "}
                  <label className="toggle text-base-content pointer-events-none">
                    <input checked={theme === "dark"} type="checkbox" />
                    {/* Sun and moon icons */}
                    <svg
                      aria-label="sun"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle cx="12" cy="12" r="4"></circle>
                        <path d="M12 2v2"></path>
                        <path d="M12 20v2"></path>
                        <path d="m4.93 4.93 1.41 1.41"></path>
                        <path d="m17.66 17.66 1.41 1.41"></path>
                        <path d="M2 12h2"></path>
                        <path d="M20 12h2"></path>
                        <path d="m6.34 17.66-1.41 1.41"></path>
                        <path d="m19.07 4.93-1.41 1.41"></path>
                      </g>
                    </svg>
                    <svg
                      aria-label="moon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                      </g>
                    </svg>
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Drawer side */}
      <div className="drawer-side">
        <label
          id="drawerbd"
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu-lg space-y-3 w-[70%] bg-base-200 min-h-full p-4 py-8">
          <li>
            <button
              onClick={() => {
                document.getElementById("my_modal_4").showModal();
              }}
              className="btn"
            >
              About
            </button>
          </li>
          <li>
            <button className="btn">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/Karannn3011/studytrack-app"
              >
                GitHub
              </a>
            </button>
          </li>
          <li>
            <div
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="btn"
            >
              Theme:{" "}
              <label className="toggle text-base-content pointer-events-none">
                <input
                 
                  checked={theme === "dark"}
                  type="checkbox"
                 
                />
                {/* Sun and moon icons */}
                <svg
                  aria-label="sun"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                  </g>
                </svg>
                <svg
                  aria-label="moon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                  </g>
                </svg>
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
