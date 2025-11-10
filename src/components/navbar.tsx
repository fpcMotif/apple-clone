import type { FunctionComponent } from "preact";

import { appleImg, bagImg, githubImg, searchImg } from "../assets";
import { navLists, sourceCode } from "../constants";

const Navbar: FunctionComponent = () => (
  <header className="flex w-full items-center justify-between p-5 sm:px-10">
    <nav className="screen-max-width flex w-full">
      <button type="button">
        <img alt="Apple" height={18} src={appleImg} width={14} />
      </button>

      <button
        className="flex flex-1 justify-center max-sm:hidden"
        type="button"
      >
        {navLists.map((nav) => (
          <div
            className="cursor-pointer px-5 text-gray text-sm transition-all hover:text-white"
            key={nav}
          >
            {nav}
          </div>
        ))}
      </button>

      <div className="flex items-baseline gap-7 max-sm:flex-1 max-sm:justify-end">
        <button type="button">
          <img alt="Search" height={18} src={searchImg} width={18} />
        </button>
        <button type="button">
          <img alt="Bag" height={18} src={bagImg} width={18} />
        </button>
        <a href={sourceCode} rel="noreferrer noopener" target="_blank">
          <img alt="GitHub" height={18} src={githubImg} width={18} />
        </a>
      </div>
    </nav>
  </header>
);

export default Navbar;
