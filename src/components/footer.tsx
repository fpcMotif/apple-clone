import type React from "react";

import { footerLinks } from "../constants";

const Footer: React.FC = () => (
  <footer className="p-5 sm:px-10">
    <div className="screen-max-width">
      <div className="">
        <p className="font-semibold text-gray text-xs">
          More ways to shop:{" "}
          <span className="cursor-pointer text-blue hover:underline">
            Find an Apple Store
          </span>{" "}
          or{" "}
          <span className="cursor-pointer text-blue hover:underline">
            other retailer
          </span>{" "}
          near you.
        </p>
        <p className="font-semibold text-gray text-xs">
          Or call{" "}
          <span className="cursor-pointer text-blue hover:underline">
            (800) 555-0100
          </span>
          .
        </p>
      </div>

      <div aria-hidden className="my-5 h-px w-full bg-neutral-700" />

      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <p className="font-semibold text-gray text-xs">
          &copy; {new Date().getFullYear()} Apple Clone Inc. All rights
          reserved.
        </p>

        <div className="flex">
          {footerLinks.map((link, i) => (
            <p className="font-semibold text-gray text-xs" key={link}>
              <span className="mx-2 cursor-pointer hover:underline">
                {link}
              </span>
              {i !== footerLinks.length - 1 && "|"}
            </p>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
